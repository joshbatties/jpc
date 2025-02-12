import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      username: string
      companyCode: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    username: string
    companyCode: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    username: string
    companyCode: string
  }
}

// Define allowed companies with their codes
const ALLOWED_COMPANIES = {
  "jpcgroup.com": "DEVTESTCO",
} as const;

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);


// Type for registration token data
interface RegistrationTokenData {
  token: string
  email: string
  company_code: string
  used: boolean
  expires_at: string
}

// Validate registration token function
export const validateRegistrationToken = async (token: string, email: string): Promise<RegistrationTokenData | null> => {
  const { data: tokenData, error } = await supabase
    .from('registration_tokens')
    .select('*')
    .eq('token', token)
    .eq('email', email)
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (error || !tokenData) return null
  return tokenData as RegistrationTokenData
}

// Mark token as used
export const markTokenUsed = async (token: string) => {
  const { error } = await supabase
    .from('registration_tokens')
    .update({ used: true })
    .eq('token', token)

  if (error) throw error
}

// Generate registration token
export const generateRegistrationToken = async (email: string) => {
  const domain = email.split('@')[1]
  const companyCode = ALLOWED_COMPANIES[domain as keyof typeof ALLOWED_COMPANIES]

  if (!companyCode) {
    throw new Error('Company domain not authorized')
  }

  const token = Math.random().toString(36).slice(2, 8).toUpperCase()
  const expires_at = new Date()
  expires_at.setHours(expires_at.getHours() + 24) // 24 hour expiration

  const { error } = await supabase
    .from('registration_tokens')
    .insert({
      token,
      email,
      company_code: companyCode,
      used: false,
      expires_at: expires_at.toISOString(),
    })

  if (error) throw error

  return `${process.env.NEXTAUTH_URL}/tracking/register?token=${token}`
}

// NextAuth Configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          console.log("Attempting to find user:", credentials.username);

          const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("username", credentials.username)
            .single();

          if (error || !user) {
            console.error("User not found or DB error:", error);
            return null;
          }

          const passwordValid = await bcrypt.compare(credentials.password, user.password);
          if (!passwordValid) {
            console.log("Invalid password");
            return null;
          }

          return {
            id: user.id,
            username: user.username,
            email: user.email,
            companyCode: user.company_code,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 14 * 24 * 60 * 60, // 14 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.companyCode = user.companyCode;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.username = token.username;
        session.user.companyCode = token.companyCode;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/tracking/login",
    error: "/tracking/error",
  },
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;