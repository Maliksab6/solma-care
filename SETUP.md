# Solma Care — Setup Guide

A complete hormonal health blog for South Asian women, powered by Next.js and Supabase.

## What You Get

- **Public site** — Blog posts, topics, about, contact, FAQ, terms pages
- **Admin panel** — Create/edit/delete posts, manage categories, FAQ builder, rich text editor
- **SEO built-in** — JSON-LD schema, sitemap, RSS feed, OG tags, canonical URLs
- **Fast** — ISR caching (5-min refresh), optimized fonts, security headers
- **Secure** — Server-side auth, RLS policies, admin-only APIs

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+ installed
- [Supabase](https://supabase.com/) account (free tier works)
- [Vercel](https://vercel.com/) account (free tier works)

---

## Quick Start

### 1. Install dependencies

```bash
cd apps/public
npm install

cd ../admin
npm install
```

### 2. Create Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Note your **Project URL** and **Anon Key** (Settings → API)
3. Go to **SQL Editor** → paste and run `supabase-schema.sql`
4. Run `supabase-admin-policies.sql`

### 3. Create admin role in Supabase

Go to **SQL Editor** and run:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.is_admin());

CREATE POLICY "Users can read own role" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
```

### 4. Set up environment variables

Create `apps/public/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://www.solmacare.com
NEXT_PUBLIC_SITE_NAME=Solma Care
NEXT_PUBLIC_AUTHOR_NAME=Solma Care
```

Create `apps/admin/.env.local` with the same Supabase keys.

### 5. Run locally

```bash
# Terminal 1 — Public site (port 3000)
cd apps/public
npm run dev

# Terminal 2 — Admin panel (port 3001)
cd apps/admin
npm run dev
```

### 6. First Admin User

1. Open your admin site (`/admin/login`)
2. Sign up with your email/password
3. Go to Supabase → SQL Editor → run:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR-USER-UUID', 'admin');
```

4. Refresh the admin panel — you now have admin access

---

## Deploy to Vercel

### Public site

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import GitHub repo
3. **Root Directory:** `apps/public`
4. **Framework Preset:** Next.js
5. Add environment variables
6. Deploy

### Admin panel

1. New Project → Import same GitHub repo
2. **Root Directory:** `apps/admin`
3. Add environment variables
4. Deploy

---

## Custom Domain Setup

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |
| CNAME | admin | cname.vercel-dns.com |

---

## SEO Features

| Feature | Where |
|---------|-------|
| JSON-LD schema | Every page (Article, FAQ, Breadcrumb, Person, Website) |
| Sitemap | `/sitemap.xml` (auto-generated from DB) |
| RSS feed | `/feed.xml` |
| OG tags | All pages (title, description, image) |
| Canonical URLs | All pages |
| Search console | Verification file in `public/` |
| Security headers | HSTS, X-Frame-Options, CSP, etc. |
