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
      <section className="py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-black mb-6">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A selection of recent work showcasing full-stack development, system administration, and innovative solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white border-gray-200">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-light mb-3 text-black group-hover:text-gray-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center text-black hover:text-gray-700 transition-colors font-medium"
                  >
                    View Project
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-gray-300 hover:border-black transition-all duration-200">
              <Link to="/projects">
                View All Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-black mb-6">
              Technical Skills
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Full-stack expertise spanning modern web technologies, cloud platforms, and system administration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((category) => (
              <Card key={category.category} className="bg-white border-gray-200 hover:shadow-md transition-all duration-200">
                <CardContent className="p-8">
                  <h3 className="text-xl font-medium mb-6 text-black">{category.category}</h3>
                  <div className="space-y-3">
                    {category.items.map((skill) => (
                      <div key={skill} className="text-gray-600">
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Preview */}
      <section className="py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-black mb-6">
              Professional Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {experience.length}+ years of hands-on experience in software development and system administration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {experience.slice(0, 2).map((job) => (
              <Card key={job.id} className="bg-white border-gray-200">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <h3 className="text-xl font-medium text-black mb-2">{job.role}</h3>
                    <p className="text-gray-600 mb-1">{job.company}</p>
                    <p className="text-sm text-gray-500">{job.period}</p>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.achievements.slice(0, 2).map((achievement, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-300">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-gray-300 hover:border-black transition-all duration-200">
              <Link to="/about">
                View Full Experience
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-black mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm currently available for freelance projects and full-time opportunities. Let's discuss how I can help bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 transition-all duration-200 hover:scale-105">
              <Link to="/contact">
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gray-300 hover:border-black transition-all duration-200">
              <a href="/resume" target="_blank">
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;