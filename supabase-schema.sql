-- ============================================
-- Solma Care Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Categories (Topics)
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#C4622D',
  icon TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author_id UUID,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  seo_title TEXT,
  meta_description TEXT,
  faqs JSONB DEFAULT '[]'::jsonb,
  tags TEXT[] DEFAULT '{}',
  reading_time INTEGER DEFAULT 1,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Comments
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page Views
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
  page_path TEXT DEFAULT '/',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pages (for editable static pages like About, Terms)
CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings (key-value store)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Roles
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL,
  role TEXT DEFAULT 'writer' CHECK (role IN ('admin', 'writer')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Triggers
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Default Categories
-- ============================================

INSERT INTO categories (name, slug, description, color) VALUES
  ('PCOS & Hormonal Health', 'pcos', 'The entry point — and the most underserved category relative to demand.', '#C4622D'),
  ('Metabolic Health', 'metabolic-health', 'Higher visceral fat at lower BMI. Earlier risk. Reference ranges built for someone else.', '#2D1B3D'),
  ('Fertility, Pregnancy & Postpartum', 'fertility', 'Through a South Asian cultural lens — including the conversations at family dinners.', '#5C6E54'),
  ('Commonly Missed Conditions', 'missed-conditions', 'Anemia, thyroid, vitamin D — common in South Asian women, dismissed in clinic.', '#C8952A'),
  ('Living With It', 'living-with-it', 'Family pressure, stigma, food at gatherings. Lived cultural fluency, not just medicine.', '#7A5C8A')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- Default Site Settings
-- ============================================

INSERT INTO site_settings (key, value) VALUES
  ('hero_badge', 'For South Asian women'),
  ('hero_title', 'Your results were "normal." Your body disagreed.'),
  ('hero_description', 'South Asian women with PCOS, insulin resistance, and thyroid conditions are routinely told their results are fine — because the reference ranges were built on someone else''s body.'),
  ('hero_photo', '/hero.jpg')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- Row Level Security
-- ============================================

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Public read access policies
DROP POLICY IF EXISTS "Public can view published posts" ON posts;
CREATE POLICY "Public can view published posts" ON posts FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Public can view categories" ON categories;
CREATE POLICY "Public can view categories" ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view approved comments" ON comments;
CREATE POLICY "Public can view approved comments" ON comments FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Public can insert comments" ON comments;
CREATE POLICY "Public can insert comments" ON comments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view pages" ON pages;
CREATE POLICY "Public can view pages" ON pages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view site settings" ON site_settings;
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can insert contact messages" ON contact_messages;
CREATE POLICY "Public can insert contact messages" ON contact_messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can insert subscribers" ON subscribers;
CREATE POLICY "Public can insert subscribers" ON subscribers FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can insert page views" ON page_views;
CREATE POLICY "Public can insert page views" ON page_views FOR INSERT WITH CHECK (true);
