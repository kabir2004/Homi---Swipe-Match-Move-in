-- First, let's create the user_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'landlord', 'admin')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  university_id TEXT,
  university_name TEXT,
  company_name TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  avatar_url TEXT
);

-- Insert the student user
-- Note: In a real application, we would use Supabase Auth API to create users
-- For demo purposes, we'll insert directly into the user_profiles table
INSERT INTO user_profiles (
  id, 
  email, 
  role, 
  first_name, 
  last_name, 
  university_id, 
  university_name, 
  verified, 
  created_at
) VALUES (
  '00000000-0000-0000-0000-000000000001', 
  'student@uni.com', 
  'student', 
  'Alex', 
  'Student', 
  'uoft', 
  'University of Toronto', 
  TRUE, 
  NOW()
) ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  university_id = EXCLUDED.university_id,
  university_name = EXCLUDED.university_name,
  verified = EXCLUDED.verified;

-- Insert the landlord user
INSERT INTO user_profiles (
  id, 
  email, 
  role, 
  first_name, 
  last_name, 
  company_name, 
  verified, 
  created_at
) VALUES (
  '00000000-0000-0000-0000-000000000002', 
  'property@manager.com', 
  'landlord', 
  'Taylor', 
  'Property', 
  'Toronto Property Management', 
  TRUE, 
  NOW()
) ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  company_name = EXCLUDED.company_name,
  verified = EXCLUDED.verified;
