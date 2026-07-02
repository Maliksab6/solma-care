import { createClient as createSupabaseClient } from '@supabase/supabase-js'

let client = null

export function createClient() {
  if (client) return client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  client = createSupabaseClient(url, key)
  return client
}
