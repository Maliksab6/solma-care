import { redirect } from 'next/navigation'
export default function ArticlePage({ params }) { redirect(`/blog/${params.slug}`) }
