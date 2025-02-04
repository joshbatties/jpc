// app/api/admin/generate-link/route.ts
import { generateRegistrationToken } from '@/auth'
import { NextResponse } from 'next/server'

// Basic admin authentication middleware
const validateAdminRequest = (request: Request) => {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return false
  }
  return true
}

export async function POST(request: Request) {
  // Validate admin access
  if (!validateAdminRequest(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const registrationLink = await generateRegistrationToken(email)
    
    return NextResponse.json({ registrationLink })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}