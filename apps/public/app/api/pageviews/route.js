import { createClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { post_id, page_path } = await request.json()
    const supabase = createClient()
    const { error } = await supabase.from('page_views').insert([{
      post_id: post_id || null, page_path: page_path || '/'
    }])
    if (error) throw error
    return NextResponse.json({ message: 'ok' })
  } catch {
    return NextResponse.json({ message: 'ok' })
  }
}
