import React from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, MapPin, GraduationCap, Briefcase, Award, Languages,
  Rocket, Star, Zap, Code, Heart, TrendingUp, Sparkles, User,
  ArrowRight, Globe, Coffee, Target, BookOpen
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { mockData } from "../data/mockData";
import ParticleBackground from "../components/ParticleBackground";
import ScrollAnimations from "../components/ScrollAnimations";
import GlassMorphism from "../components/GlassMorphism";
import InteractiveButton from "../components/InteractiveButton";

const About = () => {
  const { profile, experience, education, languages, certifications } = mockData;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Epic Background */}
      <ParticleBackground />
      
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-cyan-900/50" />
        
        {/* Floating Orbs */}
        <div className="absolute top-32 left-32 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-96 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-32 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        
        {/* Mesh Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>

      <div className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          {/* Spectacular Header */}
          <ScrollAnimations animation="fade-in-up" delay={0}>
            <div className="text-center mb-16 sm:mb-24 lg:mb-32">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 text-white text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
                <User className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce-subtle" />
                <span className="hidden sm:inline">Personal Story</span>
                <span className="sm:hidden">About</span>
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-wiggle" />
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white mb-6 sm:mb-8 leading-none">
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-gradient bg-300%">
                  ABOUT
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent animate-gradient bg-300%" style={{ animationDelay: '1s' }}>
                  ME
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light px-4">
                A passionate innovator crafting digital experiences that push the boundaries of what's possible
              </p>
            </div>
          </ScrollAnimations>

          {/* Epic Bio Section */}
          <ScrollAnimations animation="fade-in-up" delay={200}>
            <div className="mb-16 sm:mb-24 lg:mb-32 px-4">
              <GlassMorphism className="max-w-6xl mx-auto p-4 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border-white/10" intensity="medium">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Heart className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white animate-heartbeat" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">My Story</h2>
                    </div>
                    
                    <div className="space-y-4 sm:space-y-6 text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg font-light">
                      <p>
                        I'm <span className="text-blue-400 font-semibold">{profile.name}</span>, a dedicated full-stack developer based in <span className="text-purple-400 font-semibold">{profile.location}</span>. 
                        My journey in technology began with a fascination for problem-solving and has evolved 
                        into a comprehensive skill set spanning software development, system administration, and cybersecurity.
                      </p>
                      <p>
                        Throughout my career, I've had the opportunity to work on diverse projects, from implementing 
                        enterprise ERP systems in international environments to developing innovative e-commerce platforms 
                        and mobile applications. Each project has strengthened my commitment to delivering <span className="text-cyan-400 font-semibold">high-quality, 
                        scalable solutions</span> that meet real-world needs.
                      </p>
                      <p>
                        When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, 
                        and sharing knowledge with the developer community. I believe in <span className="text-pink-400 font-semibold">continuous learning</span> and staying 
                        current with the latest industry trends and best practices.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                        <Target className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                        Quick Facts
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        {[
                          { icon: MapPin, label: "Location", value: profile.location, color: "text-blue-400" },
                          { icon: Briefcase, label: "Role", value: profile.title, color: "text-purple-400" },
                          { icon: Calendar, label: "Experience", value: `${experience.length}+ Years`, color: "text-cyan-400" },
                          { icon: Coffee, label: "Coffee Consumed", value: "1000+ Cups", color: "text-orange-400" }
                        ].map((fact, index) => (
                          <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center flex-shrink-0`}>
                              <fact.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${fact.color}`} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-gray-400 text-xs sm:text-sm font-medium">{fact.label}</div>
                              <div className="text-white font-semibold text-sm sm:text-base">{fact.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassMorphism>
            </div>
          </ScrollAnimations>

          {/* Epic Experience Timeline */}
          <ScrollAnimations animation="fade-in-up" delay={400}>
            <div className="mb-16 sm:mb-24 lg:mb-32 px-4">
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Professional Journey
                  </span>
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light px-4">
                  {experience.length}+ years of delivering exceptional results and innovative solutions
                </p>
              </div>

              <div className="space-y-8 sm:space-y-12">
                {experience.map((job, index) => (
                  <ScrollAnimations 
                    key={job.id}
                    animation="fade-in-up"
                    delay={index * 200}
                  >
                    <GlassMorphism className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border-white/10 group hover:scale-105 transition-all duration-700" intensity="medium">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
                        <div className="lg:col-span-3">
                          <div className="flex items-start gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                              <Briefcase className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4">
                                <div className="min-w-0 flex-1">
                                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors duration-300 leading-tight">{job.role}</h3>
                                  <p className="text-gray-300 font-semibold text-base sm:text-lg">{job.company}</p>
                                </div>
                                <div className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 mt-2 sm:mt-0 self-start">
                                  <span className="text-white text-xs sm:text-sm font-medium">{job.type}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg font-light">{job.description}</p>
                          
                          <div className="mb-6 sm:mb-8">
                            <h4 className="text-white font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                              Key Achievements
                            </h4>
                            <div className="space-y-2 sm:space-y-3">
                              {job.achievements.map((achievement, idx) => (
                                <div key={idx} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                                  <span className="text-gray-300 font-medium text-sm sm:text-base">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                              <Code className="h-5 w-5 text-green-400" />
                              Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {job.technologies.map((tech, techIndex) => (
                                <div 
                                  key={tech}
                                  className="group/tech relative"
                                  style={{ animationDelay: `${techIndex * 100}ms` }}
                                >
                                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover/tech:opacity-100 transition duration-300" />
                                  <span className="relative px-4 py-2 bg-slate-800/80 backdrop-blur-sm border border-white/10 rounded-lg text-gray-300 text-sm font-medium hover:text-white hover:bg-slate-700/80 transition-all duration-300 group-hover/tech:scale-105">
                                    {tech}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-3 mb-2">
                              <Calendar className="h-5 w-5 text-blue-400" />
                              <span className="text-white font-semibold">Duration</span>
                            </div>
                            <span className="text-gray-300">{job.period}</span>
                          </div>
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-3 mb-2">
                              <MapPin className="h-5 w-5 text-purple-400" />
                              <span className="text-white font-semibold">Location</span>
                            </div>
                            <span className="text-gray-300">{job.location}</span>
                          </div>
                        </div>
                      </div>
                    </GlassMorphism>
                  </ScrollAnimations>
                ))}
              </div>
            </div>
          </ScrollAnimations>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            {/* Education */}
            <ScrollAnimations animation="fade-in-up" delay={600}>
              <div>
                <h2 className="text-4xl font-bold text-white mb-12 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <GlassMorphism key={edu.id} className="p-8 rounded-3xl border-white/10 hover:scale-105 transition-all duration-500" intensity="medium">
                      <h3 className="text-2xl font-bold text-white mb-3">{edu.degree}</h3>
                      <p className="text-blue-400 font-semibold mb-2">{edu.institution}</p>
                      <div className="flex items-center gap-4 text-gray-400 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{edu.period}</span>
                        </div>
                        <span>•</span>
                        <span>GPA: {edu.gpa}</span>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed mb-6">{edu.description}</p>
                      
                      {edu.achievements && (
                        <div className="mb-6">
                          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <Award className="h-4 w-4 text-yellow-400" />
                            Achievements
                          </h4>
                          <div className="space-y-2">
                            {edu.achievements.map((achievement, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-2 rounded-lg bg-white/5">
                                <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {edu.relevantCourses && (
                        <div>
                          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-purple-400" />
                            Relevant Courses
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.relevantCourses.slice(0, 4).map((course) => (
                              <span key={course} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 text-xs font-medium">
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </GlassMorphism>
                  ))}
                </div>
              </div>
            </ScrollAnimations>

            {/* Certifications */}
            <ScrollAnimations animation="fade-in-up" delay={800}>
              <div>
                <h2 className="text-4xl font-bold text-white mb-12 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  Certifications
                </h2>
                <div className="space-y-6">
                  {certifications.map((cert, index) => (
                    <GlassMorphism key={index} className="p-6 rounded-2xl border-white/10 hover:scale-105 transition-all duration-500" intensity="light">
                      <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                      <p className="text-purple-400 font-semibold mb-4">{cert.issuer}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">{cert.date}</span>
                        <span className="font-mono text-xs text-gray-500 bg-white/10 px-3 py-1 rounded-full">{cert.credentialId}</span>
                      </div>
                    </GlassMorphism>
                  ))}
                </div>
              </div>
            </ScrollAnimations>
          </div>

          {/* Languages */}
          <ScrollAnimations animation="fade-in-up" delay={1000}>
            <div className="mb-32">
              <h2 className="text-5xl font-bold text-white mb-12 text-center flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Languages className="h-8 w-8 text-white" />
                </div>
                Languages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {languages.map((language, index) => (
                  <GlassMorphism key={language.name} className="p-8 rounded-2xl border-white/10 text-center hover:scale-105 transition-all duration-500" intensity="medium">
                    <h3 className="text-2xl font-bold text-white mb-3">{language.name}</h3>
                    <p className="text-cyan-400 font-semibold mb-6">{language.level}</p>
                    <div className="relative">
                      <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
                          style={{ width: `${language.proficiency}%` }}
                        />
                      </div>
                      <p className="text-white font-semibold mt-3">{language.proficiency}% Proficiency</p>
                    </div>
                  </GlassMorphism>
                ))}
              </div>
            </div>
          </ScrollAnimations>

          {/* Epic CTA Section */}
          <ScrollAnimations animation="fade-in-up" delay={1200}>
            <div className="text-center">
              <GlassMorphism className="max-w-4xl mx-auto p-16 rounded-3xl border-white/10" intensity="medium">
                <div className="mb-8">
                  <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Ready to Collaborate?
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                    I'm always excited to work on new projects and tackle challenging problems. Let's discuss how we can work together to bring your ideas to life.
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
                      Get In Touch
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
                    <Link to="/projects" className="flex items-center gap-3">
                      <Star className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                      View My Work
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

export default About;