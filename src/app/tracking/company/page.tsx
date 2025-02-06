import authOptions from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { CompanyResultsClient } from '../../../components/tracking/CompanyResultsClient'
import CompanySignOut from '../../../components/tracking/CompanySignOut'
import CompanyActions from '../../../components/tracking/CompanyActions'

export default async function CompanyPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/tracking/login')
  }
  
  return (
    <div className="flex-1 flex flex-col items-center pt-16 md:pt-32 px-4 md:px-6 font-['Urbanist'] min-h-0 bg-white">
      <div className="w-full max-w-[1000px] lg:max-w-4xl mb-16">
        {/* Header with Sign Out */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-9xl md:text-4xl lg:text-9xl sm:text-2xl font-bold tracking-tight text-black">
              Your Shipments
            </h1>
            <p className="text-gray-500 mt-2">
              Welcome back, {session.user.username}
            </p>
          </div>
        </div>
        
        {/* Company Results */}
        <CompanyResultsClient customerCode={session.user.companyCode} />
        
        {/* Action Buttons and Help Form */}
        <CompanyActions />
      </div>
    </div>
  )
}