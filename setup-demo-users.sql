-- Create demo users table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(50) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  university_id VARCHAR(100),
  university_name VARCHAR(255),
  company_name VARCHAR(255),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  avatar_url TEXT,
  bio TEXT,
  program VARCHAR(255),
  year INTEGER,
  preferences JSONB,
  social_links JSONB,
  privacy_settings JSONB
);

-- Insert demo student user
INSERT INTO user_profiles (
  id, email, role, first_name, last_name, university_name, verified, created_at
) VALUES (
  '00000000-0000-0000-0000-000000000001', 
  'student@uni.com', 
  'student', 
  'Alex', 
  'Johnson', 
  'University of Toronto', 
  TRUE, 
  NOW()
) ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  university_name = EXCLUDED.university_name,
  verified = EXCLUDED.verified;

-- Insert demo landlord user
INSERT INTO user_profiles (
  id, email, role, first_name, last_name, company_name, verified, created_at
) VALUES (
  '00000000-0000-0000-0000-000000000002', 
  'property@manager.com', 
  'landlord', 
  'Sarah', 
  'Williams', 
  'Campus Property Management', 
  TRUE, 
  NOW()
) ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  company_name = EXCLUDED.company_name,
  verified = EXCLUDED.verified;
