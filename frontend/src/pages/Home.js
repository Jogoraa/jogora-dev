import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Code, Database, Server, Globe, Star, Zap, Heart, 
  Sparkles, Rocket, ChevronDown, Play, Github, 
  ExternalLink, Award, TrendingUp, Users, Coffee
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { mockData } from "../data/mockData";
import { supabase, TABLES } from "../config/supabase";
import resumeService from "../services/resumeService";
import projectService from "../services/projectService";
import AnimatedContainer from "../components/AnimatedContainer";
import ParticleBackground from "../components/ParticleBackground";
import ScrollAnimations from "../components/ScrollAnimations";
import GlassMorphism from "../components/GlassMorphism";
import InteractiveButton from "../components/InteractiveButton";

const Home = () => {
  const [portfolioData, setPortfolioData] = useState({
    profile: mockData.profile,
    featuredProjects: mockData.featuredProjects || [],
    skills: mockData.skills || [],
    experience: mockData.experience || []
  });
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [showAllExperience, setShowAllExperience] = useState(false);

  // Load portfolio data from Supabase
  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      
      // Try to get public data from Supabase (no authentication required)
      const [profileRes, projectsRes, skillsRes, experienceRes] = await Promise.all([
        supabase.from(TABLES.PROFILE).select('*').limit(1).single(),
        supabase.from(TABLES.PROJECTS).select('*').eq('featured', true).limit(3),
        supabase.from(TABLES.SKILLS).select('*').order('sort_order'),
        supabase.from(TABLES.EXPERIENCE).select('*').order('sort_order', { ascending: false }).limit(3)
      ]);

      // Use Supabase data if available, otherwise fall back to mock data
      setPortfolioData({
        profile: profileRes.data || mockData.profile,
        featuredProjects: projectsRes.data?.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          technologies: project.technologies || [],
          githubUrl: project.github_url,
          liveUrl: project.live_url,
          image: project.image_url,
          featured: project.featured
        })) || mockData.featuredProjects || [],
        skills: skillsRes.data || mockData.skills || [],
        experience: experienceRes.data || mockData.experience || []
      });
    } catch (error) {
      console.log('Using mock data as fallback:', error);
      // Keep mock data as fallback
    } finally {
      setLoading(false);
    }
  };

  const { profile, featuredProjects, skills, experience } = portfolioData;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Interactive Particle Background */}
      <ParticleBackground />
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x * 0.02 + 'px',
            top: mousePosition.y * 0.02 + 'px',
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse"
          style={{
            right: mousePosition.x * -0.01 + 'px',
            bottom: mousePosition.y * -0.01 + 'px',
            transform: `translateY(${scrollY * -0.05}px)`,
            animationDelay: '1s'
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white/60 to-blue-50/80 pointer-events-none" />
      
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-pink-500 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Status Badge */}
          <ScrollAnimations animation="fade-in-down" delay={0}>
            <GlassMorphism className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border-white/30">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">Available for new projects</span>
            </GlassMorphism>
          </ScrollAnimations>

          {/* Main Title with Gradient */}
          <ScrollAnimations animation="fade-in-up" delay={200}>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-tight mb-6 sm:mb-8 leading-none">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent animate-gradient bg-300% hover:scale-105 transition-transform duration-500 inline-block">
                {profile.name}
              </span>
            </h1>
          </ScrollAnimations>

          {/* Animated Subtitle */}
          <ScrollAnimations animation="fade-in-up" delay={400}>
            <div className="relative mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl lg:text-3xl xl:text-4xl font-light text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed px-4">
                <span className="relative">
                  {profile.title}
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </span>
              </h2>
            </div>
          </ScrollAnimations>

          {/* Enhanced Bio */}
          <ScrollAnimations animation="fade-in-up" delay={600}>
            <p className="text-base sm:text-lg lg:text-xl text-gray-500 max-w-5xl mx-auto leading-relaxed mb-8 sm:mb-12 font-light px-4">
              {profile.bio}
            </p>
          </ScrollAnimations>

          {/* Premium Action Buttons */}
          <ScrollAnimations animation="scale-in" delay={800}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <InteractiveButton
                variant="gradient"
                size="lg"
                ripple={true}
                glow={true}
                magnetic={true}
                className="group"
              >
                <Link to="/projects" className="flex items-center gap-3">
                  <Rocket className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Explore My Work
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </InteractiveButton>

              <InteractiveButton
                variant="secondary"
                size="lg"
                ripple={true}
                magnetic={true}
                className="group"
              >
                <Link to="/contact" className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Let's Connect
                  <Heart className="h-5 w-5 group-hover:scale-110 text-red-500 transition-all duration-300" />
                </Link>
              </InteractiveButton>

              <InteractiveButton
                variant="ghost"
                size="lg"
                ripple={true}
                className="group"
              >
                <a href="#demo" className="flex items-center gap-3">
                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </a>
              </InteractiveButton>
            </div>
          </ScrollAnimations>

          {/* Enhanced Tech Stack with Animations */}
          <ScrollAnimations animation="fade-in" delay={1000}>
            <div className="relative">
              <p className="text-sm text-gray-400 mb-6 uppercase tracking-wider font-medium">Powered by</p>
              <div className="flex items-center justify-center gap-12 flex-wrap">
                {[
                  { icon: Code, label: "Frontend", color: "text-blue-500" },
                  { icon: Database, label: "Backend", color: "text-green-500" },
                  { icon: Server, label: "DevOps", color: "text-purple-500" },
                  { icon: Globe, label: "Full-Stack", color: "text-orange-500" }
                ].map(({ icon: Icon, label, color }, index) => (
                  <GlassMorphism 
                    key={index}
                    className="group p-4 rounded-2xl hover:scale-110 transition-all duration-500 cursor-pointer"
                    intensity="light"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className={`h-8 w-8 ${color} group-hover:scale-125 transition-transform duration-300 mb-2`} />
                    <p className="text-xs text-gray-600 font-medium">{label}</p>
                  </GlassMorphism>
                ))}
              </div>
            </div>
          </ScrollAnimations>

          {/* Scroll Indicator */}
          <ScrollAnimations animation="fade-in" delay={1200}>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="h-6 w-6 text-gray-400" />
            </div>
          </ScrollAnimations>
        </div>
      </section>

      {/* INSANE World-Class Projects Section */}
      <section className="py-16 sm:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Mind-Blowing Background */}
        <div className="absolute inset-0">
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
          
          {/* Animated Mesh Gradient */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-pink-600/30 animate-gradient-shift" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-cyan-500/20 via-transparent to-violet-500/20 animate-gradient-shift" style={{ animationDelay: '2s' }} />
          </div>

          {/* Floating Orbs */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-32 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-32 left-1/3 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>
        </div>

        <div className="max-w-8xl mx-auto relative z-10">
          {/* Spectacular Header */}
          <ScrollAnimations animation="fade-in-up" delay={0}>
            <div className="text-center mb-16 sm:mb-24 lg:mb-32 px-4">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 text-white text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
                <Rocket className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce-subtle" />
                <span className="hidden sm:inline">Featured Masterpieces</span>
                <span className="sm:hidden">Projects</span>
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-wiggle" />
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white mb-6 sm:mb-8 leading-none">
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-gradient bg-300%">
                  LEGENDARY
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent animate-gradient bg-300%" style={{ animationDelay: '1s' }}>
                  PROJECTS
                </span>
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                Revolutionary solutions that push the boundaries of what's possible in web development
              </p>
            </div>
          </ScrollAnimations>

          {/* Insane Project Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-16 sm:mb-24 px-4">
            {featuredProjects.map((project, index) => (
              <ScrollAnimations 
                key={project.id}
                animation="fade-in-up"
                delay={index * 300}
              >
                <div className="group relative">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient-shift" />
                  
                  {/* Main Card */}
                  <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 hover:bg-slate-800/90 transition-all duration-700 overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99,102,241,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168,85,247,0.3) 0%, transparent 50%)`
                      }} />
                    </div>

                    {/* Project Number */}
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <span className="text-white font-bold text-xs sm:text-sm">0{index + 1}</span>
                    </div>

                    {/* Project Header */}
                    <div className="relative mb-4 sm:mb-6 lg:mb-8">
                      <div className="flex items-start gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <Zap className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white animate-pulse" />
                          </div>
                          <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500 mb-2 sm:mb-3 leading-tight">
                            {project.title}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-400">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              <span className="text-xs sm:text-sm font-medium">Live & Active</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="text-xs sm:text-sm">High Performance</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <div className="group/btn relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition duration-300" />
                          <button className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-slate-800 hover:bg-slate-700 rounded-lg sm:rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300 group-hover/btn:scale-110">
                            <Github className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-gray-400 group-hover/btn:text-white" />
                          </button>
                        </div>
                        <div className="group/btn relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition duration-300" />
                          <button className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-slate-800 hover:bg-slate-700 rounded-lg sm:rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300 group-hover/btn:scale-110">
                            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-gray-400 group-hover/btn:text-white" />
                          </button>
                        </div>
                        <div className="group/btn relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition duration-300" />
                          <button className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-slate-800 hover:bg-slate-700 rounded-lg sm:rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300 group-hover/btn:scale-110">
                            <Play className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-gray-400 group-hover/btn:text-white" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Project Description */}
                    <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg font-light">
                      {project.description}
                    </p>

                    {/* Tech Stack with Animations */}
                    <div className="mb-4 sm:mb-6 lg:mb-8">
                      <h4 className="text-white font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                        <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                        Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {project.technologies.map((tech, techIndex) => (
                          <div 
                            key={tech}
                            className="group/tech relative"
                            style={{ animationDelay: `${techIndex * 100}ms` }}
                          >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md sm:rounded-lg blur opacity-0 group-hover/tech:opacity-100 transition duration-300" />
                            <span className="relative px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 bg-slate-800/80 backdrop-blur-sm border border-white/10 rounded-md sm:rounded-lg text-gray-300 text-xs sm:text-sm font-medium hover:text-white hover:bg-slate-700/80 transition-all duration-300 group-hover/tech:scale-105">
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project Metrics */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
                      {[
                        { label: "Performance", value: "98%", icon: Zap },
                        { label: "Accessibility", value: "100%", icon: Heart },
                        { label: "SEO Score", value: "95%", icon: TrendingUp }
                      ].map((metric, metricIndex) => (
                        <div key={metricIndex} className="text-center p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl bg-slate-800/50 border border-white/5 group-hover:bg-slate-700/50 transition-colors duration-500">
                          <metric.icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-400 mx-auto mb-1 sm:mb-2" />
                          <div className="text-sm sm:text-lg lg:text-xl font-bold text-white mb-0.5 sm:mb-1">{metric.value}</div>
                          <div className="text-xs text-gray-400 font-medium">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Explore Button */}
                    <Link
                      to={`/projects/${project.slug}`}
                      className="group/explore relative inline-flex items-center gap-2 sm:gap-3 w-full justify-center py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg sm:rounded-xl text-white font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 text-sm sm:text-base"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg sm:rounded-xl blur opacity-0 group-hover/explore:opacity-50 transition-opacity duration-500" />
                      <span className="relative">Explore Masterpiece</span>
                      <ArrowRight className="relative h-4 w-4 sm:h-5 sm:w-5 group-hover/explore:translate-x-1 transition-transform duration-300" />
                    </Link>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl sm:rounded-3xl" />
                  </div>
                </div>
              </ScrollAnimations>
            ))}
          </div>

          {/* Epic Stats Section */}
          <ScrollAnimations animation="fade-in-up" delay={600}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
              {[
                { icon: Code, label: "Projects Delivered", value: "50+", color: "from-blue-500 to-cyan-500", bgColor: "from-blue-500/20 to-cyan-500/20" },
                { icon: Users, label: "Happy Clients", value: "25+", color: "from-green-500 to-emerald-500", bgColor: "from-green-500/20 to-emerald-500/20" },
                { icon: Coffee, label: "Coffee Consumed", value: "1000+", color: "from-orange-500 to-yellow-500", bgColor: "from-orange-500/20 to-yellow-500/20" },
                { icon: Award, label: "Awards Won", value: "10+", color: "from-purple-500 to-pink-500", bgColor: "from-purple-500/20 to-pink-500/20" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="group relative"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000`} />
                  <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:bg-slate-800/90 transition-all duration-500">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <stat.icon className={`h-8 w-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                    </div>
                    <div className="text-4xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                    <div className="text-gray-400 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimations>

          {/* Ultimate CTA */}
          <ScrollAnimations animation="scale-in" delay={800}>
            <div className="text-center">
              <div className="relative inline-block">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75 animate-gradient-shift" />
                <InteractiveButton
                  variant="gradient"
                  size="xl"
                  ripple={true}
                  glow={true}
                  magnetic={true}
                  className="relative group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500"
                >
                  <Link to="/projects" className="flex items-center gap-4">
                    <Star className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300 animate-pulse" />
                    <span className="text-xl font-bold">Explore All Masterpieces</span>
                    <Rocket className="h-6 w-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  </Link>
                </InteractiveButton>
              </div>
            </div>
          </ScrollAnimations>
        </div>
      </section>

      {/* Premium Skills Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" />
          <div className="absolute inset-0 bg-black/20" />
          <div 
            className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <div 
            className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <ScrollAnimations animation="fade-in-up" delay={0}>
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-sm">
                <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                Technical Expertise
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Skills & Technologies
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                Mastering the full spectrum of modern development technologies and methodologies
              </p>
            </div>
          </ScrollAnimations>

          {/* Enhanced Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {skills.map((category, index) => (
              <ScrollAnimations 
                key={category.category}
                animation="fade-in-up"
                delay={index * 200}
              >
                <GlassMorphism 
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 h-full hover:scale-105 transition-all duration-700 border-white/10"
                  intensity="medium"
                  tint="white"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      {index === 0 && <Code className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />}
                      {index === 1 && <Database className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />}
                      {index === 2 && <Server className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />}
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300 leading-tight">
                      {category.category}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {category.items.map((skill, skillIndex) => (
                      <div 
                        key={skill}
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/skill"
                        style={{ animationDelay: `${skillIndex * 100}ms` }}
                      >
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex-shrink-0" />
                        <span className="text-gray-200 group-hover/skill:text-white transition-colors duration-300 font-medium text-sm sm:text-base flex-1 min-w-0">
                          {skill}
                        </span>
                        <div className="ml-auto w-12 sm:w-16 h-1 bg-white/20 rounded-full overflow-hidden flex-shrink-0">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform scale-x-0 group-hover/skill:scale-x-100 transition-transform duration-700"
                            style={{ transformOrigin: 'left' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                </GlassMorphism>
              </ScrollAnimations>
            ))}
          </div>

          {/* Technology Showcase */}
          <ScrollAnimations animation="fade-in-up" delay={600}>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-8">Powered by Industry Leaders</h3>
              <div className="flex items-center justify-center gap-12 flex-wrap opacity-60 hover:opacity-100 transition-opacity duration-500">
                {['React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB'].map((tech, index) => (
                  <div 
                    key={tech}
                    className="text-white font-semibold text-lg hover:scale-110 transition-transform duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimations>
        </div>
      </section>

      {/* Premium Experience Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-purple-100/30" />
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)
            `
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(30deg, transparent 40%, rgba(34, 197, 94, 0.03) 40%, rgba(34, 197, 94, 0.03) 60%, transparent 60%),
              linear-gradient(-30deg, transparent 40%, rgba(59, 130, 246, 0.03) 40%, rgba(59, 130, 246, 0.03) 60%, transparent 60%)
            `,
            backgroundSize: '100px 100px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <ScrollAnimations animation="fade-in-up" delay={0}>
            <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                Career Journey
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Professional Experience
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {experience.length}+ years of delivering exceptional results across diverse projects and technologies
              </p>
            </div>
          </ScrollAnimations>

          {/* Responsive Timeline Experience */}
          <div className="relative">
            {/* Timeline Line - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-in-out" style={{
              height: showAllExperience ? `${experience.length * 400}px` : '800px'
            }} />
            
            {/* Mobile Timeline Line - Left side */}
            <div className="lg:hidden absolute left-6 top-0 w-1 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-in-out" style={{
              height: showAllExperience ? `${experience.length * 320}px` : '640px'
            }} />
            
            <div className="space-y-8 lg:space-y-16 transition-all duration-1000 ease-in-out">
              {(showAllExperience ? experience : experience.slice(0, 2)).map((job, index) => (
                <ScrollAnimations 
                  key={job.id}
                  animation="fade-in-up"
                  delay={index * 150}
                >
                  {/* Desktop Layout - Alternating sides */}
                  <div className={`hidden lg:flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Timeline Node - Desktop */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full border-4 border-white shadow-lg z-10 animate-pulse" />
                    
                    {/* Content Card - Desktop */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <GlassMorphism 
                        className="group relative overflow-hidden rounded-3xl p-8 hover:scale-105 transition-all duration-700 border-white/30 hover:border-emerald-200/50"
                        intensity="medium"
                      >
                        {/* Job Header */}
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 mb-2">
                              {job.role}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                              <span className="font-semibold">{job.company}</span>
                            </div>
                            <div className="text-sm text-gray-500 font-medium">{job.period}</div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                          {job.description}
                        </p>

                        {/* Achievements */}
                        <div className="space-y-3 mb-6">
                          {job.achievements.slice(0, showAllExperience ? job.achievements.length : 3).map((achievement, achIndex) => (
                            <div 
                              key={achIndex}
                              className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-emerald-50/50 transition-colors duration-300 group/achievement"
                            >
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 group-hover/achievement:scale-125 transition-transform duration-300" />
                              <span className="text-gray-700 font-medium group-hover/achievement:text-emerald-700 transition-colors duration-300">{achievement}</span>
                            </div>
                          ))}
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                      </GlassMorphism>
                    </div>
                  </div>

                  {/* Mobile Layout - Single column */}
                  <div className="lg:hidden flex items-start gap-6 relative">
                    {/* Timeline Node - Mobile */}
                    <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full border-2 border-white shadow-lg flex-shrink-0 mt-2 relative z-10" />
                    
                    {/* Content Card - Mobile */}
                    <div className="flex-1">
                      <GlassMorphism 
                        className="group relative overflow-hidden rounded-2xl p-6 hover:scale-[1.02] transition-all duration-500 border-white/30 hover:border-emerald-200/50"
                        intensity="medium"
                      >
                        {/* Job Header - Mobile */}
                        <div className="mb-4">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                              <Award className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 mb-1 leading-tight">
                                {job.role}
                              </h3>
                              <div className="text-gray-600 font-semibold text-sm mb-1">
                                {job.company}
                              </div>
                              <div className="text-xs text-gray-500 font-medium">
                                {job.period}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description - Mobile */}
                        <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                          {job.description}
                        </p>

                        {/* Achievements - Mobile (Show fewer by default) */}
                        <div className="space-y-2">
                          {job.achievements.slice(0, showAllExperience ? job.achievements.length : 2).map((achievement, achIndex) => (
                            <div 
                              key={achIndex}
                              className="flex items-start gap-2 p-2 rounded-lg bg-white/50 hover:bg-emerald-50/50 transition-colors duration-300 group/achievement"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 flex-shrink-0 mt-1.5" />
                              <span className="text-gray-700 text-sm font-medium group-hover/achievement:text-emerald-700 transition-colors duration-300 leading-relaxed">
                                {achievement}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Hover Effect - Mobile */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                      </GlassMorphism>
                    </div>
                  </div>
                </ScrollAnimations>
              ))}
            </div>
          </div>

          {/* CTA */}
          <ScrollAnimations animation="scale-in" delay={600}>
            <div className="text-center mt-20 space-y-4">
              <InteractiveButton
                variant="gradient"
                size="lg"
                ripple={true}
                glow={true}
                className="group"
                onClick={() => setShowAllExperience(!showAllExperience)}
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  {showAllExperience ? 'Show Less Experience' : 'View All Experience'}
                  <ArrowRight className={`h-5 w-5 transition-transform duration-300 ${showAllExperience ? 'rotate-180' : 'group-hover:translate-x-1'}`} />
                </div>
              </InteractiveButton>
              
              {showAllExperience && (
                <div className="mt-6">
                  <InteractiveButton
                    variant="secondary"
                    size="md"
                    ripple={true}
                    className="group"
                  >
                    <Link to="/about" className="flex items-center gap-2">
                      <Award className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      View Detailed Resume
                    </Link>
                  </InteractiveButton>
                </div>
              )}
            </div>
          </ScrollAnimations>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99,102,241,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168,85,247,0.3) 0%, transparent 50%)`
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Main CTA */}
          <ScrollAnimations animation="fade-in-up" delay={0}>
            <div className="mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium mb-6 sm:mb-8 backdrop-blur-sm">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                Ready to Start
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight text-white mb-6 sm:mb-8 leading-tight px-4">
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Let's Build Something
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
                  Amazing Together
                </span>
              </h2>
            </div>
          </ScrollAnimations>

          <ScrollAnimations animation="fade-in-up" delay={200}>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 sm:mb-16 font-light px-4">
              Ready to transform your ideas into reality? Let's collaborate and create something extraordinary that makes a real impact.
            </p>
          </ScrollAnimations>

          {/* Action Buttons */}
          <ScrollAnimations animation="scale-in" delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 px-4">
              <InteractiveButton
                variant="gradient"
                size="xl"
                ripple={true}
                glow={true}
                magnetic={true}
                className="group w-full sm:w-auto"
              >
                <Link to="/contact" className="flex items-center gap-3 sm:gap-4 justify-center">
                  <Rocket className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-sm sm:text-base lg:text-lg font-semibold">Start Your Project</span>
                  <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </InteractiveButton>

              <InteractiveButton
                variant="secondary"
                size="xl"
                ripple={true}
                magnetic={true}
                className="group bg-white/10 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto"
              >
                <a href="/resume" target="_blank" className="flex items-center gap-3 sm:gap-4 justify-center">
                  <Star className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-sm sm:text-base lg:text-lg font-semibold">Download Resume</span>
                </a>
              </InteractiveButton>
            </div>
          </ScrollAnimations>

          {/* Contact Info */}
          <ScrollAnimations animation="fade-in-up" delay={600}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Heart, label: "Available for", value: "New Projects" },
                { icon: Zap, label: "Response Time", value: "< 24 Hours" },
                { icon: Globe, label: "Time Zone", value: "UTC+3" }
              ].map((item, index) => (
                <GlassMorphism 
                  key={index}
                  className="p-6 rounded-2xl text-center border-white/10"
                  intensity="light"
                  tint="white"
                >
                  <item.icon className="h-8 w-8 text-white mx-auto mb-3" />
                  <div className="text-sm text-gray-300 mb-1">{item.label}</div>
                  <div className="text-lg font-semibold text-white">{item.value}</div>
                </GlassMorphism>
              ))}
            </div>
          </ScrollAnimations>
        </div>
      </section>
    </div>
  );
};

export default Home;