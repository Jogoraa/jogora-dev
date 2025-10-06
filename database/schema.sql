-- Portfolio Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  location VARCHAR(255),
  website VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  period VARCHAR(100) NOT NULL,
  description TEXT,
  achievements TEXT[],
  technologies TEXT[],
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category VARCHAR(255) NOT NULL,
  skills TEXT[] NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  degree VARCHAR(255) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  year VARCHAR(50) NOT NULL,
  location VARCHAR(255),
  description TEXT,
  gpa VARCHAR(20),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  issuer VARCHAR(255),
  date_issued DATE,
  date_expires DATE,
  credential_id VARCHAR(255),
  credential_url VARCHAR(500),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create languages table
CREATE TABLE IF NOT EXISTS languages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  language VARCHAR(100) NOT NULL,
  proficiency VARCHAR(50) NOT NULL, -- Native, Fluent, Intermediate, Basic
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  technologies TEXT[] NOT NULL,
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  image_url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'completed', -- completed, in-progress, planned
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_experience_user_id ON experience(user_id);
CREATE INDEX IF NOT EXISTS idx_experience_sort_order ON experience(sort_order);
CREATE INDEX IF NOT EXISTS idx_skills_user_id ON skills(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_sort_order ON skills(sort_order);
CREATE INDEX IF NOT EXISTS idx_education_user_id ON education(user_id);
CREATE INDEX IF NOT EXISTS idx_education_sort_order ON education(sort_order);
CREATE INDEX IF NOT EXISTS idx_certifications_user_id ON certifications(user_id);
CREATE INDEX IF NOT EXISTS idx_certifications_sort_order ON certifications(sort_order);
CREATE INDEX IF NOT EXISTS idx_languages_user_id ON languages(user_id);
CREATE INDEX IF NOT EXISTS idx_languages_sort_order ON languages(sort_order);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for authenticated users
-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile" ON profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Experience policies
CREATE POLICY "Users can manage their own experience" ON experience
  FOR ALL USING (auth.uid() = user_id);

-- Skills policies
CREATE POLICY "Users can manage their own skills" ON skills
  FOR ALL USING (auth.uid() = user_id);

-- Education policies
CREATE POLICY "Users can manage their own education" ON education
  FOR ALL USING (auth.uid() = user_id);

-- Certifications policies
CREATE POLICY "Users can manage their own certifications" ON certifications
  FOR ALL USING (auth.uid() = user_id);

-- Languages policies
CREATE POLICY "Users can manage their own languages" ON languages
  FOR ALL USING (auth.uid() = user_id);

-- Projects policies
CREATE POLICY "Users can manage their own projects" ON projects
  FOR ALL USING (auth.uid() = user_id);

-- Public read access for portfolio display (optional - remove if you want private portfolios)
CREATE POLICY "Public can view profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Public can view experience" ON experience
  FOR SELECT USING (true);

CREATE POLICY "Public can view skills" ON skills
  FOR SELECT USING (true);

CREATE POLICY "Public can view education" ON education
  FOR SELECT USING (true);

CREATE POLICY "Public can view certifications" ON certifications
  FOR SELECT USING (true);

CREATE POLICY "Public can view languages" ON languages
  FOR SELECT USING (true);

CREATE POLICY "Public can view projects" ON projects
  FOR SELECT USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_languages_updated_at BEFORE UPDATE ON languages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
