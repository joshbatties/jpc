'use client'

import { SessionProvider } from 'next-auth/react'
import TrackingHeader from './TrackingHeader'

export default function HeaderWithProvider() {
  return (
    <SessionProvider>
      <TrackingHeader />
    </SessionProvider>
  )
}