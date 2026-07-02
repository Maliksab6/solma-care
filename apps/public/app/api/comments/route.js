import { createClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { post_id, author_name, author_email, content } = body
    if (!post_id || !author_name || !author_email || !content) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }
    const supabase = createClient()
    const { error } = await supabase.from('comments').insert([{
      post_id, author_name, author_email, content, status: 'pending'
    }])
    if (error) throw error
    return NextResponse.json({ message: 'Comment submitted for review' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
