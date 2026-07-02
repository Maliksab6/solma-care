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

  const [posts, publishedPosts, comments, categories, subscribers, pageViews, unseenMessages, pendingComments] = await Promise.all([
    supabase.from('posts').select('id', { count: 'exact', head: true }),
    supabase.from('posts').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('comments').select('id', { count: 'exact', head: true }),
    supabase.from('categories').select('id', { count: 'exact', head: true }),
    supabase.from('subscribers').select('id', { count: 'exact', head: true }),
    supabase.from('page_views').select('id', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
    supabase.from('comments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
  ])

  return NextResponse.json({
    totalPosts: posts.count || 0,
    publishedPosts: publishedPosts.count || 0,
    totalComments: comments.count || 0,
    totalCategories: categories.count || 0,
    totalSubscribers: subscribers.count || 0,
    totalPageViews: pageViews.count || 0,
    unseenMessages: unseenMessages.count || 0,
    pendingComments: pendingComments.count || 0,
  })
}
