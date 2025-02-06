'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function CompanySignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      <span>Sign Out</span>
    </button>
  )
}
