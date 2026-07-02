import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function GET() {
  const supabase = getServiceClient()
  if (!supabase) return NextResponse.json({ error: 'Missing env vars' }, { status: 500 })
  const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function PATCH(request) {
  const supabase = getServiceClient()
  if (!supabase) return NextResponse.json({ error: 'Missing env vars' }, { status: 500 })
  const { id, ...updates } = await request.json()
  const { data, error } = await supabase.from('contact_messages').update(updates).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(request) {
  const supabase = getServiceClient()
  if (!supabase) return NextResponse.json({ error: 'Missing env vars' }, { status: 500 })
  const { id } = await request.json()
  const { error } = await supabase.from('contact_messages').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
