import React from "react";
import { Download, Mail, Phone, MapPin, Calendar, ExternalLink, Github, Linkedin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { mockData } from "../data/mockData";

const Resume = () => {
  const { profile, experience, education, skills, certifications, languages } = mockData;

  const handleDownloadPDF = () => {
    // This will be implemented with backend functionality
    window.print();
  };

  return (
    <div className="min-h-screen py-12 px-6 lg:px-8 bg-white print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Header Actions - Hidden in print */}
        <div className="mb-8 flex justify-between items-center print:hidden">
          <h1 className="text-3xl font-light text-black">Resume</h1>
          <div className="flex gap-3">
            <Button 
              onClick={handleDownloadPDF}
              className="bg-black text-white hover:bg-gray-800"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button 
              onClick={() => window.print()}
              variant="outline"
              className="border-gray-300 hover:border-black"
            >
              Print Resume
            </Button>
          </div>
        </div>

        {/* Resume Content */}
        <div className="bg-white border border-gray-200 print:border-none print:shadow-none shadow-lg">
          {/* Header */}
          <div className="p-8 border-b border-gray-100 print:border-gray-300">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-light text-black mb-2 tracking-tight">{profile.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{profile.title}</p>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">{profile.bio}</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <a href={`mailto:${profile.email}`} className="hover:text-black transition-colors">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <a href={`tel:${profile.phone}`} className="hover:text-black transition-colors">
                  {profile.phone}
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center">
                <Github className="mr-2 h-4 w-4" />
                <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                  GitHub
                </a>
              </div>
              <div className="flex items-center">
                <Linkedin className="mr-2 h-4 w-4" />
                <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="p-8 border-b border-gray-100 print:border-gray-300">
            <h2 className="text-2xl font-light text-black mb-6 pb-2 border-b border-gray-200">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((job) => (
                <div key={job.id} className="print:break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-black">{job.role}</h3>
                      <p className="text-gray-700 font-medium">{job.company}</p>
                    </div>
                    <div className="text-sm text-gray-600 mt-1 sm:mt-0 sm:text-right">
                      <div className="flex items-center sm:justify-end">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>{job.period}</span>
                      </div>
                      <div className="flex items-center sm:justify-end mt-1">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{job.description}</p>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Key Achievements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1 h-1 bg-black rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-gray-100 text-gray-700 text-xs print:border print:border-gray-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="p-8 border-b border-gray-100 print:border-gray-300">
            <h2 className="text-2xl font-light text-black mb-6 pb-2 border-b border-gray-200">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {skills.map((category) => (
                <div key={category.category} className="print:break-inside-avoid">
                  <h3 className="text-lg font-medium text-black mb-3">{category.category}</h3>
                  <div className="space-y-2">
                    {category.items.map((skill) => (
                      <div key={skill} className="text-sm text-gray-600">
                        • {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="p-8 border-b border-gray-100 print:border-gray-300">
            <h2 className="text-2xl font-light text-black mb-6 pb-2 border-b border-gray-200">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="print:break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-black">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-gray-600 mt-1 sm:mt-0 sm:text-right">
                    <div className="flex items-center sm:justify-end">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center sm:justify-end mt-1">
                      <span>GPA: {edu.gpa}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{edu.description}</p>
                
                {edu.achievements && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Academic Achievements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1 h-1 bg-black rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {edu.relevantCourses && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Relevant Coursework:</h4>
                    <div className="flex flex-wrap gap-1">
                      {edu.relevantCourses.map((course) => (
                        <Badge key={course} variant="outline" className="text-xs print:border-gray-400">
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
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Certifications */}
            <div className="print:break-inside-avoid">
              <h2 className="text-xl font-medium text-black mb-4 pb-2 border-b border-gray-200">
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-medium text-black">{cert.name}</h3>
                    <p className="text-xs text-gray-600">{cert.issuer} • {cert.date}</p>
                    <p className="text-xs text-gray-500 font-mono">{cert.credentialId}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="print:break-inside-avoid">
              <h2 className="text-xl font-medium text-black mb-4 pb-2 border-b border-gray-200">
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map((language) => (
                  <div key={language.name} className="flex justify-between items-center">
                    <span className="text-sm text-gray-800">{language.name}</span>
                    <span className="text-xs text-gray-600">{language.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Print Instructions */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 print:hidden">
          <p className="font-medium mb-2">Print Tips:</p>
          <ul className="space-y-1 text-xs">
            <li>• Use "More settings" → "Margins: None" for best layout</li>
            <li>• Enable "Background graphics" to maintain styling</li>
            <li>• Recommended: Letter size, Portrait orientation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Resume;