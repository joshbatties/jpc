// src/middleware.ts
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      // Exclude login and register pages from authentication requirement
      if (req.nextUrl.pathname === "/tracking/login" || 
          req.nextUrl.pathname === "/tracking/register") {
        return true
      }
      
      // Require authentication for all other /tracking routes
      if (req.nextUrl.pathname.startsWith("/tracking")) {
        return !!token
      }
      
      return true
    },
  },
  pages: {
    signIn: '/tracking/login',
  }
})

export const config = {
  matcher: ["/tracking/:path*"]
}