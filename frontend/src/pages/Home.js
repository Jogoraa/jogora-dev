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
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl lg:text-8xl font-light tracking-tight text-black mb-6 leading-tight">
              {profile.name}
            </h1>
            <p className="text-xl lg:text-2xl font-light text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {profile.title}
            </p>
            <p className="text-lg text-gray-500 max-w-4xl mx-auto leading-relaxed mb-12">
              {profile.bio}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 transition-all duration-200 hover:scale-105">
              <Link to="/projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gray-300 hover:border-black transition-all duration-200 hover:scale-105">
              <Link to="/contact">
                Get In Touch
              </Link>
            </Button>
          </div>

          {/* Tech Stack Icons */}
          <div className="flex items-center justify-center gap-8 opacity-60">
            <Code className="h-8 w-8" />
            <Database className="h-8 w-8" />
            <Server className="h-8 w-8" />
            <Globe className="h-8 w-8" />
          </div>
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