import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderOpen, Eye, Star, TrendingUp, Code, 
  Calendar, Clock, Award, BarChart3, Users,
  Activity, FileText, User, Settings, Briefcase,
  GraduationCap, Globe, RefreshCw, Zap, Target,
  Plus, ExternalLink, Github
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import ScrollAnimations from '../../components/ScrollAnimations';
import GlassMorphism from '../../components/GlassMorphism';
import InteractiveButton from '../../components/InteractiveButton';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, TABLES } from '../../config/supabase';
import { mockData } from '../../data/mockData';

const AdminDashboardContent = () => {
  const { user, isAuthenticated } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    projects: [],
    experience: [],
    skills: [],
    education: [],
    certifications: [],
    languages: [],
    profile: null
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load dashboard data
  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const [profileRes, projectsRes, experienceRes, skillsRes, educationRes, certificationsRes, languagesRes] = await Promise.all([
        supabase.from(TABLES.PROFILE).select('*').eq('user_id', user?.id).single(),
        supabase.from(TABLES.PROJECTS).select('*').eq('user_id', user?.id).order('created_at', { ascending: false }),
        supabase.from(TABLES.EXPERIENCE).select('*').eq('user_id', user?.id).order('sort_order', { ascending: false }),
        supabase.from(TABLES.SKILLS).select('*').eq('user_id', user?.id).order('sort_order'),
        supabase.from(TABLES.EDUCATION).select('*').eq('user_id', user?.id).order('sort_order'),
        supabase.from(TABLES.CERTIFICATIONS).select('*').eq('user_id', user?.id).order('sort_order'),
        supabase.from(TABLES.LANGUAGES).select('*').eq('user_id', user?.id).order('sort_order')
      ]);

      setDashboardData({
        profile: profileRes.data,
        projects: projectsRes.data || [],
        experience: experienceRes.data || [],
        skills: skillsRes.data || [],
        education: educationRes.data || [],
        certifications: certificationsRes.data || [],
        languages: languagesRes.data || []
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Fallback to mock data
      setDashboardData({
        profile: mockData.profile,
        projects: mockData.projects || [],
        experience: mockData.experience || [],
        skills: mockData.skills || [],
        education: mockData.education || [],
        certifications: mockData.certifications || [],
        languages: mockData.languages || []
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  // Calculate dynamic stats from real data
  const stats = [
    { 
      icon: FolderOpen, 
      label: 'Total Projects', 
      value: dashboardData.projects.length, 
      change: `${dashboardData.projects.filter(p => p.featured).length} featured`,
      color: 'from-blue-500 to-indigo-600',
      trend: 'up'
    },
    { 
      icon: Briefcase, 
      label: 'Work Experience', 
      value: dashboardData.experience.length, 
      change: `${dashboardData.experience.length > 0 ? new Date().getFullYear() - new Date(dashboardData.experience[0]?.period?.split(' - ')[0] || '2020').getFullYear() : 0}+ years`,
      color: 'from-green-500 to-emerald-600',
      trend: 'up'
    },
    { 
      icon: Code, 
      label: 'Skills & Technologies', 
      value: dashboardData.skills.reduce((total, category) => total + (category.skills?.length || 0), 0), 
      change: `${dashboardData.skills.length} categories`,
      color: 'from-purple-500 to-violet-600',
      trend: 'up'
    },
    { 
      icon: Award, 
      label: 'Achievements', 
      value: dashboardData.certifications.length + dashboardData.education.length, 
      change: `${dashboardData.languages.length} languages`,
      color: 'from-yellow-500 to-orange-600',
      trend: 'up'
    }
  ];

  const recentProjects = dashboardData.projects.slice(0, 3);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-500/15 to-orange-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10">
      {/* Header with Refresh */}
      <ScrollAnimations animation="fade-in-up" delay={0}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Welcome back, {dashboardData.profile?.name || 'Admin'}! 👋
            </h1>
            <p className="text-blue-200/80 font-medium">
              Here's what's happening with your portfolio today.
            </p>
          </div>
          <Button
            onClick={refreshData}
            disabled={refreshing}
            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30 text-blue-100 hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
      </ScrollAnimations>

      {/* Enhanced Stats Grid */}
      <ScrollAnimations animation="fade-in-up" delay={100}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, index) => (
            <GlassMorphism 
              key={index}
              className="group p-4 sm:p-6 rounded-2xl border-white/20 hover:scale-105 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 cursor-pointer backdrop-blur-xl"
              intensity="medium"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:shadow-current/30`}>
                  <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-blue-200/70 text-sm font-medium mb-1 group-hover:text-blue-100 transition-colors duration-300">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {loading ? (
                      <div className="w-16 h-8 bg-gray-600 rounded animate-pulse" />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                    <p className="text-emerald-400 text-xs font-medium group-hover:text-emerald-300 transition-colors duration-300">{stat.change}</p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced animated background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500`} />
            </GlassMorphism>
          ))}
        </div>
      </ScrollAnimations>

      {/* Recent Projects & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Enhanced Recent Projects */}
        <ScrollAnimations animation="fade-in-up" delay={200}>
          <div className="lg:col-span-2">
            <GlassMorphism className="p-4 sm:p-6 rounded-2xl border-blue-400/20 hover:border-blue-300/40 transition-all duration-300 backdrop-blur-xl" intensity="medium">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <FolderOpen className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Recent Projects</h3>
                  <Badge className="bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-blue-200 border-blue-400/40 text-xs">
                    {dashboardData.projects.length}
                  </Badge>
                </div>
                <Link to="/admin/projects">
                  <InteractiveButton 
                    variant="ghost" 
                    size="sm" 
                    className="text-indigo-300 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 border border-indigo-400/30 hover:border-indigo-300/50 hover:shadow-lg hover:shadow-indigo-500/25"
                    ripple={true}
                  >
                    View All
                    <TrendingUp className="h-4 w-4 ml-2" />
                  </InteractiveButton>
                </Link>
              </div>
              
              {recentProjects.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                    <FolderOpen className="h-8 w-8 text-blue-300" />
                  </div>
                  <h4 className="text-blue-100 font-medium mb-2">No projects yet</h4>
                  <p className="text-blue-200/70 text-sm mb-4">Start building your portfolio by adding your first project.</p>
                  <Link to="/admin/projects">
                    <InteractiveButton size="sm" variant="gradient" ripple={true}>
                      Add Project
                    </InteractiveButton>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentProjects.map((project, index) => {
                    const techColors = [
                      'from-blue-500 to-indigo-600',
                      'from-green-500 to-emerald-600', 
                      'from-purple-500 to-violet-600',
                      'from-orange-500 to-red-600',
                      'from-pink-500 to-rose-600'
                    ];
                    
                    return (
                      <GlassMorphism 
                        key={project.id} 
                        className="group p-4 rounded-xl border-white/20 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:backdrop-blur-md"
                        intensity="low"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${techColors[index % techColors.length]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:shadow-current/40`}>
                            <Code className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h4 className="text-white font-semibold text-lg group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                {project.title}
                              </h4>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {project.featured && (
                                  <Badge className="bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-yellow-200 border-yellow-400/50 text-xs shadow-lg shadow-yellow-500/20">
                                    <Star className="h-3 w-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                                <Badge className={`text-xs ${
                                  project.status === 'Live' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                  project.status === 'Development' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                  'bg-gray-500/20 text-gray-400 border-gray-500/30'
                                }`}>
                                  {project.status || 'Active'}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-blue-200/70 text-sm mb-3 line-clamp-2 group-hover:text-blue-100/90 transition-colors duration-300">
                              {project.description}
                            </p>
                            
                            {/* Technologies */}
                            {project.technologies && project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {project.technologies.slice(0, 4).map((tech, techIndex) => (
                                  <span 
                                    key={techIndex}
                                    className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 rounded-md border border-blue-400/30 hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-300/50 hover:shadow-sm hover:shadow-blue-500/20 transition-all duration-200"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 4 && (
                                  <span className="px-2 py-1 text-xs bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 rounded-md border border-gray-400/20">
                                    +{project.technologies.length - 4} more
                                  </span>
                                )}
                              </div>
                            )}
                            
                            {/* Action buttons */}
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {project.github_url && (
                                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-blue-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-indigo-500/20 border border-blue-400/30 hover:border-blue-300/50 hover:shadow-sm hover:shadow-blue-500/20">
                                  <Eye className="h-3 w-3 mr-1" />
                                  Code
                                </Button>
                              )}
                              {project.live_url && (
                                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-green-300 hover:text-white hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-500/20 border border-green-400/30 hover:border-green-300/50 hover:shadow-sm hover:shadow-green-500/20">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Live
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </GlassMorphism>
                    );
                  })}
                </div>
              )}
            </GlassMorphism>
          </div>
        </ScrollAnimations>

        {/* Enhanced Quick Actions & Analytics */}
        <ScrollAnimations animation="fade-in-up" delay={400}>
          <div className="space-y-6">
            {/* Quick Actions */}
            <GlassMorphism className="p-4 sm:p-6 rounded-2xl border-purple-400/20 hover:border-purple-300/40 transition-all duration-300 backdrop-blur-xl" intensity="medium">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Quick Actions</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Link to="/admin/projects">
                  <InteractiveButton
                    variant="secondary"
                    size="sm"
                    ripple={true}
                    className="w-full justify-start bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-white hover:from-blue-500/20 hover:to-indigo-500/20 group"
                  >
                    <FolderOpen className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">Manage Projects</div>
                      <div className="text-xs text-gray-400">{dashboardData.projects.length} projects</div>
                    </div>
                    <TrendingUp className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </InteractiveButton>
                </Link>
                
                <Link to="/admin/resume">
                  <InteractiveButton
                    variant="secondary"
                    size="sm"
                    ripple={true}
                    className="w-full justify-start bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20 text-white hover:from-green-500/20 hover:to-emerald-500/20 group"
                  >
                    <FileText className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">Edit Resume</div>
                      <div className="text-xs text-gray-400">{dashboardData.experience.length} experiences</div>
                    </div>
                    <TrendingUp className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </InteractiveButton>
                </Link>
                
                <Link to="/admin/data-seeder">
                  <InteractiveButton
                    variant="secondary"
                    size="sm"
                    ripple={true}
                    className="w-full justify-start bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-purple-500/20 text-white hover:from-purple-500/20 hover:to-violet-500/20 group"
                  >
                    <Target className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">Database Tools</div>
                      <div className="text-xs text-gray-400">Seed & manage data</div>
                    </div>
                    <TrendingUp className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </InteractiveButton>
                </Link>
                
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <InteractiveButton
                    variant="secondary"
                    size="sm"
                    ripple={true}
                    className="w-full justify-start bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20 text-white hover:from-yellow-500/20 hover:to-orange-500/20 group"
                  >
                    <Eye className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">View Portfolio</div>
                      <div className="text-xs text-gray-400">See public site</div>
                    </div>
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </InteractiveButton>
                </a>
              </div>
            </GlassMorphism>

            {/* Portfolio Analytics */}
            <GlassMorphism className="p-4 sm:p-6 rounded-2xl border-green-400/20 hover:border-green-300/40 transition-all duration-300 backdrop-blur-xl" intensity="medium">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">Portfolio Health</h3>
              </div>
              
              <div className="space-y-4">
                {/* Completion Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-green-200/80 text-sm font-medium">Profile Completion</span>
                    <span className="text-green-100 font-bold">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200/80 text-sm font-medium">Content Quality</span>
                    <span className="text-blue-100 font-bold">88%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200/80 text-sm font-medium">SEO Score</span>
                    <span className="text-purple-100 font-bold">92%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </GlassMorphism>

            {/* Recent Activity Feed */}
            <GlassMorphism className="p-4 sm:p-6 rounded-2xl border-orange-400/20 hover:border-orange-300/40 transition-all duration-300 backdrop-blur-xl" intensity="medium">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">Recent Activity</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <FolderOpen className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-green-100 text-sm font-medium">Database seeded successfully</p>
                    <p className="text-green-200/70 text-xs">All portfolio data populated</p>
                    <p className="text-green-300/60 text-xs mt-1">Just now</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-blue-100 text-sm font-medium">Resume data updated</p>
                    <p className="text-blue-200/70 text-xs">Experience and skills synced</p>
                    <p className="text-blue-300/60 text-xs mt-1">5 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-purple-100 text-sm font-medium">Portfolio viewed</p>
                    <p className="text-purple-200/70 text-xs">Public site accessed</p>
                    <p className="text-purple-300/60 text-xs mt-1">2 hours ago</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <Button variant="ghost" size="sm" className="w-full text-orange-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 border border-orange-400/30 hover:border-orange-300/50 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300">
                  View All Activity
                  <TrendingUp className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </GlassMorphism>
          </div>
        </ScrollAnimations>
      </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;
