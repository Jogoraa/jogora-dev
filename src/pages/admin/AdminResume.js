import React, { useState, useEffect } from 'react';
import { 
  Save, Download, Eye, RotateCcw, FileText, User, Briefcase, 
  Code, GraduationCap, Award, Globe, Plus, Edit, Trash2,
  CheckCircle, AlertCircle, Loader2, Star, Calendar
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '../../components/ui/tabs';
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
import ParticleBackground from '../../components/ParticleBackground';
import { useAuth } from '../../contexts/AuthContext';
import resumeService from '../../services/resumeService';
import { mockData } from '../../data/mockData';

const AdminResume = () => {
  const { user, isAuthenticated } = useAuth();
  const [resumeData, setResumeData] = useState({
    profile: mockData.profile || {},
    experience: mockData.experience || [],
    skills: mockData.skills || [],
    education: mockData.education || [],
    certifications: mockData.certifications || [],
    languages: mockData.languages || []
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [editingItem, setEditingItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [error, setError] = useState(null);

  // Load resume data on component mount
  useEffect(() => {
    loadResumeData();
  }, [user]);

  const loadResumeData = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await resumeService.getResumeData();
      setResumeData(data);
    } catch (error) {
      console.error('Error loading resume data:', error);
      setError('Failed to load resume data. Using fallback data.');
      // Keep using mock data as fallback
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const stats = {
    experience: resumeData.experience?.length || 0,
    skills: resumeData.skills?.reduce((total, category) => total + (category.skills?.length || 0), 0) || 0,
    education: resumeData.education?.length || 0,
    certifications: resumeData.certifications?.length || 0,
    languages: resumeData.languages?.length || 0
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      setError('You must be authenticated to save changes.');
      return;
    }

    setSaving(true);
    setError(null);
    
    try {
      await resumeService.saveResumeData(resumeData);
      setHasChanges(false);
      // Show success message briefly
      setTimeout(() => setError(null), 3000);
    } catch (error) {
      console.error('Error saving resume:', error);
      setError(error.message || 'Failed to save resume data.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!isAuthenticated) {
      setError('You must be authenticated to reset data.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await resumeService.resetResumeData();
      await loadResumeData(); // Reload data after reset
      setHasChanges(false);
    } catch (error) {
      console.error('Error resetting resume:', error);
      setError(error.message || 'Failed to reset resume data.');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const data = await resumeService.exportResumeData();
      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = 'resume-data.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error('Error exporting resume:', error);
      setError('Failed to export resume data.');
    }
  };

  const updateData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
    setHasChanges(true);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
          <p className="text-gray-400">Loading resume data...</p>
        </div>
      </div>
    );
  }

  // Show authentication required message
  if (!isAuthenticated) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-gray-400 mb-4">You must be signed in to access the resume manager.</p>
          <Button onClick={() => window.location.href = '/admin/login'} className="bg-blue-600 hover:bg-blue-700">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 relative overflow-hidden min-h-screen">
      {/* Enhanced animated background elements */}
      <ParticleBackground />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
      {/* Header Actions */}
      <ScrollAnimations animation="fade-in-up" delay={0}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">Resume Manager</h2>
                {hasChanges && (
                  <Badge className="bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-yellow-200 border-yellow-400/50 text-xs shadow-lg shadow-yellow-500/20">
                    Unsaved Changes
                  </Badge>
                )}
                {user && (
                  <Badge className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 border-green-400/40 text-xs">
                    Connected to Supabase
                  </Badge>
                )}
              </div>
              <p className="text-white text-sm font-medium">Manage your professional resume information</p>
              {error && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {error}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto">
            <InteractiveButton
              variant="secondary"
              size="sm"
              ripple={true}
              onClick={handleExport}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-400/30 text-black hover:from-blue-500/30 hover:to-indigo-500/30 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Download className="h-4 w-4 mr-2 text-black" />
              Export
            </InteractiveButton>
            
            <InteractiveButton
              variant="secondary"
              size="sm"
              ripple={true}
              onClick={handleReset}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 text-black hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-300/50 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <RotateCcw className="h-4 w-4 mr-2 text-black" />
              Reset
            </InteractiveButton>
            
            <InteractiveButton
              variant="gradient"
              size="sm"
              ripple={true}
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className="w-full sm:w-auto"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </InteractiveButton>
          </div>
        </div>
      </ScrollAnimations>

      {/* Enhanced Resume Management Tabs */}
      <ScrollAnimations animation="fade-in-up" delay={200}>
        <GlassMorphism className="rounded-2xl border-orange-400/20 hover:border-orange-300/40 transition-all duration-300 backdrop-blur-xl" intensity="medium">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="-mx-2 px-2 overflow-x-auto">
            <TabsList className="flex w-max min-w-full gap-1 bg-gradient-to-r from-orange-500/10 to-red-500/10 p-1 rounded-xl mb-6 border border-orange-400/20">
              <TabsTrigger value="overview" className="flex-shrink-0 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/40 data-[state=active]:to-red-500/40 data-[state=active]:text-black data-[state=active]:font-semibold text-black hover:text-black">Overview</TabsTrigger>
              <TabsTrigger value="profile" className="flex-shrink-0 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/40 data-[state=active]:to-red-500/40 data-[state=active]:text-black data-[state=active]:font-semibold text-black hover:text-black">Profile</TabsTrigger>
              <TabsTrigger value="experience" className="flex-shrink-0 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/40 data-[state=active]:to-red-500/40 data-[state=active]:text-black data-[state=active]:font-semibold text-black hover:text-black">Experience</TabsTrigger>
              <TabsTrigger value="skills" className="flex-shrink-0 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/40 data-[state=active]:to-red-500/40 data-[state=active]:text-black data-[state=active]:font-semibold text-black hover:text-black">Skills</TabsTrigger>
              <TabsTrigger value="education" className="flex-shrink-0 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/40 data-[state=active]:to-red-500/40 data-[state=active]:text-black data-[state=active]:font-semibold text-black hover:text-black">Education</TabsTrigger>
              <TabsTrigger value="other" className="flex-shrink-0 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/40 data-[state=active]:to-red-500/40 data-[state=active]:text-black data-[state=active]:font-semibold text-black hover:text-black">Other</TabsTrigger>
            </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6">
              <div className="space-y-8">
                {/* Enhanced Statistics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    { icon: Briefcase, label: 'Experience', value: stats.experience, color: 'from-blue-500 to-indigo-600' },
                    { icon: Code, label: 'Skills', value: stats.skills, color: 'from-green-500 to-emerald-600' },
                    { icon: GraduationCap, label: 'Education', value: stats.education, color: 'from-purple-500 to-violet-600' },
                    { icon: Award, label: 'Certifications', value: stats.certifications, color: 'from-yellow-500 to-orange-600' },
                    { icon: Globe, label: 'Languages', value: stats.languages, color: 'from-pink-500 to-rose-600' }
                  ].map((stat, index) => (
                    <GlassMorphism key={index} className="group p-4 rounded-xl border-white/20 hover:border-orange-400/40 hover:scale-105 transition-all duration-300 cursor-pointer" intensity="low">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:shadow-current/30`}>
                          <stat.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-black transition-colors duration-300">{stat.value}</p>
                          <p className="text-black/80 text-xs transition-colors duration-300">{stat.label}</p>
                        </div>
                      </div>
                      {/* Animated background glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-xl transition-all duration-500`} />
                    </GlassMorphism>
                  ))}
                </div>

                {/* Enhanced Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InteractiveButton
                    variant="secondary"
                    size="lg"
                    ripple={true}
                    className="group w-full justify-start bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-400/30 text-white hover:from-blue-500/20 hover:to-indigo-500/20 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-500/25 p-6"
                    onClick={() => window.open('/resume', '_blank')}
                  >
                    <Eye className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200 text-black" />
                    <div className="text-left">
                      <div className="font-semibold text-black">Preview Resume</div>
                      <div className="text-xs text-black/70">View live resume page</div>
                    </div>
                  </InteractiveButton>
                  
                  <InteractiveButton
                    variant="secondary"
                    size="lg"
                    ripple={true}
                    className="group w-full justify-start bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-400/30 text-white hover:from-green-500/20 hover:to-emerald-500/20 hover:border-green-300/50 hover:shadow-lg hover:shadow-green-500/25 p-6"
                    onClick={() => window.print()}
                  >
                    <Download className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200 text-black" />
                    <div className="text-left">
                      <div className="font-semibold text-black">Print Resume</div>
                      <div className="text-xs text-black/70">Generate PDF version</div>
                    </div>
                  </InteractiveButton>
                  
                  <InteractiveButton
                    variant="secondary"
                    size="lg"
                    ripple={true}
                    className="group w-full justify-start bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-400/30 text-white hover:from-purple-500/20 hover:to-pink-500/20 hover:border-purple-300/50 hover:shadow-lg hover:shadow-purple-500/25 p-6"
                    onClick={handleExport}
                  >
                    <FileText className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200 text-black" />
                    <div className="text-left">
                      <div className="font-semibold text-black">Export Data</div>
                      <div className="text-xs text-black/70">Download JSON backup</div>
                    </div>
                  </InteractiveButton>
                </div>

                {/* Enhanced Recent Experience Preview */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">Recent Experience</h3>
                  <div className="space-y-3">
                    {(resumeData.experience || []).slice(0, 3).map((job, index) => {
                      const colors = [
                        'from-blue-500 to-indigo-600',
                        'from-green-500 to-emerald-600', 
                        'from-purple-500 to-violet-600'
                      ];
                      return (
                        <GlassMorphism key={index} className="group flex items-center gap-4 p-4 rounded-xl border-white/20 hover:border-orange-400/40 transition-all duration-300 cursor-pointer" intensity="low">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors[index]} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                            <Briefcase className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-black font-medium transition-colors duration-300">{job.role}</h4>
                            <p className="text-black/70 text-sm transition-colors duration-300">{job.company} • {job.period}</p>
                          </div>
                        </GlassMorphism>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="p-6">
              <ProfileEditor 
                profile={resumeData.profile} 
                onChange={(data) => updateData('profile', data)} 
              />
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="p-6">
              <ExperienceEditor 
                experience={resumeData.experience} 
                onChange={(data) => updateData('experience', data)} 
              />
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="p-6">
              <SkillsEditor 
                skills={resumeData.skills} 
                onChange={(data) => updateData('skills', data)} 
              />
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="p-6">
              <EducationEditor 
                education={resumeData.education} 
                onChange={(data) => updateData('education', data)} 
              />
            </TabsContent>

            {/* Other Tab */}
            <TabsContent value="other" className="p-6">
              <OtherEditor 
                certifications={resumeData.certifications}
                languages={resumeData.languages}
                onCertificationsChange={(data) => updateData('certifications', data)}
                onLanguagesChange={(data) => updateData('languages', data)}
              />
            </TabsContent>
          </Tabs>
        </GlassMorphism>
      </ScrollAnimations>
      </div>
    </div>
  );
};

// Profile Editor Component
const ProfileEditor = ({ profile, onChange }) => {
  const [formData, setFormData] = useState(profile || {});

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-black mb-4">Personal Information</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className="text-black font-semibold mb-2 block">Full Name</Label>
          <Input
            id="name"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-orange-300/50 focus:border-orange-300/50 focus:ring-orange-400/20"
          />
        </div>
        
        <div>
          <Label htmlFor="title" className="text-black font-semibold mb-2 block">Professional Title</Label>
          <Input
            id="title"
            value={formData.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-orange-300/50 focus:border-orange-300/50 focus:ring-orange-400/20"
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-black font-semibold mb-2 block">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-orange-300/50 focus:border-orange-300/50 focus:ring-orange-400/20"
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="text-black font-semibold mb-2 block">Phone</Label>
          <Input
            id="phone"
            value={formData.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-orange-300/50 focus:border-orange-300/50 focus:ring-orange-400/20"
          />
        </div>
        
        <div>
          <Label htmlFor="location" className="text-black font-semibold mb-2 block">Location</Label>
          <Input
            id="location"
            value={formData.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-orange-300/50 focus:border-orange-300/50 focus:ring-orange-400/20"
          />
        </div>
        
        <div>
          <Label htmlFor="website" className="text-black font-semibold mb-2 block">Website</Label>
          <Input
            id="website"
            value={formData.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-orange-300/50 focus:border-orange-300/50 focus:ring-orange-400/20"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="bio" className="text-black font-semibold mb-2 block">Professional Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio || ''}
          onChange={(e) => handleChange('bio', e.target.value)}
          className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-orange-300/50 focus:border-orange-300/50 focus:ring-orange-400/20 min-h-[120px]"
        />
      </div>
    </div>
  );
};

// Experience Editor Component
const ExperienceEditor = ({ experience, onChange }) => {
  const [items, setItems] = useState(experience || []);

  const handleUpdate = (index, field, value) => {
    const updated = items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updated);
    onChange(updated);
  };

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    onChange(updated);
  };

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      role: '',
      company: '',
      period: '',
      description: '',
      achievements: []
    };
    const updated = [...items, newItem];
    setItems(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-black">Work Experience</h3>
        <InteractiveButton
          variant="gradient"
          size="sm"
          ripple={true}
          onClick={handleAdd}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </InteractiveButton>
      </div>
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <GlassMorphism key={item.id} className="p-6 rounded-xl border-orange-400/20 hover:border-orange-300/40 transition-all duration-300" intensity="low">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-black font-medium">Experience #{index + 1}</h4>
              <InteractiveButton
                variant="ghost"
                size="sm"
                ripple={true}
                onClick={() => handleDelete(index)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20 border border-red-400/30 hover:border-red-300/50"
              >
                <Trash2 className="h-4 w-4" />
              </InteractiveButton>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-black font-semibold mb-2 block">Job Title</Label>
                <Input
                  value={item.role || ''}
                  onChange={(e) => handleUpdate(index, 'role', e.target.value)}
                  className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-white/50 focus:border-orange-300/50 focus:ring-orange-400/20"
                />
              </div>
              
              <div>
                <Label className="text-black font-semibold mb-2 block">Company</Label>
                <Input
                  value={item.company || ''}
                  onChange={(e) => handleUpdate(index, 'company', e.target.value)}
                  className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-white/50 focus:border-orange-300/50 focus:ring-orange-400/20"
                />
              </div>
              
              <div className="sm:col-span-2">
                <Label className="text-black font-semibold mb-2 block">Period</Label>
                <Input
                  value={item.period || ''}
                  onChange={(e) => handleUpdate(index, 'period', e.target.value)}
                  placeholder="e.g., Jan 2020 - Present"
                  className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-white/50 focus:border-orange-300/50 focus:ring-orange-400/20"
                />
              </div>
              
              <div className="sm:col-span-2">
                <Label className="text-black font-semibold mb-2 block">Description</Label>
                <Textarea
                  value={item.description || ''}
                  onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                  className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-white/50 focus:border-orange-300/50 focus:ring-orange-400/20"
                />
              </div>
            </div>
          </GlassMorphism>
        ))}
      </div>
    </div>
  );
};

// Skills Editor Component
const SkillsEditor = ({ skills, onChange }) => {
  const [categories, setCategories] = useState(skills || []);

  const handleUpdateCategory = (index, field, value) => {
    const updated = categories.map((cat, i) => 
      i === index ? { ...cat, [field]: value } : cat
    );
    setCategories(updated);
    onChange(updated);
  };

  const handleUpdateSkills = (categoryIndex, skillsString) => {
    const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
    handleUpdateCategory(categoryIndex, 'skills', skillsArray);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-black">Skills & Technologies</h3>
      
      <div className="space-y-6">
        {categories.map((category, index) => (
          <GlassMorphism key={index} className="p-6 rounded-xl border-orange-400/20 hover:border-orange-300/40 transition-all duration-300" intensity="low">
            <div className="space-y-4">
              <div>
                <Label className="text-black font-semibold mb-2 block">Category Name</Label>
                <Input
                  value={category.category || ''}
                  onChange={(e) => handleUpdateCategory(index, 'category', e.target.value)}
                  className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-orange-300/50 focus:border-orange-300/50 focus:ring-orange-400/20"
                />
              </div>
              
              <div>
                <Label className="text-black font-semibold mb-2 block">Skills (comma separated)</Label>
                <Textarea
                  value={(category.skills || []).join(', ')}
                  onChange={(e) => handleUpdateSkills(index, e.target.value)}
                  className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-orange-300/50 focus:border-orange-300/50 focus:ring-orange-400/20"
                  placeholder="React, Node.js, JavaScript, TypeScript"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(category.skills || []).map((skill, skillIndex) => (
                  <Badge key={skillIndex} className="bg-gradient-to-r from-orange-500/30 to-red-500/30 text-black border-orange-400/50 hover:from-orange-500/40 hover:to-red-500/40 transition-all duration-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </GlassMorphism>
        ))}
      </div>
    </div>
  );
};

// Education Editor Component
const EducationEditor = ({ education, onChange }) => {
  const [items, setItems] = useState(education || []);

  const handleUpdate = (index, field, value) => {
    const updated = items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-black">Education</h3>
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <GlassMorphism key={index} className="p-6 rounded-xl border-orange-400/20 hover:border-orange-300/40 transition-all duration-300" intensity="low">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-black font-semibold mb-2 block">Degree</Label>
                <Input
                  value={item.degree || ''}
                  onChange={(e) => handleUpdate(index, 'degree', e.target.value)}
                  className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-white/50 focus:border-orange-300/50 focus:ring-orange-400/20"
                />
              </div>
              
              <div>
                <Label className="text-black font-semibold mb-2 block">Institution</Label>
                <Input
                  value={item.institution || ''}
                  onChange={(e) => handleUpdate(index, 'institution', e.target.value)}
                  className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-white/50 focus:border-orange-300/50 focus:ring-orange-400/20"
                />
              </div>
              
              <div>
                <Label className="text-black font-semibold mb-2 block">Year</Label>
                <Input
                  value={item.year || ''}
                  onChange={(e) => handleUpdate(index, 'year', e.target.value)}
                  className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-white/50 focus:border-orange-300/50 focus:ring-orange-400/20"
                />
              </div>
              
              <div>
                <Label className="text-black font-semibold mb-2 block">Location</Label>
                <Input
                  value={item.location || ''}
                  onChange={(e) => handleUpdate(index, 'location', e.target.value)}
                  className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-white/50 focus:border-orange-300/50 focus:ring-orange-400/20"
                />
              </div>
            </div>
          </GlassMorphism>
        ))}
      </div>
    </div>
  );
};

// Other Editor Component (Certifications & Languages)
const OtherEditor = ({ certifications, languages, onCertificationsChange, onLanguagesChange }) => {
  return (
    <div className="space-y-8">
      {/* Certifications */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Certifications</h3>
        <GlassMorphism className="p-6 rounded-xl border-orange-400/20 hover:border-orange-300/40 transition-all duration-300" intensity="low">
          <div className="space-y-4">
            <Label className="text-black font-semibold mb-2 block">Certifications (one per line)</Label>
            <Textarea
              value={certifications.join('\n')}
              onChange={(e) => onCertificationsChange(e.target.value.split('\n').filter(cert => cert.trim()))}
              className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-white/50 focus:border-orange-300/50 focus:ring-orange-400/20 min-h-[120px]"
              placeholder="AWS Certified Solutions Architect&#10;Google Cloud Professional&#10;Microsoft Azure Fundamentals"
            />
          </div>
        </GlassMorphism>
      </div>

      {/* Languages */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Languages</h3>
        <GlassMorphism className="p-6 rounded-xl border-orange-400/20 hover:border-orange-300/40 transition-all duration-300" intensity="low">
          <div className="space-y-4">
            <Label className="text-black font-semibold mb-2 block">Languages (one per line)</Label>
            <Textarea
              value={languages.join('\n')}
              onChange={(e) => onLanguagesChange(e.target.value.split('\n').filter(lang => lang.trim()))}
              className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30 text-white placeholder-white/50 focus:border-orange-300/50 focus:ring-orange-400/20 min-h-[120px]"
              placeholder="English (Native)&#10;Spanish (Fluent)&#10;French (Intermediate)"
            />
          </div>
        </GlassMorphism>
      </div>
    </div>
  );
};

export default AdminResume;
