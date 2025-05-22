-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('student', 'landlord', 'admin')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  university_id TEXT,
  university_name TEXT,
  company_name TEXT,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  avatar_url TEXT,
  bio TEXT,
  program TEXT,
  year INTEGER,
  preferences JSONB,
  social_links JSONB,
  privacy_settings JSONB
);

-- Create roommate_preferences table
CREATE TABLE IF NOT EXISTS roommate_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  cleanliness INTEGER NOT NULL DEFAULT 3 CHECK (cleanliness BETWEEN 1 AND 5),
  noise_level INTEGER NOT NULL DEFAULT 3 CHECK (noise_level BETWEEN 1 AND 5),
  sleep_schedule TEXT NOT NULL DEFAULT 'flexible' CHECK (sleep_schedule IN ('early_bird', 'night_owl', 'flexible')),
  guests INTEGER NOT NULL DEFAULT 3 CHECK (guests BETWEEN 1 AND 5),
  smoking BOOLEAN NOT NULL DEFAULT FALSE,
  pets BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_listings table
CREATE TABLE IF NOT EXISTS saved_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  listing_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create roommate_matches table
CREATE TABLE IF NOT EXISTS roommate_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  matched_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  match_score INTEGER NOT NULL DEFAULT 0 CHECK (match_score BETWEEN 0 AND 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, matched_user_id)
);

-- Create housing_applications table
CREATE TABLE IF NOT EXISTS housing_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  listing_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roommate_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE roommate_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE housing_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- User profiles can be read by anyone but only updated by the owner
CREATE POLICY "Public profiles are viewable by everyone" 
  ON user_profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
  ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- Roommate preferences can be read by anyone but only updated by the owner
CREATE POLICY "Roommate preferences are viewable by everyone" 
  ON roommate_preferences FOR SELECT USING (true);

CREATE POLICY "Users can update their own roommate preferences" 
  ON roommate_preferences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own roommate preferences" 
  ON roommate_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Saved listings can only be accessed by the owner
CREATE POLICY "Users can view their own saved listings" 
  ON saved_listings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own saved listings" 
  ON saved_listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own saved listings" 
  ON saved_listings FOR DELETE USING (auth.uid() = user_id);

-- Roommate matches can be viewed by both users involved
CREATE POLICY "Users can view their own matches" 
  ON roommate_matches FOR SELECT USING (auth.uid() = user_id OR auth.uid() = matched_user_id);
CREATE POLICY "Users can insert their own matches" 
  ON roommate_matches FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own matches" 
  ON roommate_matches FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = matched_user_id);

-- Housing applications can only be accessed by the owner
CREATE POLICY "Users can view their own applications" 
  ON housing_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own applications" 
  ON housing_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own applications" 
  ON housing_applications FOR UPDATE USING (auth.uid() = user_id);

-- Messages can be viewed by sender or recipient
CREATE POLICY "Users can view messages they sent or received" 
  ON messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can insert messages they send" 
  ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Recipients can mark messages as read" 
  ON messages FOR UPDATE USING (auth.uid() = recipient_id);
