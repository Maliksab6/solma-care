import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function GET(_request, { params }) {
  const supabase = getServiceClient()
  if (!supabase) return NextResponse.json({ error: 'Missing env vars' }, { status: 500 })

  const { id } = params
  const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data })
}

export async function PATCH(request, { params }) {
  const supabase = getServiceClient()
  if (!supabase) return NextResponse.json({ error: 'Missing env vars' }, { status: 500 })

  const { id } = params
  const body = await request.json()
  const { data, error } = await supabase.from('posts').update(body).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data })
}

export async function DELETE(_request, { params }) {
  const supabase = getServiceClient()
  if (!supabase) return NextResponse.json({ error: 'Missing env vars' }, { status: 500 })

  const { id } = params
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
