'use client'

import { SessionProvider } from 'next-auth/react'
import Header from './Header'

export default function HeaderWithProvider() {
  return (
    <SessionProvider>
      <Header />
    </SessionProvider>
  )
}