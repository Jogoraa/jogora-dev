import { supabase, TABLES, handleSupabaseError } from '../config/supabase';
import { mockData } from '../data/mockData';

class ProjectService {
  constructor() {
    this.storageKey = 'portfolio_projects'; // Fallback for offline mode
  }

  // Get current user ID
  async getCurrentUserId() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      throw new Error('User not authenticated');
    }
    return user.id;
  }

  // Initialize database with mock data
  async initializeWithMockData(userId) {
    try {
      if (mockData.projects?.length) {
        const projectsData = mockData.projects.map((project, index) => ({
          user_id: userId,
          title: project.title,
          description: project.description,
          long_description: project.longDescription || project.description,
          technologies: project.technologies || [],
          github_url: project.githubUrl,
          live_url: project.liveUrl,
          image_url: project.image,
          featured: project.featured || false,
          status: project.status || 'completed',
          sort_order: index
        }));
        
        const { error } = await supabase.from(TABLES.PROJECTS).insert(projectsData);
        if (error) handleSupabaseError(error);
      }
      
      return { success: true, message: 'Mock projects initialized successfully' };
    } catch (error) {
      console.error('Error initializing mock projects:', error);
      handleSupabaseError(error);
    }
  }

  // Get all projects from Supabase
  async getAllProjects() {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from(TABLES.PROJECTS)
        .select('*')
        .eq('user_id', userId)
        .order('sort_order', { ascending: false });
      
      if (error && error.code !== 'PGRST116') {
        handleSupabaseError(error);
      }
      
      // If no data exists, initialize with mock data
      if (!data || data.length === 0) {
        await this.initializeWithMockData(userId);
        return mockData.projects;
      }
      
      // Transform Supabase data to match frontend format
      return data.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        longDescription: project.long_description,
        technologies: project.technologies || [],
        githubUrl: project.github_url,
        liveUrl: project.live_url,
        image: project.image_url,
        featured: project.featured,
        status: project.status,
        createdAt: project.created_at,
        updatedAt: project.updated_at
      }));
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to localStorage or mock data
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : mockData.projects;
    }
  }

  // Get project by ID from Supabase
  async getProjectById(id) {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from(TABLES.PROJECTS)
        .select('*')
        .eq('user_id', userId)
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Project not found
        }
        handleSupabaseError(error);
      }
      
      // Transform Supabase data to match frontend format
      return {
        id: data.id,
        title: data.title,
        description: data.description,
        longDescription: data.long_description,
        technologies: data.technologies || [],
        githubUrl: data.github_url,
        liveUrl: data.live_url,
        image: data.image_url,
        featured: data.featured,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  }

  // Get project by slug
  async getProjectBySlug(slug) {
    try {
      const projects = await this.getAllProjects();
      return projects.find(project => project.slug === slug);
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  }

  // Create new project in Supabase
  async createProject(projectData) {
    try {
      const userId = await this.getCurrentUserId();
      
      // Validate project data
      const validation = this.validateProject(projectData);
      if (!validation.isValid) {
        return { success: false, errors: validation.errors };
      }
      
      const newProjectData = {
        user_id: userId,
        title: projectData.title,
        description: projectData.description,
        long_description: projectData.longDescription || projectData.description,
        technologies: projectData.technologies || [],
        github_url: projectData.githubUrl,
        live_url: projectData.liveUrl,
        image_url: projectData.image,
        featured: projectData.featured || false,
        status: projectData.status || 'completed',
        sort_order: 0 // New projects go to top
      };
      
      const { data, error } = await supabase
        .from(TABLES.PROJECTS)
        .insert(newProjectData)
        .select()
        .single();
      
      if (error) handleSupabaseError(error);
      
      // Transform response to match frontend format
      const transformedProject = {
        id: data.id,
        title: data.title,
        description: data.description,
        longDescription: data.long_description,
        technologies: data.technologies || [],
        githubUrl: data.github_url,
        liveUrl: data.live_url,
        image: data.image_url,
        featured: data.featured,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
      
      return { success: true, data: transformedProject };
    } catch (error) {
      console.error('Error creating project:', error);
      return { success: false, error: error.message };
    }
  }

  // Update project in Supabase
  async updateProject(id, projectData) {
    try {
      const userId = await this.getCurrentUserId();
      
      // Validate project data
      const validation = this.validateProject(projectData);
      if (!validation.isValid) {
        return { success: false, errors: validation.errors };
      }
      
      const updateData = {
        title: projectData.title,
        description: projectData.description,
        long_description: projectData.longDescription || projectData.description,
        technologies: projectData.technologies || [],
        github_url: projectData.githubUrl,
        live_url: projectData.liveUrl,
        image_url: projectData.image,
        featured: projectData.featured || false,
        status: projectData.status || 'completed'
      };
      
      const { data, error } = await supabase
        .from(TABLES.PROJECTS)
        .update(updateData)
        .eq('user_id', userId)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return { success: false, error: 'Project not found' };
        }
        handleSupabaseError(error);
      }
      
      // Transform response to match frontend format
      const transformedProject = {
        id: data.id,
        title: data.title,
        description: data.description,
        longDescription: data.long_description,
        technologies: data.technologies || [],
        githubUrl: data.github_url,
        liveUrl: data.live_url,
        image: data.image_url,
        featured: data.featured,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
      
      return { success: true, data: transformedProject };
    } catch (error) {
      console.error('Error updating project:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete project from Supabase
  async deleteProject(id) {
    try {
      const userId = await this.getCurrentUserId();
      
      const { error } = await supabase
        .from(TABLES.PROJECTS)
        .delete()
        .eq('user_id', userId)
        .eq('id', id);
      
      if (error) handleSupabaseError(error);
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting project:', error);
      return { success: false, error: error.message };
    }
  }

  // Search projects
  async searchProjects(query, filters = {}) {
    try {
      const projects = await this.getAllProjects();
      let filtered = projects;

      // Text search
      if (query) {
        const searchTerm = query.toLowerCase();
        filtered = filtered.filter(project =>
          project.title.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          (project.technologies && project.technologies.some(tech => 
            tech.toLowerCase().includes(searchTerm)
          ))
        );
      }

      // Status filter
      if (filters.status && filters.status !== 'all') {
        filtered = filtered.filter(project => project.status === filters.status);
      }

      // Category filter
      if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(project => project.category === filters.category);
      }

      // Technology filter
      if (filters.technology && filters.technology !== 'all') {
        filtered = filtered.filter(project => 
          project.technologies && project.technologies.includes(filters.technology)
        );
      }

      return filtered;
    } catch (error) {
      console.error('Error searching projects:', error);
      return [];
    }
  }

  // Get project statistics from Supabase
  async getProjectStats() {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data: projects, error } = await supabase
        .from(TABLES.PROJECTS)
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });
      
      if (error) handleSupabaseError(error);
      
      const stats = {
        total: projects?.length || 0,
        completed: projects?.filter(p => p.status === 'completed').length || 0,
        inProgress: projects?.filter(p => p.status === 'in-progress').length || 0,
        planned: projects?.filter(p => p.status === 'planned').length || 0,
        featured: projects?.filter(p => p.featured).length || 0,
        technologies: {},
        recentProjects: (projects || []).slice(0, 5).map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          technologies: project.technologies || [],
          status: project.status,
          updatedAt: project.updated_at
        }))
      };

      // Count by technologies
      (projects || []).forEach(project => {
        if (project.technologies) {
          project.technologies.forEach(tech => {
            stats.technologies[tech] = (stats.technologies[tech] || 0) + 1;
          });
        }
      });

      return stats;
    } catch (error) {
      console.error('Error getting project stats:', error);
      return {
        total: 0,
        completed: 0,
        inProgress: 0,
        planned: 0,
        featured: 0,
        technologies: {},
        recentProjects: []
      };
    }
  }

  // Export projects data
  async exportProjects() {
    try {
      const projects = await this.getAllProjects();
      const exportData = {
        projects,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      
      return { success: true, data: exportData };
    } catch (error) {
      console.error('Error exporting projects:', error);
      return { success: false, error: error.message };
    }
  }

  // Import projects data
  async importProjects(importData) {
    try {
      if (!importData.projects || !Array.isArray(importData.projects)) {
        return { success: false, error: 'Invalid import data format' };
      }

      // Validate each project
      const validProjects = importData.projects.filter(project => 
        project.title && project.description
      );

      if (validProjects.length === 0) {
        return { success: false, error: 'No valid projects found in import data' };
      }

      // Add IDs and timestamps to imported projects
      const processedProjects = validProjects.map(project => ({
        ...project,
        id: project.id || Date.now() + Math.random(),
        slug: this.generateSlug(project.title),
        createdAt: project.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

      this.saveToStorage(processedProjects);
      
      return { 
        success: true, 
        data: { 
          imported: processedProjects.length,
          skipped: importData.projects.length - processedProjects.length
        }
      };
    } catch (error) {
      console.error('Error importing projects:', error);
      return { success: false, error: error.message };
    }
  }

  // Reset to default data
  async resetToDefaults() {
    try {
      const userId = await this.getCurrentUserId();
      
      // Delete all existing projects
      await supabase.from(TABLES.PROJECTS).delete().eq('user_id', userId);
      
      // Clear localStorage
      localStorage.removeItem(this.storageKey);
      
      // Reinitialize with mock data
      return await this.initializeWithMockData(userId);
    } catch (error) {
      console.error('Error resetting projects:', error);
      return { success: false, error: error.message };
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

  // Utility methods
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  saveToStorage(projects) {
    localStorage.setItem(this.storageKey, JSON.stringify(projects));
  }

  // Validate project data
  validateProject(projectData) {
    const errors = {};

    if (!projectData.title || projectData.title.trim().length === 0) {
      errors.title = 'Title is required';
    }

    if (!projectData.description || projectData.description.trim().length === 0) {
      errors.description = 'Description is required';
    }

    if (projectData.githubUrl && !this.isValidUrl(projectData.githubUrl)) {
      errors.githubUrl = 'Please enter a valid GitHub URL';
    }

    if (projectData.liveUrl && !this.isValidUrl(projectData.liveUrl)) {
      errors.liveUrl = 'Please enter a valid live URL';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
}

// Create and export a singleton instance
const projectService = new ProjectService();
export default projectService;
