import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import LoginForm from '../../../components/tracking/LoginForm' // Your existing login form component will be moved here

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  
  // If user is authenticated, redirect to company page
  if (session?.user) {
    redirect('/tracking')
  }

  // If not authenticated, show login form
  return <LoginForm />
}