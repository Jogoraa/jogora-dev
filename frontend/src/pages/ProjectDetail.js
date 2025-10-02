import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, Github, ExternalLink, Calendar, Clock, Rocket, Star, 
  Zap, Code, Award, TrendingUp, Heart, Sparkles, Target, CheckCircle
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { mockData } from "../data/mockData";
import ParticleBackground from "../components/ParticleBackground";
import ScrollAnimations from "../components/ScrollAnimations";
import GlassMorphism from "../components/GlassMorphism";
import InteractiveButton from "../components/InteractiveButton";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = mockData.projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-pink-900 to-purple-900" />
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <GlassMorphism className="text-center p-6 sm:p-12 lg:p-16 rounded-2xl sm:rounded-3xl border-white/10 max-w-2xl mx-4" intensity="medium">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 flex items-center justify-center">
              <Target className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-red-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Project Not Found</h1>
            <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg">The project you're looking for doesn't exist or may have been moved.</p>
            <InteractiveButton
              variant="gradient"
              size="lg"
              ripple={true}
              glow={true}
            >
              <Link to="/projects" className="flex items-center gap-3">
                <ArrowLeft className="h-5 w-5" />
                Back to Projects
                <Rocket className="h-5 w-5" />
              </Link>
            </InteractiveButton>
          </GlassMorphism>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Epic Background */}
      <ParticleBackground />
      
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-pink-900/50" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-80 right-32 w-80 h-80 bg-gradient-to-r from-indigo-500/15 to-blue-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-1/3 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-violet-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          {/* Epic Back Button */}
          <ScrollAnimations animation="fade-in-up" delay={0}>
            <div className="mb-8 sm:mb-12">
              <InteractiveButton
                variant="secondary"
                size="md"
                ripple={true}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Link to="/projects" className="flex items-center gap-2 sm:gap-3">
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">Back to Projects</span>
                </Link>
              </InteractiveButton>
            </div>
          </ScrollAnimations>

          {/* Epic Project Header */}
          <ScrollAnimations animation="fade-in-up" delay={200}>
            <GlassMorphism className="p-4 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border-white/10 mb-12 sm:mb-16" intensity="medium">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6 sm:gap-8">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white animate-pulse" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-2 leading-tight">
                        {project.title}
                      </h1>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-300">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-sm font-medium">{project.status}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">2024</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          <span className="text-sm">{project.featured ? 'Featured' : 'Side Project'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xl text-gray-300 leading-relaxed mb-8 font-light">
                    {project.longDescription || project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Code className="h-5 w-5 text-purple-400" />
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech, index) => (
                        <div 
                          key={tech}
                          className="group/tech relative"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg blur opacity-0 group-hover/tech:opacity-100 transition duration-300" />
                          <span className="relative px-4 py-2 bg-slate-800/80 backdrop-blur-sm border border-white/10 rounded-lg text-gray-300 text-sm font-medium hover:text-white hover:bg-slate-700/80 transition-all duration-300 group-hover/tech:scale-105">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  {project.githubUrl && project.githubUrl !== "#" && (
                    <InteractiveButton
                      variant="secondary"
                      size="lg"
                      ripple={true}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20 group"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                        <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                        View Code
                      </a>
                    </InteractiveButton>
                  )}
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <InteractiveButton
                      variant="gradient"
                      size="lg"
                      ripple={true}
                      glow={true}
                      className="group"
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                        <ExternalLink className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                        Live Demo
                        <Rocket className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                      </a>
                    </InteractiveButton>
                  )}
                </div>
              </div>
            </GlassMorphism>
          </ScrollAnimations>

          {/* Epic Project Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Features */}
              {project.keyFeatures && (
                <ScrollAnimations animation="fade-in-up" delay={400}>
                  <GlassMorphism className="p-8 rounded-3xl border-white/10" intensity="medium">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-white">Key Features</h2>
                    </div>
                    <div className="space-y-4">
                      {project.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-300 leading-relaxed font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </GlassMorphism>
                </ScrollAnimations>
              )}

              {/* Challenges & Solutions */}
              {project.challenges && project.solutions && (
                <ScrollAnimations animation="fade-in-up" delay={600}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassMorphism className="p-8 rounded-3xl border-white/10" intensity="medium">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                          <Target className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Challenges</h3>
                      </div>
                      <div className="space-y-3">
                        {project.challenges.map((challenge, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                            <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300 text-sm leading-relaxed">{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </GlassMorphism>

                    <GlassMorphism className="p-8 rounded-3xl border-white/10" intensity="medium">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Solutions</h3>
                      </div>
                      <div className="space-y-3">
                        {project.solutions.map((solution, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300 text-sm leading-relaxed">{solution}</span>
                          </div>
                        ))}
                      </div>
                    </GlassMorphism>
                  </div>
                </ScrollAnimations>
              )}
            </div>

            {/* Epic Sidebar */}
            <div className="space-y-8">
              <ScrollAnimations animation="fade-in-up" delay={500}>
                <GlassMorphism className="p-6 rounded-3xl border-white/10" intensity="medium">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Project Details</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Status", value: project.status, icon: TrendingUp },
                      { label: "Type", value: project.featured ? 'Featured Project' : 'Side Project', icon: Star },
                      { label: "Technologies", value: `${project.technologies.length} Used`, icon: Code }
                    ].map((detail, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <detail.icon className="h-4 w-4 text-purple-400" />
                        <span className="text-gray-400 text-sm">{detail.label}:</span>
                        <span className="text-white font-medium text-sm">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </GlassMorphism>
              </ScrollAnimations>

              <ScrollAnimations animation="fade-in-up" delay={700}>
                <GlassMorphism className="p-6 rounded-3xl border-white/10" intensity="medium">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <ExternalLink className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Quick Links</h3>
                  </div>
                  <div className="space-y-3">
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
                      >
                        <Github className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">View Source Code</span>
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
                      >
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Live Demo</span>
                      </a>
                    )}
                  </div>
                </GlassMorphism>
              </ScrollAnimations>
            </div>
          </div>

          {/* Epic Related Projects */}
          <ScrollAnimations animation="fade-in-up" delay={800}>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  More Projects
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                Explore other innovative solutions and creative implementations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mockData.projects
                .filter(p => p.id !== project.id && p.featured)
                .slice(0, 2)
                .map((relatedProject, index) => (
                  <div key={relatedProject.id} className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <GlassMorphism className="relative p-8 rounded-3xl border-white/10 group-hover:scale-105 transition-all duration-500" intensity="medium">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-violet-400 transition-colors duration-300">
                          {relatedProject.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 mb-6 leading-relaxed">{relatedProject.description}</p>
                      <InteractiveButton
                        variant="secondary"
                        size="md"
                        ripple={true}
                        className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 group"
                      >
                        <Link to={`/projects/${relatedProject.slug}`} className="flex items-center gap-3 w-full justify-center">
                          <Star className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                          View Project
                          <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </InteractiveButton>
                    </GlassMorphism>
                  </div>
                ))}
            </div>
          </ScrollAnimations>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;