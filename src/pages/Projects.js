import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Github, ExternalLink, Filter, Rocket, Star, 
  Zap, Code, Play, Heart, TrendingUp, Award, Sparkles 
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { mockData } from "../data/mockData";
import ParticleBackground from "../components/ParticleBackground";
import ScrollAnimations from "../components/ScrollAnimations";
import GlassMorphism from "../components/GlassMorphism";
import InteractiveButton from "../components/InteractiveButton";

const Projects = () => {
  const { projects } = mockData;
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Get unique technologies for filtering
  const allTechnologies = [...new Set(projects.flatMap(project => project.technologies))];
  
  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    if (value === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => 
        project.technologies.includes(value)
      ));
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Insane Background */}
      <ParticleBackground />
      
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/50 via-transparent to-pink-900/50" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-60 right-32 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-1/3 w-64 h-64 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      <div className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          {/* Epic Header */}
          <ScrollAnimations animation="fade-in-up" delay={0}>
            <div className="text-center mb-16 sm:mb-20 lg:mb-24">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 text-white text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
                <Rocket className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce-subtle" />
                <span className="hidden sm:inline">Portfolio Showcase</span>
                <span className="sm:hidden">Portfolio</span>
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-wiggle" />
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white mb-6 sm:mb-8 leading-none">
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-gradient bg-300%">
                  ALL
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent animate-gradient bg-300%" style={{ animationDelay: '1s' }}>
                  PROJECTS
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light mb-8 sm:mb-12 px-4">
                A comprehensive showcase of revolutionary solutions, cutting-edge implementations, and innovative masterpieces
              </p>
            </div>
          </ScrollAnimations>

          {/* Premium Filter Section */}
          <ScrollAnimations animation="fade-in-up" delay={200}>
            <div className="mb-12 sm:mb-16 lg:mb-20 px-4">
              <GlassMorphism className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border-white/10" intensity="medium">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
                  <div className="flex items-center gap-3 sm:gap-4 text-center lg:text-left">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Filter className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base sm:text-lg">Filter Projects</h3>
                      <p className="text-gray-400 text-xs sm:text-sm">Explore by technology stack</p>
                    </div>
                  </div>
                  
                  <div className="relative w-full lg:w-auto">
                    <Select value={selectedFilter} onValueChange={handleFilterChange}>
                      <SelectTrigger className="w-full lg:w-80 bg-slate-800/50 border-white/20 text-white backdrop-blur-sm hover:bg-slate-700/50 transition-colors">
                        <SelectValue placeholder="All technologies" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20 text-white">
                        <SelectItem value="all" className="hover:bg-slate-700">All Technologies</SelectItem>
                        {allTechnologies.map((tech) => (
                          <SelectItem key={tech} value={tech} className="hover:bg-slate-700">
                            {tech}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-gray-300">
                    Showing <span className="text-blue-400 font-semibold">{filteredProjects.length}</span> of <span className="text-purple-400 font-semibold">{projects.length}</span> legendary projects
                  </p>
                </div>
              </GlassMorphism>
            </div>
          </ScrollAnimations>

          {/* Insane Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-16 sm:mb-20 lg:mb-24 px-4">
            {filteredProjects.map((project, index) => (
              <ScrollAnimations 
                key={project.id}
                animation="fade-in-up"
                delay={index * 150}
              >
                <div className="group relative">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient-shift" />
                  
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
                      <span className="text-white font-bold text-xs sm:text-sm">{String(index + 1).padStart(2, '0')}</span>
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
                              <span className="text-xs sm:text-sm font-medium">{project.status || 'Live & Active'}</span>
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
                        {project.githubUrl && (
                          <div className="group/btn relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition duration-300" />
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-slate-800 hover:bg-slate-700 rounded-lg sm:rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300 group-hover/btn:scale-110"
                            >
                              <Github className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-gray-400 group-hover/btn:text-white" />
                            </a>
                          </div>
                        )}
                        {project.liveUrl && (
                          <div className="group/btn relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition duration-300" />
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-slate-800 hover:bg-slate-700 rounded-lg sm:rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300 group-hover/btn:scale-110"
                            >
                              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-gray-400 group-hover/btn:text-white" />
                            </a>
                          </div>
                        )}
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

                    {/* Key Features */}
                    {project.keyFeatures && (
                      <div className="mb-4 sm:mb-6 lg:mb-8">
                        <h4 className="text-white font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                          Key Features
                        </h4>
                        <div className="space-y-2">
                          {project.keyFeatures.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex-shrink-0" />
                              <span className="text-gray-300 font-medium text-sm sm:text-base">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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
                      className="group/explore relative inline-flex items-center gap-2 sm:gap-3 w-full justify-center py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg sm:rounded-xl text-white font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 z-20 text-sm sm:text-base"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg sm:rounded-xl blur opacity-0 group-hover/explore:opacity-50 transition-opacity duration-500 -z-10" />
                      <span className="relative z-10">View Case Study</span>
                      <ArrowRight className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 group-hover/explore:translate-x-1 transition-transform duration-300" />
                    </Link>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl sm:rounded-3xl pointer-events-none" />
                  </div>
                </div>
              </ScrollAnimations>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <ScrollAnimations animation="fade-in-up" delay={0}>
              <div className="text-center py-24">
                <GlassMorphism className="max-w-2xl mx-auto p-12 rounded-3xl border-white/10" intensity="medium">
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <Filter className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">No Projects Found</h3>
                  <p className="text-gray-400 mb-8">No projects match the selected technology filter.</p>
                  <InteractiveButton
                    variant="gradient"
                    size="lg"
                    ripple={true}
                    onClick={() => handleFilterChange("all")}
                  >
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Show All Projects
                    </div>
                  </InteractiveButton>
                </GlassMorphism>
              </div>
            </ScrollAnimations>
          )}

          {/* Epic CTA Section */}
          <ScrollAnimations animation="fade-in-up" delay={400}>
            <div className="mt-32 text-center">
              <GlassMorphism className="max-w-4xl mx-auto p-16 rounded-3xl border-white/10" intensity="medium">
                <div className="mb-8">
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Ready to Build Something Amazing?
                    </span>
                  </h3>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                    Let's collaborate and create the next revolutionary solution that pushes the boundaries of what's possible
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <InteractiveButton
                    variant="gradient"
                    size="xl"
                    ripple={true}
                    glow={true}
                    magnetic={true}
                    className="group"
                  >
                    <Link to="/contact" className="flex items-center gap-3">
                      <Rocket className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                      Start a Conversation
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </InteractiveButton>
                  
                  <InteractiveButton
                    variant="secondary"
                    size="xl"
                    ripple={true}
                    magnetic={true}
                    className="group bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Link to="/about" className="flex items-center gap-3">
                      <Award className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                      Learn More About Me
                    </Link>
                  </InteractiveButton>
                </div>
              </GlassMorphism>
            </div>
          </ScrollAnimations>
        </div>
      </div>
    </div>
  );
};

export default Projects;