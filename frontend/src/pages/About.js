import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, GraduationCap, Briefcase, Award, Languages } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { mockData } from "../data/mockData";

const About = () => {
  const { profile, experience, education, languages, certifications } = mockData;

  return (
    <div className="min-h-screen py-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-light tracking-tight text-black mb-6">
            About Me
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A passionate full-stack developer with expertise in modern web technologies, 
            system administration, and innovative problem-solving.
          </p>
        </div>

        {/* Bio Section */}
        <div className="mb-24">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-3xl font-light mb-6 text-black">My Story</h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      I'm {profile.name}, a dedicated full-stack developer based in {profile.location}. 
                      My journey in technology began with a fascination for problem-solving and has evolved 
                      into a comprehensive skill set spanning software development, system administration, and cybersecurity.
                    </p>
                    <p>
                      Throughout my career, I've had the opportunity to work on diverse projects, from implementing 
                      enterprise ERP systems in international environments to developing innovative e-commerce platforms 
                      and mobile applications. Each project has strengthened my commitment to delivering high-quality, 
                      scalable solutions that meet real-world needs.
                    </p>
                    <p>
                      When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, 
                      and sharing knowledge with the developer community. I believe in continuous learning and staying 
                      current with the latest industry trends and best practices.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-black">Quick Facts</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <MapPin className="mr-3 h-4 w-4 text-gray-500" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="mr-3 h-4 w-4 text-gray-500" />
                        <span>{profile.title}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-3 h-4 w-4 text-gray-500" />
                        <span>{experience.length}+ Years Experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Experience Timeline */}
        <div className="mb-24">
          <h2 className="text-4xl font-light text-black mb-12 text-center">Professional Experience</h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <Card key={job.id} className="bg-white border-gray-200 hover:shadow-md transition-all duration-200">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-medium text-black mb-1">{job.role}</h3>
                          <p className="text-gray-600 font-medium">{job.company}</p>
                        </div>
                        <Badge variant="outline" className="self-start sm:self-center mt-2 sm:mt-0">
                          {job.type}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">{job.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-800 mb-3">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {job.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-gray-600 text-sm">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 lg:text-right">
                      <div className="flex items-center lg:justify-end mb-2">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{job.period}</span>
                      </div>
                      <div className="flex items-center lg:justify-end">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Education */}
          <div>
            <h2 className="text-3xl font-light text-black mb-8 flex items-center">
              <GraduationCap className="mr-3 h-8 w-8" />
              Education
            </h2>
            {education.map((edu) => (
              <Card key={edu.id} className="bg-white border-gray-200">
                <CardContent className="p-8">
                  <h3 className="text-xl font-medium text-black mb-2">{edu.degree}</h3>
                  <p className="text-gray-600 mb-1">{edu.institution}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{edu.period}</span>
                    <span className="mx-2">•</span>
                    <span>GPA: {edu.gpa}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{edu.description}</p>
                  
                  {edu.achievements && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">Achievements:</h4>
                      <ul className="space-y-1">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-gray-600 text-xs flex items-start">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {edu.relevantCourses && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-2">Relevant Courses:</h4>
                      <div className="flex flex-wrap gap-1">
                        {edu.relevantCourses.slice(0, 4).map((course) => (
                          <Badge key={course} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-3xl font-light text-black mb-8 flex items-center">
              <Award className="mr-3 h-8 w-8" />
              Certifications
            </h2>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <Card key={index} className="bg-white border-gray-200">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-black mb-1">{cert.name}</h3>
                    <p className="text-gray-600 mb-2">{cert.issuer}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{cert.date}</span>
                      <span className="font-mono text-xs">{cert.credentialId}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="mb-24">
          <h2 className="text-3xl font-light text-black mb-8 flex items-center justify-center">
            <Languages className="mr-3 h-8 w-8" />
            Languages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {languages.map((language) => (
              <Card key={language.name} className="bg-white border-gray-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-medium text-black mb-2">{language.name}</h3>
                  <p className="text-gray-600 mb-4">{language.level}</p>
                  <Progress value={language.proficiency} className="w-full h-2" />
                  <p className="text-xs text-gray-500 mt-2">{language.proficiency}% Proficiency</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-4xl font-light text-black mb-6">Ready to Collaborate?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            I'm always excited to work on new projects and tackle challenging problems. 
            Let's discuss how we can work together to bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 transition-all duration-200 hover:scale-105">
              <Link to="/contact">Get In Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gray-300 hover:border-black transition-all duration-200">
              <Link to="/projects">View My Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;