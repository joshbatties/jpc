// app/tracking/verify/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [message, setMessage] = useState('Verifying...')

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token')
      if (!token) {
        setMessage('Invalid verification link')
        return
      }

      try {
        const result = await signIn('magic-link', {
          token,
          redirect: false
        })

        if (result?.error) {
          setMessage('This link is invalid or has expired')
        } else {
          router.push('/tracking/company')
        }
      } catch (error) {
        setMessage('An error occurred during verification')
      }
    }

    verifyToken()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <p className="text-lg">{message}</p>
      </div>
    </div>
  )
