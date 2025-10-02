// Resume Data Service with Supabase Integration
import { supabase, TABLES, handleSupabaseError } from '../config/supabase';
import { mockData } from '../data/mockData';

class ResumeService {
  constructor() {
    this.localStorageKey = 'resume_data'; // Fallback for offline mode
  }

  // Get current user ID
  async getCurrentUserId() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      throw new Error('User not authenticated');
    }
    return user.id;
  }

  // Get all resume data from Supabase
  async getResumeData() {
    try {
      const userId = await this.getCurrentUserId();
      
      // Fetch all resume sections in parallel
      const [profileRes, experienceRes, skillsRes, educationRes, certificationsRes, languagesRes] = await Promise.all([
        supabase.from(TABLES.PROFILE).select('*').eq('user_id', userId).single(),
        supabase.from(TABLES.EXPERIENCE).select('*').eq('user_id', userId).order('sort_order', { ascending: false }),
        supabase.from(TABLES.SKILLS).select('*').eq('user_id', userId).order('sort_order'),
        supabase.from(TABLES.EDUCATION).select('*').eq('user_id', userId).order('sort_order', { ascending: false }),
        supabase.from(TABLES.CERTIFICATIONS).select('*').eq('user_id', userId).order('sort_order', { ascending: false }),
        supabase.from(TABLES.LANGUAGES).select('*').eq('user_id', userId).order('sort_order')
      ]);

      // Handle errors for each query
      if (profileRes.error && profileRes.error.code !== 'PGRST116') {
        handleSupabaseError(profileRes.error);
      }
      if (experienceRes.error) handleSupabaseError(experienceRes.error);
      if (skillsRes.error) handleSupabaseError(skillsRes.error);
      if (educationRes.error) handleSupabaseError(educationRes.error);
      if (certificationsRes.error) handleSupabaseError(certificationsRes.error);
      if (languagesRes.error) handleSupabaseError(languagesRes.error);

      // Construct resume data object
      const resumeData = {
        profile: profileRes.data || mockData.profile,
        experience: experienceRes.data || [],
        skills: skillsRes.data || [],
        education: educationRes.data || [],
        certifications: (certificationsRes.data || []).map(cert => cert.name),
        languages: (languagesRes.data || []).map(lang => `${lang.language} (${lang.proficiency})`)
      };

      // If no data exists, initialize with mock data
      if (!profileRes.data) {
        await this.initializeWithMockData(userId);
        return mockData;
      }

      return resumeData;
    } catch (error) {
      console.error('Error fetching resume data:', error);
      // Fallback to localStorage or mock data
      const savedData = localStorage.getItem(this.localStorageKey);
      return savedData ? JSON.parse(savedData) : mockData;
    }
  }

  // Initialize database with mock data
  async initializeWithMockData(userId) {
    try {
      // Insert profile
      await supabase.from(TABLES.PROFILE).insert({
        user_id: userId,
        ...mockData.profile
      });

      // Insert experience
      if (mockData.experience?.length) {
        const experienceData = mockData.experience.map((exp, index) => ({
          user_id: userId,
          ...exp,
          sort_order: index
        }));
        await supabase.from(TABLES.EXPERIENCE).insert(experienceData);
      }

      // Insert skills
      if (mockData.skills?.length) {
        const skillsData = mockData.skills.map((skill, index) => ({
          user_id: userId,
          category: skill.category,
          skills: skill.skills || skill.items || [],
          sort_order: index
        }));
        await supabase.from(TABLES.SKILLS).insert(skillsData);
      }

      // Insert education
      if (mockData.education?.length) {
        const educationData = mockData.education.map((edu, index) => ({
          user_id: userId,
          ...edu,
          sort_order: index
        }));
        await supabase.from(TABLES.EDUCATION).insert(educationData);
      }

      // Insert certifications
      if (mockData.certifications?.length) {
        const certificationsData = mockData.certifications.map((cert, index) => ({
          user_id: userId,
          name: typeof cert === 'string' ? cert : cert.name,
          sort_order: index
        }));
        await supabase.from(TABLES.CERTIFICATIONS).insert(certificationsData);
      }

      // Insert languages
      if (mockData.languages?.length) {
        const languagesData = mockData.languages.map((lang, index) => {
          const [language, proficiency] = typeof lang === 'string' 
            ? lang.split(' (').map(s => s.replace(')', ''))
            : [lang.language || lang, lang.proficiency || 'Intermediate'];
          
          return {
            user_id: userId,
            language,
            proficiency,
            sort_order: index
          };
        });
        await supabase.from(TABLES.LANGUAGES).insert(languagesData);
      }

      return { success: true, message: 'Mock data initialized successfully' };
    } catch (error) {
      console.error('Error initializing mock data:', error);
      handleSupabaseError(error);
    }
  }

  // Save all resume data to Supabase
  async saveResumeData(data) {
    try {
      // Validate data structure
      this.validateResumeData(data);
      
      const userId = await this.getCurrentUserId();
      
      // Save to localStorage as backup
      localStorage.setItem(this.localStorageKey, JSON.stringify(data));
      
      // Update profile
      if (data.profile) {
        await this.updateProfile(data.profile);
      }
      
      // Update other sections
      if (data.experience) await this.updateExperience(data.experience);
      if (data.skills) await this.updateSkills(data.skills);
      if (data.education) await this.updateEducation(data.education);
      if (data.certifications) await this.updateCertifications(data.certifications);
      if (data.languages) await this.updateLanguages(data.languages);
      
      return { success: true, message: 'Resume data saved successfully' };
    } catch (error) {
      console.error('Error saving resume data:', error);
      throw new Error('Failed to save resume data');
    }
  }

  // Update profile information
  async updateProfile(profileData) {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from(TABLES.PROFILE)
        .upsert({
          user_id: userId,
          ...profileData
        }, { onConflict: 'user_id' })
        .select()
        .single();
      
      if (error) handleSupabaseError(error);
      
      return { success: true, data, message: 'Profile updated successfully' };
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  // Update experience
  async updateExperience(experienceArray) {
    try {
      const userId = await this.getCurrentUserId();
      
      // Delete existing experience
      await supabase.from(TABLES.EXPERIENCE).delete().eq('user_id', userId);
      
      // Insert new experience data
      if (experienceArray?.length) {
        const experienceData = experienceArray.map((exp, index) => ({
          user_id: userId,
          role: exp.role,
          company: exp.company,
          period: exp.period,
          description: exp.description,
          achievements: exp.achievements || [],
          technologies: exp.technologies || [],
          sort_order: index
        }));
        
        const { error } = await supabase.from(TABLES.EXPERIENCE).insert(experienceData);
        if (error) handleSupabaseError(error);
      }
      
      return { success: true, message: 'Experience updated successfully' };
    } catch (error) {
      console.error('Error updating experience:', error);
      throw error;
    }
  }

  // Add new experience
  async addExperience(experienceItem) {
    try {
      const currentData = await this.getResumeData();
      const newExperience = {
        id: Date.now().toString(),
        ...experienceItem
      };
      
      const updatedData = {
        ...currentData,
        experience: [newExperience, ...currentData.experience]
      };
      
      return await this.saveResumeData(updatedData);
    } catch (error) {
      console.error('Error adding experience:', error);
      throw error;
    }
  }

  // Update skills
  async updateSkills(skillsArray) {
    try {
      const userId = await this.getCurrentUserId();
      
      // Delete existing skills
      await supabase.from(TABLES.SKILLS).delete().eq('user_id', userId);
      
      // Insert new skills data
      if (skillsArray?.length) {
        const skillsData = skillsArray.map((skill, index) => ({
          user_id: userId,
          category: skill.category,
          skills: skill.skills || skill.items || [],
          sort_order: index
        }));
        
        const { error } = await supabase.from(TABLES.SKILLS).insert(skillsData);
        if (error) handleSupabaseError(error);
      }
      
      return { success: true, message: 'Skills updated successfully' };
    } catch (error) {
      console.error('Error updating skills:', error);
      throw error;
    }
  }

  // Update education
  async updateEducation(educationArray) {
    try {
      const userId = await this.getCurrentUserId();
      
      // Delete existing education
      await supabase.from(TABLES.EDUCATION).delete().eq('user_id', userId);
      
      // Insert new education data
      if (educationArray?.length) {
        const educationData = educationArray.map((edu, index) => ({
          user_id: userId,
          degree: edu.degree,
          institution: edu.institution,
          year: edu.year,
          location: edu.location,
          description: edu.description,
          gpa: edu.gpa,
          sort_order: index
        }));
        
        const { error } = await supabase.from(TABLES.EDUCATION).insert(educationData);
        if (error) handleSupabaseError(error);
      }
      
      return { success: true, message: 'Education updated successfully' };
    } catch (error) {
      console.error('Error updating education:', error);
      throw error;
    }
  }

  // Update certifications
  async updateCertifications(certificationsArray) {
    try {
      const userId = await this.getCurrentUserId();
      
      // Delete existing certifications
      await supabase.from(TABLES.CERTIFICATIONS).delete().eq('user_id', userId);
      
      // Insert new certifications data
      if (certificationsArray?.length) {
        const certificationsData = certificationsArray.map((cert, index) => ({
          user_id: userId,
          name: typeof cert === 'string' ? cert : cert.name,
          issuer: typeof cert === 'object' ? cert.issuer : null,
          date_issued: typeof cert === 'object' ? cert.date_issued : null,
          date_expires: typeof cert === 'object' ? cert.date_expires : null,
          credential_id: typeof cert === 'object' ? cert.credential_id : null,
          credential_url: typeof cert === 'object' ? cert.credential_url : null,
          sort_order: index
        }));
        
        const { error } = await supabase.from(TABLES.CERTIFICATIONS).insert(certificationsData);
        if (error) handleSupabaseError(error);
      }
      
      return { success: true, message: 'Certifications updated successfully' };
    } catch (error) {
      console.error('Error updating certifications:', error);
      throw error;
    }
  }

  // Update languages
  async updateLanguages(languagesArray) {
    try {
      const userId = await this.getCurrentUserId();
      
      // Delete existing languages
      await supabase.from(TABLES.LANGUAGES).delete().eq('user_id', userId);
      
      // Insert new languages data
      if (languagesArray?.length) {
        const languagesData = languagesArray.map((lang, index) => {
          const [language, proficiency] = typeof lang === 'string' 
            ? lang.split(' (').map(s => s.replace(')', ''))
            : [lang.language || lang, lang.proficiency || 'Intermediate'];
          
          return {
            user_id: userId,
            language,
            proficiency,
            sort_order: index
          };
        });
        
        const { error } = await supabase.from(TABLES.LANGUAGES).insert(languagesData);
        if (error) handleSupabaseError(error);
      }
      
      return { success: true, message: 'Languages updated successfully' };
    } catch (error) {
      console.error('Error updating languages:', error);
      throw error;
    }
  }

  // Export resume data as JSON
  exportResumeData() {
    return this.getResumeData();
  }

  // Import resume data from JSON
  async importResumeData(jsonData) {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      this.validateResumeData(data);
      return await this.saveResumeData(data);
    } catch (error) {
      console.error('Error importing resume data:', error);
      throw new Error('Invalid resume data format');
    }
  }

  // Validate resume data structure
  validateResumeData(data) {
    const requiredFields = ['profile', 'experience', 'skills', 'education', 'certifications', 'languages'];
    
    for (const field of requiredFields) {
      if (!data.hasOwnProperty(field)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate profile
    if (!data.profile.name || !data.profile.email) {
      throw new Error('Profile must have name and email');
    }

    // Validate arrays
    if (!Array.isArray(data.experience)) {
      throw new Error('Experience must be an array');
    }
    
    if (!Array.isArray(data.skills)) {
      throw new Error('Skills must be an array');
    }
    
    if (!Array.isArray(data.education)) {
      throw new Error('Education must be an array');
    }
    
    if (!Array.isArray(data.certifications)) {
      throw new Error('Certifications must be an array');
    }
    
    if (!Array.isArray(data.languages)) {
      throw new Error('Languages must be an array');
    }

    return true;
  }

  // Get resume statistics
  async getResumeStats() {
    try {
      const userId = await this.getCurrentUserId();
      
      // Get counts from each table
      const [experienceCount, skillsCount, educationCount, certificationsCount, languagesCount] = await Promise.all([
        supabase.from(TABLES.EXPERIENCE).select('id', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from(TABLES.SKILLS).select('skills').eq('user_id', userId),
        supabase.from(TABLES.EDUCATION).select('id', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from(TABLES.CERTIFICATIONS).select('id', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from(TABLES.LANGUAGES).select('id', { count: 'exact', head: true }).eq('user_id', userId)
      ]);
      
      // Calculate total skills across all categories
      const totalSkills = skillsCount.data?.reduce((acc, category) => {
        return acc + (category.skills?.length || 0);
      }, 0) || 0;
      
      return {
        totalExperience: experienceCount.count || 0,
        totalSkills,
        totalEducation: educationCount.count || 0,
        totalCertifications: certificationsCount.count || 0,
        totalLanguages: languagesCount.count || 0,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting resume stats:', error);
      // Fallback to localStorage data
      const data = JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
      return {
        totalExperience: data.experience?.length || 0,
        totalSkills: data.skills?.reduce((acc, category) => acc + (category.skills?.length || category.items?.length || 0), 0) || 0,
        totalEducation: data.education?.length || 0,
        totalCertifications: data.certifications?.length || 0,
        totalLanguages: data.languages?.length || 0,
        lastUpdated: new Date().toISOString()
      };
    }
  }

  // Clear all resume data (reset to defaults)
  async resetResumeData() {
    try {
      const userId = await this.getCurrentUserId();
      
      // Delete all existing data
      await Promise.all([
        supabase.from(TABLES.PROFILE).delete().eq('user_id', userId),
        supabase.from(TABLES.EXPERIENCE).delete().eq('user_id', userId),
        supabase.from(TABLES.SKILLS).delete().eq('user_id', userId),
        supabase.from(TABLES.EDUCATION).delete().eq('user_id', userId),
        supabase.from(TABLES.CERTIFICATIONS).delete().eq('user_id', userId),
        supabase.from(TABLES.LANGUAGES).delete().eq('user_id', userId)
      ]);
      
      // Clear localStorage
      localStorage.removeItem(this.localStorageKey);
      localStorage.removeItem(`${this.localStorageKey}_updated`);
      
      // Reinitialize with mock data
      return await this.initializeWithMockData(userId);
    } catch (error) {
      console.error('Error resetting resume data:', error);
      throw error;
    }
  }

  // Check authentication status
  async isAuthenticated() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return !!user;
    } catch (error) {
      return false;
    }
  }

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) handleSupabaseError(error);
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) handleSupabaseError(error);
      
      // Clear localStorage
      localStorage.removeItem(this.localStorageKey);
      
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const resumeService = new ResumeService();
export default resumeService;
