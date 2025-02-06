// src/app/tracking/register/page.tsx
'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const token = searchParams.get('token')
    if (!token) {
      setError('Invalid registration link')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          ...formData
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Redirect to login page with success message
      router.push('/tracking/login?registered=true')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center pt-16 md:pt-32 px-4 md:px-6 font-['Urbanist'] min-h-0 bg-white">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 tracking-tight text-black text-center">
          Create your account
        </h1>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  username: e.target.value
                }))}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  password: e.target.value
                }))}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  confirmPassword: e.target.value
                }))}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}