// src/app/api/register/route.ts
import { validateRegistrationToken, markTokenUsed } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { token, email, username, password } = await request.json()

    // Validate token and email match
    const tokenData = await validateRegistrationToken(token, email)
    if (!tokenData) {
      return NextResponse.json(
        { error: 'Invalid or expired registration link' },
        { status: 400 }
      )
    }

    // Check if username is taken
    const { data: existingUser } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user in database
    const { error: createError } = await supabase
      .from('users')
      .insert({
        username,
        email,
        password: hashedPassword,
        company_code: tokenData.company_code
      })

    if (createError) {
      throw createError
    }

    // Mark registration token as used
    await markTokenUsed(token)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create account' },
      { status: 500 }
    )
  }
}