import React from "react";
import { 
  Download, Mail, Phone, MapPin, Calendar, ExternalLink, Github, Linkedin,
  Rocket, Star, Zap, Award, Briefcase, GraduationCap, Languages, 
  Code, Heart, Sparkles, FileText, Globe
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { mockData } from "../data/mockData";
import ParticleBackground from "../components/ParticleBackground";
import ScrollAnimations from "../components/ScrollAnimations";
import GlassMorphism from "../components/GlassMorphism";
import InteractiveButton from "../components/InteractiveButton";

const Resume = () => {
  const { profile, experience, education, skills, certifications, languages } = mockData;

  const handleDownloadPDF = () => {
    // This will be implemented with backend functionality
    window.print();
  };

  return (
    <div className="relative min-h-screen overflow-hidden print:bg-white print:overflow-visible"
         style={{
           '--print-font': '"Inter", "Helvetica Neue", "Arial", sans-serif'
         }}>
      {/* Epic Background - Hidden in print */}
      <div className="print:hidden">
        <ParticleBackground />
        
        {/* Dynamic Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-900 to-pink-900" />
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/50 via-transparent to-purple-900/50" />
          
          {/* Floating Orbs */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-80 right-32 w-80 h-80 bg-gradient-to-r from-pink-500/15 to-purple-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-40 left-1/3 w-64 h-64 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          
          {/* Grid Pattern */}
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
      </div>

      <div className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 print:py-0 print:px-0">
        <div className="max-w-8xl mx-auto print:max-w-full">
          {/* Spectacular Header - Hidden in print */}
          <div className="print:hidden">
            <ScrollAnimations animation="fade-in-up" delay={0}>
              <div className="text-center mb-16 sm:mb-24 lg:mb-32">
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-white/10 text-white text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse" />
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce-subtle" />
                  <span className="hidden sm:inline">Professional Resume</span>
                  <span className="sm:hidden">Resume</span>
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-wiggle" />
                </div>
                
                <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white mb-6 sm:mb-8 leading-none">
                  <span className="bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent animate-gradient bg-300%">
                    MY
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-red-200 via-pink-200 to-white bg-clip-text text-transparent animate-gradient bg-300%" style={{ animationDelay: '1s' }}>
                    RESUME
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light mb-8 sm:mb-12 px-4">
                  A comprehensive overview of my professional journey, skills, and achievements
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <InteractiveButton
                    variant="gradient"
                    size="xl"
                    ripple={true}
                    glow={true}
                    magnetic={true}
                    className="group"
                    onClick={handleDownloadPDF}
                  >
                    <div className="flex items-center gap-3">
                      <Download className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                      Download PDF
                      <Rocket className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                  </InteractiveButton>
                  
                  <InteractiveButton
                    variant="secondary"
                    size="xl"
                    ripple={true}
                    magnetic={true}
                    className="group bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => window.print()}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                      Print Resume
                    </div>
                  </InteractiveButton>
                </div>
              </div>
            </ScrollAnimations>
          </div>

          {/* Epic Resume Content */}
          <ScrollAnimations animation="fade-in-up" delay={400}>
            <div className="print:hidden mb-16">
              <GlassMorphism className="max-w-6xl mx-auto p-12 rounded-3xl border-white/10" intensity="medium">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                       Resume
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                    A comprehensive overview optimized for both digital viewing and professional printing
                  </p>
                </div>
              </GlassMorphism>
            </div>
          </ScrollAnimations>

          {/* Print-Optimized Resume */}
          <div className="bg-white print:bg-white border border-gray-200 print:border-none print:shadow-none shadow-2xl print:shadow-none rounded-2xl print:rounded-none overflow-hidden print:overflow-visible max-w-5xl mx-auto print:max-w-none print:font-sans"
               style={{ 
                 fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
                 fontSize: '10pt',
                 lineHeight: '1.5',
                 color: '#1f2937'
               }}>
          {/* Header */}
          <div className="print:p-6 p-8 border-b border-gray-100 print:border-gray-400 print:mb-0">
            <div className="text-center mb-6 print:mb-4">
              <h1 className="text-4xl print:text-3xl font-semibold text-gray-900 mb-2 tracking-tight print:tracking-normal print:mb-1">{profile.name}</h1>
              <p className="text-xl print:text-lg text-gray-700 mb-4 print:mb-2 font-medium">{profile.title}</p>
              <p className="text-gray-600 print:text-sm max-w-2xl mx-auto leading-relaxed print:leading-normal">{profile.bio}</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 print:gap-4 text-sm print:text-xs text-gray-600 print:justify-center">
              <div className="flex items-center print:text-xs">
                <Mail className="mr-2 h-4 w-4 print:h-3 print:w-3 print:mr-1" />
                <a href={`mailto:${profile.email}`} className="hover:text-black transition-colors print:no-underline">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center print:text-xs">
                <Phone className="mr-2 h-4 w-4 print:h-3 print:w-3 print:mr-1" />
                <a href={`tel:${profile.phone}`} className="hover:text-black transition-colors print:no-underline">
                  {profile.phone}
                </a>
              </div>
              <div className="flex items-center print:text-xs">
                <MapPin className="mr-2 h-4 w-4 print:h-3 print:w-3 print:mr-1" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center print:text-xs">
                <Github className="mr-2 h-4 w-4 print:h-3 print:w-3 print:mr-1" />
                <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors print:no-underline">
                  GitHub
                </a>
              </div>
              <div className="flex items-center print:text-xs">
                <Linkedin className="mr-2 h-4 w-4 print:h-3 print:w-3 print:mr-1" />
                <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors print:no-underline">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="p-8 print:p-6 border-b border-gray-100 print:border-gray-400 print:mb-0">
            <h2 className="text-2xl print:text-xl font-semibold text-gray-900 mb-6 print:mb-4 pb-2 print:pb-1 border-b border-gray-300 print:border-gray-500">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((job) => (
                <div key={job.id} className="print:break-inside-avoid mb-6 print:mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 print:mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg print:text-base font-semibold text-gray-900 print:mb-0">{job.role}</h3>
                      <p className="text-gray-700 print:text-sm font-medium">{job.company}</p>
                    </div>
                    <div className="text-sm print:text-xs text-gray-600 mt-1 sm:mt-0 sm:text-right print:text-right">
                      <div className="flex items-center sm:justify-end print:justify-end">
                        <Calendar className="mr-1 h-3 w-3 print:h-2 print:w-2" />
                        <span className="font-medium">{job.period}</span>
                      </div>
                      <div className="flex items-center sm:justify-end print:justify-end mt-1">
                        <MapPin className="mr-1 h-3 w-3 print:h-2 print:w-2" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 print:text-gray-700 text-sm print:text-xs mb-3 print:mb-2 leading-relaxed print:leading-normal">{job.description}</p>
                  
                  <div className="mb-3 print:mb-2">
                    <h4 className="text-sm print:text-xs font-semibold text-gray-800 mb-2 print:mb-1">Key Achievements:</h4>
                    <ul className="text-sm print:text-xs text-gray-600 print:text-gray-700 space-y-1 print:space-y-0">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start print:leading-tight">
                          <span className="w-1.5 h-1.5 print:w-1 print:h-1 bg-gray-800 rounded-full mt-2 print:mt-1.5 mr-3 print:mr-2 flex-shrink-0"></span>
                          <span className="flex-1">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 print:gap-0.5">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-gray-100 print:bg-gray-50 text-gray-700 print:text-gray-800 text-xs print:text-2xs print:px-2 print:py-0.5 print:border print:border-gray-400 print:rounded-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="p-8 print:p-6 border-b border-gray-100 print:border-gray-400 print:mb-0 print:break-before-page">
            <h2 className="text-2xl print:text-xl font-semibold text-gray-900 mb-6 print:mb-4 pb-2 print:pb-1 border-b border-gray-300 print:border-gray-500">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 print:grid-cols-3 gap-6 print:gap-4">
              {skills.map((category) => (
                <div key={category.category} className="print:break-inside-avoid">
                  <h3 className="text-lg print:text-base font-semibold text-gray-900 mb-3 print:mb-2">{category.category}</h3>
                  <div className="space-y-2 print:space-y-1">
                    {category.items.map((skill) => (
                      <div key={skill} className="text-sm print:text-xs text-gray-600 print:text-gray-700 flex items-start">
                        <span className="w-1.5 h-1.5 print:w-1 print:h-1 bg-gray-600 rounded-full mt-2 print:mt-1.5 mr-3 print:mr-2 flex-shrink-0"></span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="p-8 print:p-6 border-b border-gray-100 print:border-gray-400 print:mb-0">
            <h2 className="text-2xl print:text-xl font-semibold text-gray-900 mb-6 print:mb-4 pb-2 print:pb-1 border-b border-gray-300 print:border-gray-500">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="print:break-inside-avoid mb-6 print:mb-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 print:mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg print:text-base font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700 print:text-sm font-medium">{edu.institution}</p>
                  </div>
                  <div className="text-sm print:text-xs text-gray-600 mt-1 sm:mt-0 sm:text-right print:text-right">
                    <div className="flex items-center sm:justify-end print:justify-end">
                      <Calendar className="mr-1 h-3 w-3 print:h-2 print:w-2" />
                      <span className="font-medium">{edu.period}</span>
                    </div>
                    <div className="flex items-center sm:justify-end print:justify-end mt-1">
                      <span className="font-medium">GPA: {edu.gpa}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 print:text-gray-700 text-sm print:text-xs mb-3 print:mb-2 leading-relaxed print:leading-normal">{edu.description}</p>
                
                {edu.achievements && (
                  <div className="mb-3 print:mb-2">
                    <h4 className="text-sm print:text-xs font-semibold text-gray-800 mb-2 print:mb-1">Academic Achievements:</h4>
                    <ul className="text-sm print:text-xs text-gray-600 print:text-gray-700 space-y-1 print:space-y-0">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start print:leading-tight">
                          <span className="w-1.5 h-1.5 print:w-1 print:h-1 bg-gray-800 rounded-full mt-2 print:mt-1.5 mr-3 print:mr-2 flex-shrink-0"></span>
                          <span className="flex-1">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {edu.relevantCourses && (
                  <div>
                    <h4 className="text-sm print:text-xs font-semibold text-gray-800 mb-2 print:mb-1">Relevant Coursework:</h4>
                    <div className="flex flex-wrap gap-1 print:gap-0.5">
                      {edu.relevantCourses.map((course) => (
                        <Badge key={course} variant="outline" className="text-xs print:text-2xs print:px-2 print:py-0.5 print:border-gray-400 print:rounded-sm">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Certifications & Languages */}
          <div className="p-8 print:p-6 grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-8 print:gap-6">
            {/* Certifications */}
            <div className="print:break-inside-avoid">
              <h2 className="text-xl print:text-lg font-semibold text-gray-900 mb-4 print:mb-3 pb-2 print:pb-1 border-b border-gray-300 print:border-gray-500">
                Certifications
              </h2>
              <div className="space-y-3 print:space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="text-sm print:text-xs font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-xs print:text-2xs text-gray-600 print:text-gray-700">{cert.issuer} • {cert.date}</p>
                    <p className="text-xs print:text-2xs text-gray-500 print:text-gray-600 font-mono print:font-sans">{cert.credentialId}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="print:break-inside-avoid">
              <h2 className="text-xl print:text-lg font-semibold text-gray-900 mb-4 print:mb-3 pb-2 print:pb-1 border-b border-gray-300 print:border-gray-500">
                Languages
              </h2>
              <div className="space-y-2 print:space-y-1">
                {languages.map((language) => (
                  <div key={language.name} className="flex justify-between items-center">
                    <span className="text-sm print:text-xs text-gray-800 print:text-gray-900 font-medium">{language.name}</span>
                    <span className="text-xs print:text-2xs text-gray-600 print:text-gray-700 font-medium">{language.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

          {/* Epic Print Instructions - Hidden in print */}
          <div className="print:hidden">
            <ScrollAnimations animation="fade-in-up" delay={800}>
              <GlassMorphism className="mt-16 p-8 rounded-3xl border-white/10 max-w-2xl mx-auto" intensity="medium">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Print Tips</h3>
                </div>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <Star className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                    <span>Use "More settings" → "Margins: None" for best layout</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                    <span>Enable "Background graphics" to maintain styling</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                    <span>Recommended: Letter size, Portrait orientation</span>
                  </div>
                </div>
              </GlassMorphism>
            </ScrollAnimations>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;