-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'landlord', 'admin')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  university_id TEXT,
  university_name TEXT,
  company_name TEXT,
  verified BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create demo users
INSERT INTO auth.users (id, email, raw_user_meta_data, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'student@uni.com', '{"first_name":"Student", "last_name":"User", "role":"student"}', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'property@manager.com', '{"first_name":"Property", "last_name":"Manager", "role":"landlord"}', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Create user profiles for demo users
INSERT INTO user_profiles (id, email, role, first_name, last_name, university_id, university_name, company_name, verified)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'student@uni.com', 'student', 'Student', 'User', 'uoft', 'University of Toronto', NULL, TRUE),
  ('00000000-0000-0000-0000-000000000002', 'property@manager.com', 'landlord', 'Property', 'Manager', NULL, NULL, 'ABC Property Management', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Set passwords for demo users (password: 123456789)
-- Note: In a real application, you would never set passwords directly like this
-- This is only for demo purposes
UPDATE auth.users
SET encrypted_password = '$2a$10$Xt5XvMwMKTgYcgWQ1xPBs.Wy5Bb5UrGVm5xFWj1JvKZPLKTSBJbJe'
WHERE email IN ('student@uni.com', 'property@manager.com');
