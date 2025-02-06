// app/tracking/login/LoginForm.tsx
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Ship, HelpCircle, Eye, EyeOff } from 'lucide-react'
import AccountRequestForm from './AccountRequestForm'
import LoadingSpinner from '../LoadingSpinner'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAccountForm, setShowAccountForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        username: credentials.username,
        password: credentials.password,
        redirect: false,
      })
      if (result?.error) {
        setError('Invalid username or password')
        return
      }
      if (result?.ok) {
        router.push('/tracking/company')
      }
    } catch {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  const handleTrackShipment = () => {
    router.push('/tracking')
  }

  return (
    <div className="flex-1 flex flex-col items-center pt-16 md:pt-32 px-4 md:px-6 font-['Urbanist'] min-h-0 bg-white pb-24">
      <div className="w-full max-w-2xl">
        <h1 className="text-6xl font-bold mb-8 tracking-tight text-black text-center md:text-6xl text-4xl">
          <span className="md:inline hidden">Sign in to your account</span>
          <span className="md:hidden">Sign in</span>
        </h1>
        {searchParams.get('registered') && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-center">
            Account created successfully! Please sign in.
          </div>
        )}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({
                  ...prev,
                  username: e.target.value
                }))}
                className="mt-1 block w-full rounded-full border border-gray-300 px-4 py-2.5 text-black focus:border-black focus:ring-0 transition-colors duration-200 text-lg"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({
                    ...prev,
                    password: e.target.value
                  }))}
                  className="mt-1 block w-full rounded-full border border-gray-300 px-4 py-2.5 text-black focus:border-black focus:ring-0 transition-colors duration-200 text-lg pr-12"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? 
                    <EyeOff className="w-5 h-5" /> : 
                    <Eye className="w-5 h-5" />
                  }
                </button>
              </div>
            </div>
            {error && (
              <div className="text-sm text-red-600">
                {error}
              </div>
            )}
            <div className="flex justify-center py-2">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2.5 px-4 rounded-full hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-200"
                >
                  Sign in
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="flex justify-center space-x-8 mt-8">
          <div className="flex flex-col items-center w-44 text-center">
            <button 
              onClick={handleTrackShipment}
              className="flex flex-col items-center group transition-transform duration-200 hover:scale-105"
            >
              <div className="p-5 rounded-full bg-gray-50 group-hover:bg-gray-100 group-hover:shadow-md transition-all duration-200">
                <Ship className="w-7 h-7 text-gray-600" />
              </div>
            </button>
            <h2 className="text-sm font-medium text-gray-900 mt-3 mb-1 text-center w-full">
              Track a Shipment
            </h2>
            <p className="text-xs text-gray-500 text-center w-full">
              Search by container, PO or Booking number
            </p>
          </div>
          <div className="flex flex-col items-center w-44 text-center">
            <button 
              onClick={() => setShowAccountForm(!showAccountForm)}
              className="flex flex-col items-center group transition-transform duration-200 hover:scale-105"
            >
              <div className="p-5 rounded-full bg-gray-50 group-hover:bg-gray-100 group-hover:shadow-md transition-all duration-200">
                <HelpCircle className="w-7 h-7 text-gray-600" />
              </div>
            </button>
            <h2 className="text-sm font-medium text-gray-900 mt-3 mb-1 text-center w-full">
              Don't have an account yet?
            </h2>
            <p className="text-xs text-gray-500 text-center w-full">
              Submit a request, and we'll get you set up.
            </p>
          </div>
        </div>
        
        {showAccountForm && <AccountRequestForm />}
      </div>
    </div>
  )
}