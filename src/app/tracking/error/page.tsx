// src/app/tracking/error/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex-1 flex flex-col items-center pt-16 md:pt-32 px-4 md:px-6 font-['Urbanist'] min-h-0 bg-white">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight text-black">
          Authentication Error
        </h1>
        <p className="text-gray-600 mb-8">
          {error === 'CredentialsSignin' 
            ? 'Invalid username or password'
            : 'An error occurred during authentication'}
        </p>
        <Link 
          href="/tracking/login"
          className="inline-block bg-black text-white py-2 px-8 rounded-full hover:bg-gray-800 transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </div>
  )
}