import { supabase, TABLES } from '../config/supabase';
import { mockData } from '../data/mockData';

class DatabaseSeeder {
  constructor() {
    this.userId = null;
  }

  async getCurrentUserId() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      throw new Error('User not authenticated');
    }
    this.userId = user.id;
    return user.id;
  }

  async seedProfile() {
    console.log('🔄 Seeding profile data...');
    
    const profileData = {
      user_id: this.userId,
      name: mockData.profile.name,
      title: mockData.profile.title,
      email: mockData.profile.email,
      phone: mockData.profile.phone,
      location: mockData.profile.location,
      website: mockData.profile.website,
      bio: mockData.profile.bio,
      avatar_url: mockData.profile.avatar || null
    };

    console.log('Profile data to insert:', JSON.stringify(profileData, null, 2));

    // Check if profile exists first
    const { data: existingProfile } = await supabase
      .from(TABLES.PROFILE)
      .select('id')
      .eq('user_id', this.userId)
      .single();

    let data, error;
    if (existingProfile) {
      // Update existing profile
      const result = await supabase
        .from(TABLES.PROFILE)
        .update(profileData)
        .eq('user_id', this.userId)
        .select();
      data = result.data;
      error = result.error;
    } else {
      // Insert new profile
      const result = await supabase
        .from(TABLES.PROFILE)
        .insert(profileData)
        .select();
      data = result.data;
      error = result.error;
    }

    if (error) {
      console.error('Profile seeding error:', error);
      throw error;
    }
    console.log('✅ Profile seeded successfully:', data);
    return data;
  }

  async seedExperience() {
    console.log('🔄 Seeding experience data...');
    
    // Clear existing data
    const { error: deleteError } = await supabase
      .from(TABLES.EXPERIENCE)
      .delete()
      .eq('user_id', this.userId);
    
    if (deleteError) {
      console.warn('Warning deleting existing experience:', deleteError);
    }

    const experienceData = mockData.experience.map((exp, index) => ({
      user_id: this.userId,
      role: exp.role,
      company: exp.company,
      period: exp.period,
      description: exp.description,
      achievements: exp.achievements || [],
      technologies: exp.technologies || [],
      sort_order: index
    }));

    console.log('Experience data to insert:', JSON.stringify(experienceData, null, 2));

    const { data, error } = await supabase
      .from(TABLES.EXPERIENCE)
      .insert(experienceData)
      .select();

    if (error) {
      console.error('Experience seeding error:', error);
      throw error;
    }
    console.log(`✅ ${data.length} experience entries seeded successfully`);
    return data;
  }

  async seedSkills() {
    console.log('🔄 Seeding skills data...');
    
    // Clear existing data
    const { error: deleteError } = await supabase
      .from(TABLES.SKILLS)
      .delete()
      .eq('user_id', this.userId);
    
    if (deleteError) {
      console.warn('Warning deleting existing skills:', deleteError);
    }

    const skillsData = mockData.skills.map((skillCategory, index) => ({
      user_id: this.userId,
      category: skillCategory.category,
      skills: skillCategory.skills || skillCategory.items || [],
      sort_order: index
    }));

    console.log('Skills data to insert:', JSON.stringify(skillsData, null, 2));

    const { data, error } = await supabase
      .from(TABLES.SKILLS)
      .insert(skillsData)
      .select();

    if (error) {
      console.error('Skills seeding error:', error);
      throw error;
    }
    console.log(`✅ ${data.length} skill categories seeded successfully`);
    return data;
  }

  async seedEducation() {
    console.log('🔄 Seeding education data...');
    
    // Clear existing data
    const { error: deleteError } = await supabase
      .from(TABLES.EDUCATION)
      .delete()
      .eq('user_id', this.userId);
    
    if (deleteError) {
      console.warn('Warning deleting existing education:', deleteError);
    }

    const educationData = mockData.education.map((edu, index) => ({
      user_id: this.userId,
      degree: edu.degree,
      institution: edu.institution,
      year: edu.period, // Schema uses 'year' not 'period'
      location: edu.location,
      description: edu.description,
      gpa: edu.gpa || null,
      sort_order: index
    }));

    console.log('Education data to insert:', JSON.stringify(educationData, null, 2));

    const { data, error } = await supabase
      .from(TABLES.EDUCATION)
      .insert(educationData)
      .select();

    if (error) {
      console.error('Education seeding error:', error);
      throw error;
    }
    console.log(`✅ ${data.length} education entries seeded successfully`);
    return data;
  }

  async seedCertifications() {
    console.log('🔄 Seeding certifications data...');
    
    // Clear existing data
    await supabase.from(TABLES.CERTIFICATIONS).delete().eq('user_id', this.userId);

    if (!mockData.certifications || mockData.certifications.length === 0) {
      console.log('⚠️ No certifications data to seed');
      return [];
    }

    const certificationsData = mockData.certifications.map((cert, index) => ({
      user_id: this.userId,
      name: typeof cert === 'string' ? cert : cert.name,
      issuer: typeof cert === 'object' ? cert.issuer : null,
      date_issued: typeof cert === 'object' ? cert.date_issued : null,
      date_expires: typeof cert === 'object' ? cert.date_expires : null,
      credential_id: typeof cert === 'object' ? cert.credential_id : null,
      credential_url: typeof cert === 'object' ? cert.credential_url : null,
      sort_order: index
    }));

    const { data, error } = await supabase
      .from(TABLES.CERTIFICATIONS)
      .insert(certificationsData)
      .select();

    if (error) throw error;
    console.log(`✅ ${data.length} certifications seeded successfully`);
    return data;
  }

  async seedLanguages() {
    console.log('🔄 Seeding languages data...');
    
    // Clear existing data
    const { error: deleteError } = await supabase
      .from(TABLES.LANGUAGES)
      .delete()
      .eq('user_id', this.userId);
    
    if (deleteError) {
      console.warn('Warning deleting existing languages:', deleteError);
    }

    if (!mockData.languages || mockData.languages.length === 0) {
      console.log('⚠️ No languages data to seed');
      return [];
    }

    const languagesData = mockData.languages.map((lang, index) => {
      let language, proficiency;
      
      if (typeof lang === 'string') {
        // Handle format like "English (Native)" or just "English"
        const match = lang.match(/^(.+?)\s*\((.+)\)$/);
        if (match) {
          language = match[1].trim();
          proficiency = match[2].trim();
        } else {
          language = lang.trim();
          proficiency = 'Intermediate';
        }
      } else {
        language = lang.language || lang.name || 'Unknown';
        proficiency = lang.proficiency || lang.level || 'Intermediate';
      }

      return {
        user_id: this.userId,
        language,
        proficiency,
        sort_order: index
      };
    });

    console.log('Languages data to insert:', JSON.stringify(languagesData, null, 2));

    const { data, error } = await supabase
      .from(TABLES.LANGUAGES)
      .insert(languagesData)
      .select();

    if (error) {
      console.error('Languages seeding error:', error);
      throw error;
    }
    console.log(`✅ ${data.length} languages seeded successfully`);
    return data;
  }

  async seedProjects() {
    console.log('🔄 Seeding projects data...');
    
    // Clear existing data
    await supabase.from(TABLES.PROJECTS).delete().eq('user_id', this.userId);

    if (!mockData.projects || mockData.projects.length === 0) {
      console.log('⚠️ No projects data to seed');
      return [];
    }

    const projectsData = mockData.projects.map((project, index) => ({
      user_id: this.userId,
      title: project.title,
      description: project.description,
      long_description: project.longDescription || project.description,
      technologies: project.technologies || [],
      github_url: project.githubUrl || project.github,
      live_url: project.liveUrl || project.demo || project.url,
      image_url: project.image || project.imageUrl,
      featured: project.featured || false,
      status: project.status || 'completed',
      sort_order: index
    }));

    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .insert(projectsData)
      .select();

    if (error) throw error;
    console.log(`✅ ${data.length} projects seeded successfully`);
    return data;
  }

  async seedAll() {
    try {
      console.log('🚀 Starting database seeding...');
      
      // Get authenticated user
      await this.getCurrentUserId();
      console.log(`👤 Seeding data for user: ${this.userId}`);

      // Debug table structure first
      await this.debugTableStructure();

      // Seed data sequentially to better track errors
      const operations = [
        { name: 'Profile', fn: () => this.seedProfile() },
        { name: 'Experience', fn: () => this.seedExperience() },
        { name: 'Skills', fn: () => this.seedSkills() },
        { name: 'Education', fn: () => this.seedEducation() },
        { name: 'Certifications', fn: () => this.seedCertifications() },
        { name: 'Languages', fn: () => this.seedLanguages() },
        { name: 'Projects', fn: () => this.seedProjects() }
      ];

      const results = [];
      let successful = 0;
      let failed = 0;

      for (const operation of operations) {
        try {
          console.log(`\n🔄 Starting ${operation.name} seeding...`);
          const result = await operation.fn();
          results.push({ status: 'fulfilled', value: result, name: operation.name });
          successful++;
          console.log(`✅ ${operation.name} completed successfully`);
        } catch (error) {
          console.error(`❌ ${operation.name} failed:`, error);
          results.push({ status: 'rejected', reason: error, name: operation.name });
          failed++;
        }
      }

      console.log(`\n🎉 Seeding completed: ${successful}/${operations.length} successful`);
      
      if (failed > 0) {
        console.log('❌ Failed operations:');
        results
          .filter(r => r.status === 'rejected')
          .forEach((result) => {
            console.error(`  - ${result.name}:`, result.reason.message || result.reason);
          });
      }

      return {
        success: successful === operations.length,
        successful,
        failed,
        results
      };

    } catch (error) {
      console.error('💥 Seeding failed:', error);
      throw error;
    }
  }

  // Utility method to check if data exists
  async checkExistingData() {
    try {
      await this.getCurrentUserId();
      console.log('Checking data for user:', this.userId);
      
      const [profile, experience, skills, education, certifications, languages, projects] = await Promise.all([
        supabase.from(TABLES.PROFILE).select('id').eq('user_id', this.userId).single(),
        supabase.from(TABLES.EXPERIENCE).select('id', { count: 'exact', head: true }).eq('user_id', this.userId),
        supabase.from(TABLES.SKILLS).select('id', { count: 'exact', head: true }).eq('user_id', this.userId),
        supabase.from(TABLES.EDUCATION).select('id', { count: 'exact', head: true }).eq('user_id', this.userId),
        supabase.from(TABLES.CERTIFICATIONS).select('id', { count: 'exact', head: true }).eq('user_id', this.userId),
        supabase.from(TABLES.LANGUAGES).select('id', { count: 'exact', head: true }).eq('user_id', this.userId),
        supabase.from(TABLES.PROJECTS).select('id', { count: 'exact', head: true }).eq('user_id', this.userId)
      ]);

      const result = {
        hasProfile: !!profile.data,
        experienceCount: experience.count || 0,
        skillsCount: skills.count || 0,
        educationCount: education.count || 0,
        certificationsCount: certifications.count || 0,
        languagesCount: languages.count || 0,
        projectsCount: projects.count || 0
      };

      console.log('Data check results:', result);
      return result;
    } catch (error) {
      console.error('Error checking existing data:', error);
      return null;
    }
  }

  // Debug method to check table structure
  async debugTableStructure() {
    try {
      console.log('🔍 Debugging table structures...');
      
      // Check if tables exist and their structure
      const tables = [
        TABLES.PROFILE,
        TABLES.EXPERIENCE, 
        TABLES.SKILLS,
        TABLES.EDUCATION,
        TABLES.CERTIFICATIONS,
        TABLES.LANGUAGES,
        TABLES.PROJECTS
      ];

      for (const table of tables) {
        try {
          const { data, error } = await supabase
            .from(table)
            .select('*')
            .limit(1);
          
          if (error) {
            console.error(`❌ Table ${table} error:`, error.message);
          } else {
            console.log(`✅ Table ${table} accessible`);
          }
        } catch (err) {
          console.error(`💥 Table ${table} failed:`, err.message);
        }
      }
    } catch (error) {
      console.error('Debug failed:', error);
    }
  }
}

// Export singleton instance
export const databaseSeeder = new DatabaseSeeder();
export default databaseSeeder;
