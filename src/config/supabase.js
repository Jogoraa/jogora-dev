import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Database table names
export const TABLES = {
  PROFILE: 'profiles',
  EXPERIENCE: 'experience',
  SKILLS: 'skills',
  EDUCATION: 'education',
  CERTIFICATIONS: 'certifications',
  LANGUAGES: 'languages',
  PROJECTS: 'projects'
};

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  console.error('Supabase error:', error);
  
  if (error.code === 'PGRST301') {
    throw new Error('No data found');
  } else if (error.code === 'PGRST116') {
    throw new Error('Invalid request format');
  } else if (error.code === '23505') {
    throw new Error('Duplicate entry');
  } else if (error.code === '42501') {
    throw new Error('Permission denied');
  } else {
    throw new Error(error.message || 'Database operation failed');
  }
};

export default supabase;
