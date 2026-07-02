-- ============================================
-- Solma Care Admin RLS Policies
-- Run this in Supabase SQL Editor
-- ============================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- POSTS
DROP POLICY IF EXISTS "Admins can insert posts" ON posts;
CREATE POLICY "Admins can insert posts" ON posts FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can update posts" ON posts;
CREATE POLICY "Admins can update posts" ON posts FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete posts" ON posts;
CREATE POLICY "Admins can delete posts" ON posts FOR DELETE USING (is_admin());

DROP POLICY IF EXISTS "Admins can view all posts" ON posts;
CREATE POLICY "Admins can view all posts" ON posts FOR SELECT USING (is_admin() OR status = 'published');

-- CATEGORIES
DROP POLICY IF EXISTS "Admins can insert categories" ON categories;
CREATE POLICY "Admins can insert categories" ON categories FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can update categories" ON categories;
CREATE POLICY "Admins can update categories" ON categories FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete categories" ON categories;
CREATE POLICY "Admins can delete categories" ON categories FOR DELETE USING (is_admin());

-- COMMENTS
DROP POLICY IF EXISTS "Admins can view all comments" ON comments;
CREATE POLICY "Admins can view all comments" ON comments FOR SELECT USING (is_admin() OR status = 'approved');

DROP POLICY IF EXISTS "Admins can update comments" ON comments;
CREATE POLICY "Admins can update comments" ON comments FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete comments" ON comments;
CREATE POLICY "Admins can delete comments" ON comments FOR DELETE USING (is_admin());

-- PAGES
DROP POLICY IF EXISTS "Admins can insert pages" ON pages;
CREATE POLICY "Admins can insert pages" ON pages FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can update pages" ON pages;
CREATE POLICY "Admins can update pages" ON pages FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete pages" ON pages;
CREATE POLICY "Admins can delete pages" ON pages FOR DELETE USING (is_admin());

-- SITE_SETTINGS
DROP POLICY IF EXISTS "Admins can update site_settings" ON site_settings;
CREATE POLICY "Admins can update site_settings" ON site_settings FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can insert site_settings" ON site_settings;
CREATE POLICY "Admins can insert site_settings" ON site_settings FOR INSERT WITH CHECK (is_admin());

-- USER_ROLES
DROP POLICY IF EXISTS "Admins can view user_roles" ON user_roles;
CREATE POLICY "Admins can view user_roles" ON user_roles FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Admins can insert user_roles" ON user_roles;
CREATE POLICY "Admins can insert user_roles" ON user_roles FOR INSERT WITH CHECK (is_admin());

-- CONTACT_MESSAGES
DROP POLICY IF EXISTS "Admins can view contact_messages" ON contact_messages;
CREATE POLICY "Admins can view contact_messages" ON contact_messages FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Admins can update contact_messages" ON contact_messages;
CREATE POLICY "Admins can update contact_messages" ON contact_messages FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete contact_messages" ON contact_messages;
CREATE POLICY "Admins can delete contact_messages" ON contact_messages FOR DELETE USING (is_admin());

-- SUBSCRIBERS
DROP POLICY IF EXISTS "Admins can view subscribers" ON subscribers;
CREATE POLICY "Admins can view subscribers" ON subscribers FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete subscribers" ON subscribers;
CREATE POLICY "Admins can delete subscribers" ON subscribers FOR DELETE USING (is_admin());

-- PAGE_VIEWS
DROP POLICY IF EXISTS "Admins can view page_views" ON page_views;
CREATE POLICY "Admins can view page_views" ON page_views FOR SELECT USING (is_admin());
