// auth.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Validate registration token function
export const validateRegistrationToken = async (token: string, email: string) => {
  const { data: tokenData, error } = await supabase
    .from('registration_tokens')
    .select('*')
    .eq('token', token)
    .eq('email', email)
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (error || !tokenData) return null
  return tokenData
}

// Mark token as used
export const markTokenUsed = async (token: string) => {
  await supabase
    .from('registration_tokens')
    .update({ used: true })
    .eq('token', token)
}

// Generate registration token
export const generateRegistrationToken = async (email: string) => {
  const token = Math.random().toString(36).slice(2, 8).toUpperCase()
  const expires_at = new Date()
  expires_at.setHours(expires_at.getHours() + 24) // 24 hour expiration

  const { error } = await supabase
    .from('registration_tokens')
    .insert({
      token,
      email,
      expires_at: expires_at.toISOString(),
    })

  if (error) throw error

  return `${process.env.NEXTAUTH_URL}/tracking/register?token=${token}`
}

export const { auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null
        
        try {
          // Get user from database
          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', credentials.username)
            .single()

          if (error || !user) return null

          // Verify password
          const passwordValid = await bcrypt.compare(credentials.password, user.password)
          if (!passwordValid) return null

          // Return user object
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            companyCode: user.company_code
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 14 * 24 * 60 * 60, // 14 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username
        token.companyCode = user.companyCode
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.username = token.username as string
        session.user.companyCode = token.companyCode as string
      }
      return session
    }
  },
  pages: {
    signIn: '/tracking/login',
    error: '/tracking/error'
  }
})

// Type augmentation for Session
declare module "next-auth" {
  interface Session {
    user: {
      username: string
      companyCode: string
    } & DefaultSession["user"]
  }

  interface User {
    username: string
    companyCode: string
  }
}

// Type augmentation for JWT
declare module "next-auth/jwt" {
  interface JWT {
    username: string
    companyCode: string
  }
}