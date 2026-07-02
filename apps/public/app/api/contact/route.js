import { createClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { full_name, email, subject, message } = body
    if (!full_name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message required' }, { status: 400 })
    }
    const supabase = createClient()
    const { error } = await supabase.from('contact_messages').insert([{
      full_name, email, subject: subject || '', message
    }])
    if (error) throw error
    return NextResponse.json({ message: 'Message sent!' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
