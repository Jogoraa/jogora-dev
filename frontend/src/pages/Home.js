import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Database, Server, Globe, Star, Zap, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { mockData } from "../data/mockData";
import AnimatedContainer from "../components/AnimatedContainer";

const Home = () => {
  const { profile, featuredProjects, skills, experience } = mockData;

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 pointer-events-none" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedContainer animation="fade-in-down" className="mb-8">
            <h1 className="text-6xl lg:text-8xl font-light tracking-tight text-black mb-6 leading-tight font-roboto">
              <span className="inline-block hover:scale-105 transition-transform duration-300">
                {profile.name}
              </span>
            </h1>
          </AnimatedContainer>
          
          <AnimatedContainer animation="fade-in-up" delay={200} className="mb-8">
            <p className="text-xl lg:text-2xl font-light text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-roboto">
              {profile.title}
            </p>
          </AnimatedContainer>
          
          <AnimatedContainer animation="fade-in-up" delay={400} className="mb-12">
            <p className="text-lg text-gray-500 max-w-4xl mx-auto leading-relaxed font-roboto">
              {profile.bio}
            </p>
          </AnimatedContainer>

          <AnimatedContainer animation="scale-in" delay={600} className="mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-black text-white hover:bg-gray-800 transition-all duration-400 hover:scale-105 hover:shadow-modern-hover group font-roboto"
              >
                <Link to="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-gray-300 hover:border-black transition-all duration-400 hover:scale-105 hover:shadow-modern group font-roboto"
              >
                <Link to="/contact">
                  Get In Touch
                  <Heart className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </AnimatedContainer>

          {/* Tech Stack Icons */}
          <AnimatedContainer animation="fade-in" delay={800}>
            <div className="flex items-center justify-center gap-8 opacity-60">
              {[
                { icon: Code, delay: 0 },
                { icon: Database, delay: 100 },
                { icon: Server, delay: 200 },
                { icon: Globe, delay: 300 }
              ].map(({ icon: Icon, delay }, index) => (
                <div 
                  key={index}
                  className="hover:scale-110 hover:opacity-100 transition-all duration-400 animate-pulse-subtle"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  <Icon className="h-8 w-8" />
                </div>
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-r from-gray-50/80 via-white to-gray-50/80 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-6xl mx-auto relative">
          <AnimatedContainer animation="fade-in-up" className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-black mb-6 font-roboto">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-roboto">
              A selection of recent work showcasing full-stack development, system administration, and innovative solutions.
            </p>
          </AnimatedContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <AnimatedContainer 
                key={project.id}
                animation="fade-in-up"
                delay={index * 200}
              >
                <Card className="group hover:shadow-modern-hover transition-all duration-600 hover:-translate-y-3 bg-white/80 backdrop-blur-sm border-gray-200/50 hover:border-gray-300/80 h-full">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="mb-6 flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-light text-black group-hover:text-gray-700 transition-colors font-roboto">
                          {project.title}
                        </h3>
                        <Zap className="h-5 w-5 text-gray-400 group-hover:text-yellow-500 transition-colors duration-300" />
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4 font-roboto">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge 
                            key={tech} 
                            variant="secondary" 
                            className="bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 transition-colors duration-300 font-roboto"
                            style={{ animationDelay: `${techIndex * 50}ms` }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center text-black hover:text-gray-700 transition-all duration-300 font-medium group-hover:translate-x-1 font-roboto"
                    >
                      View Project
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
          </div>

          <AnimatedContainer animation="scale-in" delay={600} className="text-center mt-12">
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-gray-300 hover:border-black transition-all duration-400 hover:scale-105 hover:shadow-modern font-roboto"
            >
              <Link to="/projects">
                View All Projects
                <Star className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedContainer>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-24 px-6 lg:px-8 relative">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="max-w-6xl mx-auto">
          <AnimatedContainer animation="fade-in-up" className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-black mb-6 font-roboto">
              Technical Skills
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-roboto">
              Full-stack expertise spanning modern web technologies, cloud platforms, and system administration.
            </p>
          </AnimatedContainer>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((category, index) => (
              <AnimatedContainer 
                key={category.category}
                animation="slide-in-left"
                delay={index * 200}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 hover:shadow-modern transition-all duration-600 hover:-translate-y-2 hover:border-gray-300/80 group h-full">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-medium mb-6 text-black group-hover:text-gray-700 transition-colors font-roboto">
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {category.items.map((skill, skillIndex) => (
                        <div 
                          key={skill} 
                          className="text-gray-600 hover:text-black transition-colors duration-300 font-roboto transform hover:translate-x-1"
                          style={{ animationDelay: `${skillIndex * 50}ms` }}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Preview */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-r from-gray-50/80 via-white to-gray-50/80 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-6xl mx-auto relative">
          <AnimatedContainer animation="fade-in-up" className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-black mb-6 font-roboto">
              Professional Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-roboto">
              {experience.length}+ years of hands-on experience in software development and system administration.
            </p>
          </AnimatedContainer>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {experience.slice(0, 2).map((job, index) => (
              <AnimatedContainer 
                key={job.id}
                animation="fade-in-up"
                delay={index * 200}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 hover:shadow-modern transition-all duration-600 hover:-translate-y-2 group h-full">
                  <CardContent className="p-8">
                    <div className="mb-4">
                      <h3 className="text-xl font-medium text-black mb-2 group-hover:text-gray-700 transition-colors font-roboto">
                        {job.role}
                      </h3>
                      <p className="text-gray-600 mb-1 font-roboto">{job.company}</p>
                      <p className="text-sm text-gray-500 font-roboto">{job.period}</p>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4 font-roboto">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.achievements.slice(0, 2).map((achievement, achIndex) => (
                        <Badge 
                          key={achIndex} 
                          variant="outline" 
                          className="text-xs border-gray-300 hover:border-black transition-colors duration-300 font-roboto"
                        >
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
          </div>

          <AnimatedContainer animation="scale-in" delay={400} className="text-center mt-12">
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-gray-300 hover:border-black transition-all duration-400 hover:scale-105 hover:shadow-modern font-roboto"
            >
              <Link to="/about">
                View Full Experience
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <AnimatedContainer animation="fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-black mb-6 font-roboto">
              Let's Work Together
            </h2>
          </AnimatedContainer>
          
          <AnimatedContainer animation="fade-in-up" delay={200} className="mb-12">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-roboto">
              I'm currently available for freelance projects and full-time opportunities. Let's discuss how I can help bring your ideas to life.
            </p>
          </AnimatedContainer>
          
          <AnimatedContainer animation="scale-in" delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-black text-white hover:bg-gray-800 transition-all duration-400 hover:scale-105 hover:shadow-modern-hover group font-roboto"
              >
                <Link to="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-gray-300 hover:border-black transition-all duration-400 hover:scale-105 hover:shadow-modern group font-roboto"
              >
                <a href="/resume" target="_blank">
                  Download Resume
                  <Star className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                </a>
              </Button>
            </div>
          </AnimatedContainer>
        </div>
      </section>
    </div>
  );
};

export default Home;