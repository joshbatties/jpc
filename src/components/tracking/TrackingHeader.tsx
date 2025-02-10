'use client'

import React, { useState, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import Image from 'next/image'

const TrackingHeader = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileRef = useRef(null)

  const handleMouseEnter = () => {
    setShowProfileMenu(true)
  }

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!profileRef.current?.matches(':hover')) {
        setShowProfileMenu(false)
      }
    }, 100)
  }

  const buttonClasses = "px-4 md:px-8 py-3 text-2xl md:text-3xl font-medium transition-all duration-200 rounded-full hover:scale-105 text-black hover:text-gray-600"
  return (
    <header className="tracking-header w-full flex justify-between items-center py-6 px-2 md:px-4 bg-white">
      {/* Left: Home button */}
      <div className="flex-1 flex justify-start">
        <button
          onClick={() => router.push('/')}
          className={buttonClasses}
        >
          Home
        </button>
      </div>
      
      {/* Center: Logo */}
      <div className="flex justify-center flex-1">
        <a 
          href="https://jpcgroup.com" 
          className="transition-transform duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
        >
          <img 
            src="/images/jpc-logo.png" 
            alt="JPC International" 
            className="h-7 md:h-10"
          />
        </a>
      </div>

      {/* Right: Auth UI */}
      <div className="flex-1 flex justify-end relative">
        {session?.user ? (
          <div
            ref={profileRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-8 h-8 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-sm group"
            >
              <Image
                src="/icons/user.png"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            </button>

            {showProfileMenu && (
              <div 
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {session.user.username}
                  </p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => router.push('/tracking/login')}
            className="px-4 md:px-8 py-3 text-2xl md:text-3xl font-medium rounded-full border border-gray-100 text-black hover:bg-gray-50 transition-all duration-200 hover:scale-105"
          >
            Log in
          </button>
        )}
      </div>
    </header>
  )
}

export default TrackingHeader