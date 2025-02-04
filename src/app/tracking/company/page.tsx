// app/tracking/company/page.tsx
import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { CompanyResultsClient } from '@/components/CompanyResultsClient'

export default async function CompanyPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/tracking/login')
  }

  return (
    <div className="flex-1 flex flex-col items-center pt-16 md:pt-32 px-4 md:px-6 font-['Urbanist'] min-h-0 bg-white">
      <div className="w-full max-w-2xl lg:max-w-4xl mb-16">
        {/* Header with Sign Out */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black">
              Your Shipments
            </h1>
            <p className="text-gray-500 mt-2">
              Welcome back, {session.user.username}
            </p>
          </div>
          <form 
            action={async () => {
              'use server'
              await signOut()
            }}
          >
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>

        {/* Company Results */}
        <CompanyResultsClient 
          customerCode={session.user.companyCode} 
        />
      </div>
    </div>
  )
}