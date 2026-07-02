import { createClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { email } = await request.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }
    const supabase = createClient()
    const { error } = await supabase.from('subscribers').insert([{ email }])
    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Already subscribed!' })
      }
      throw error
    }
    return NextResponse.json({ message: 'Subscribed successfully!' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
