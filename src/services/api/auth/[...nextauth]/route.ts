import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// Import the Supabase adapter (ensure it’s installed and configured)
import { SupabaseAdapter } from "@next-auth/supabase-adapter";

// Define our NextAuth options
export const authOptions: NextAuthOptions = {
  // Configure the Supabase Adapter for user management.
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!
  }),

  // Define the authentication providers.
  providers: [
    // Credentials Provider for username/password sign-in.
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // The authorize function verifies the credentials.
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Use Supabase's auth endpoint to verify the credentials.
        // We are using the anon key for this call.
        const res = await fetch(`${process.env.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": process.env.SUPABASE_ANON_KEY!,
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await res.json();

        // If authentication is successful, Supabase returns a user object with an id.
        if (data && data.user && data.user.id) {
          // Optionally, you could modify the user object here if needed.
          return data.user;
        }
        // If the credentials are invalid, return null.
        return null;
      },
    }),
    // Google Provider for optional Google sign-in.
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // Callbacks allow us to extend or modify the token and session.
  callbacks: {
    async jwt({ token, user }) {
      // When the user first signs in, attach the company code from the user record.
      // We assume that the user record has a property named "company_code".
      if (user) {
        token.companyCode = (user as any).company_code;
      }
      return token;
    },
    async session({ session, token }) {
      // Add the company code from the token to the session object.
      session.user.companyCode = token.companyCode as string | undefined;
      return session;
    },
  },

  // Use JSON Web Tokens (JWT) for session management.
  session: {
    strategy: "jwt",
  },

  // Specify custom pages. The signIn page is where users can sign in with an existing account.
  pages: {
    signIn: "/auth/signin",
  },
};

// Create the NextAuth route handler.
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests.
export { handler as GET, handler as POST };