import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, ExternalLink, 
  Github, Calendar, Clock, Star, Zap, Code, Award, 
  TrendingUp, MoreVertical, Save, X, CheckCircle, 
  AlertCircle, Upload, Image as ImageIcon
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import ScrollAnimations from '../../components/ScrollAnimations';
import GlassMorphism from '../../components/GlassMorphism';
import InteractiveButton from '../../components/InteractiveButton';
import projectService from '../../services/projectService';

const AdminProjectsContent = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    status: 'In Development',
    githubUrl: '',
    liveUrl: '',
    keyFeatures: [],
    category: 'Web Development'
  });

  // Load projects on component mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const projectsData = await projectService.getAllProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter projects based on search and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechnologiesChange = (value) => {
    const techs = value.split(',').map(tech => tech.trim()).filter(tech => tech);
    setFormData(prev => ({
      ...prev,
      technologies: techs
    }));
  };

  const handleFeaturesChange = (value) => {
    const features = value.split('\n').map(feature => feature.trim()).filter(feature => feature);
    setFormData(prev => ({
      ...prev,
      keyFeatures: features
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: [],
      status: 'In Development',
      githubUrl: '',
      liveUrl: '',
      keyFeatures: [],
      category: 'Web Development'
    });
  };

  const handleCreate = async () => {
    try {
      const result = await projectService.createProject(formData);
      if (result.success) {
        await loadProjects();
        setIsCreateModalOpen(false);
        resetForm();
      } else {
        console.error('Error creating project:', result.error);
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies || [],
      status: project.status || 'In Development',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      keyFeatures: project.keyFeatures || [],
      category: project.category || 'Web Development'
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const result = await projectService.updateProject(selectedProject.id, formData);
      if (result.success) {
        await loadProjects();
        setIsEditModalOpen(false);
        setSelectedProject(null);
        resetForm();
      } else {
        console.error('Error updating project:', result.error);
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDelete = (project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const result = await projectService.deleteProject(selectedProject.id);
      if (result.success) {
        await loadProjects();
        setIsDeleteModalOpen(false);
        setSelectedProject(null);
      } else {
        console.error('Error deleting project:', result.error);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Development': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Planning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <ScrollAnimations animation="fade-in-up" delay={0}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <InteractiveButton
                variant="gradient"
                size="md"
                ripple={true}
                glow={true}
                className="group"
              >
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="text-sm sm:text-base">New Project</span>
                </div>
              </InteractiveButton>
            </DialogTrigger>
          </Dialog>
        </div>
      </ScrollAnimations>

      {/* Filters & Search */}
      <ScrollAnimations animation="fade-in-up" delay={200}>
        <GlassMorphism className="p-4 sm:p-6 rounded-2xl border-white/10 mb-8" intensity="medium">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 sm:pl-12 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400"
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="w-full sm:w-48">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20 text-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="In Development">In Development</SelectItem>
                  <SelectItem value="Planning">Planning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-gray-300 text-sm">
              Showing <span className="text-indigo-400 font-semibold">{filteredProjects.length}</span> of{' '}
              <span className="text-purple-400 font-semibold">{projects.length}</span> projects
            </p>
          </div>
        </GlassMorphism>
      </ScrollAnimations>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {[...Array(6)].map((_, index) => (
            <ScrollAnimations key={index} animation="fade-in-up" delay={index * 100}>
              <GlassMorphism className="p-4 sm:p-6 rounded-2xl border-white/10 animate-pulse" intensity="medium">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-white/10 rounded w-32"></div>
                      <div className="h-3 bg-white/10 rounded w-20"></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-white/10 rounded"></div>
                  <div className="h-3 bg-white/10 rounded w-3/4"></div>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-white/10 rounded w-16"></div>
                  <div className="h-6 bg-white/10 rounded w-20"></div>
                </div>
              </GlassMorphism>
            </ScrollAnimations>
          ))}
        </div>
      ) : (
        <>
          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollAnimations 
                key={project.id}
                animation="fade-in-up"
                delay={index * 100}
              >
                <GlassMorphism className="p-4 sm:p-6 rounded-2xl border-white/10 hover:scale-105 transition-all duration-500 group" intensity="medium">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 leading-tight">
                          {project.title}
                        </h3>
                        <Badge className={`text-xs px-2 py-1 ${getStatusColor(project.status)}`}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Actions Dropdown */}
                    <div className="relative group/menu">
                      <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200">
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </button>
                      <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 rounded-lg border border-white/20 shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-10">
                        <div className="p-2">
                          <button 
                            onClick={() => handleEdit(project)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200"
                          >
                            <Edit className="h-4 w-4" />
                            Edit Project
                          </button>
                          <Link 
                            to={`/projects/${project.slug}`}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200"
                          >
                            <Eye className="h-4 w-4" />
                            View Live
                          </Link>
                          <button 
                            onClick={() => handleDelete(project)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 3).map((tech, techIndex) => (
                        <Badge 
                          key={techIndex}
                          className="text-xs px-2 py-1 bg-slate-700/50 text-gray-300 border-slate-600/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies?.length > 3 && (
                        <Badge className="text-xs px-2 py-1 bg-slate-700/50 text-gray-400 border-slate-600/50">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <Github className="h-4 w-4" />
                        <span className="text-sm">Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="text-sm">Live</span>
                      </a>
                    )}
                  </div>
                </GlassMorphism>
              </ScrollAnimations>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <ScrollAnimations animation="fade-in-up" delay={0}>
              <GlassMorphism className="text-center p-12 sm:p-16 rounded-2xl border-white/10" intensity="medium">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                  <Code className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">No Projects Found</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'No projects match your current filters. Try adjusting your search criteria.'
                    : 'Get started by creating your first project.'
                  }
                </p>
                <InteractiveButton
                  variant="gradient"
                  size="md"
                  ripple={true}
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Project
                  </div>
                </InteractiveButton>
              </GlassMorphism>
            </ScrollAnimations>
          )}
        </>
      )}

      {/* Create/Edit Project Modal */}
      <ProjectModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setIsEditModalOpen(false);
          resetForm();
        }}
        title={isEditModalOpen ? 'Edit Project' : 'Create New Project'}
        formData={formData}
        onInputChange={handleInputChange}
        onTechnologiesChange={handleTechnologiesChange}
        onFeaturesChange={handleFeaturesChange}
        onSubmit={isEditModalOpen ? handleUpdate : handleCreate}
        isEdit={isEditModalOpen}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="bg-slate-900 border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-red-400">
              <AlertCircle className="h-5 w-5" />
              Delete Project
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Are you sure you want to delete "{selectedProject?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Project Modal Component (same as before)
const ProjectModal = ({ 
  isOpen, 
  onClose, 
  title, 
  formData, 
  onInputChange, 
  onTechnologiesChange, 
  onFeaturesChange, 
  onSubmit,
  isEdit 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-indigo-400" />
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {isEdit ? 'Update your project details below.' : 'Fill in the details to create a new project.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {/* Project Title */}
          <div>
            <Label htmlFor="title" className="text-white font-semibold mb-2 block">
              Project Title *
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={onInputChange}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400"
              placeholder="Enter project title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-white font-semibold mb-2 block">
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={onInputChange}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400 min-h-[100px]"
              placeholder="Describe your project..."
              required
            />
          </div>

          {/* Technologies */}
          <div>
            <Label htmlFor="technologies" className="text-white font-semibold mb-2 block">
              Technologies
            </Label>
            <Input
              id="technologies"
              value={formData.technologies.join(', ')}
              onChange={(e) => onTechnologiesChange(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400"
              placeholder="React, Node.js, MongoDB (comma separated)"
            />
          </div>

          {/* Status & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status" className="text-white font-semibold mb-2 block">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => onInputChange({ target: { name: 'status', value } })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20 text-white">
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Development">In Development</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="category" className="text-white font-semibold mb-2 block">
                Category
              </Label>
              <Select value={formData.category} onValueChange={(value) => onInputChange({ target: { name: 'category', value } })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20 text-white">
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="Desktop App">Desktop App</SelectItem>
                  <SelectItem value="API/Backend">API/Backend</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="githubUrl" className="text-white font-semibold mb-2 block">
                GitHub URL
              </Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={onInputChange}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400"
                placeholder="https://github.com/..."
              />
            </div>
            
            <div>
              <Label htmlFor="liveUrl" className="text-white font-semibold mb-2 block">
                Live URL
              </Label>
              <Input
                id="liveUrl"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={onInputChange}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400"
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Key Features */}
          <div>
            <Label htmlFor="keyFeatures" className="text-white font-semibold mb-2 block">
              Key Features
            </Label>
            <Textarea
              id="keyFeatures"
              value={formData.keyFeatures.join('\n')}
              onChange={(e) => onFeaturesChange(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400 min-h-[100px]"
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
            />
            <p className="text-gray-400 text-sm mt-1">Enter each feature on a new line</p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-white/10">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <InteractiveButton
            onClick={onSubmit}
            variant="gradient"
            size="md"
            ripple={true}
            className="flex-1"
          >
            <div className="flex items-center justify-center gap-2">
              <Save className="h-4 w-4" />
              {isEdit ? 'Update Project' : 'Create Project'}
            </div>
          </InteractiveButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminProjectsContent;
