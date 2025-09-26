import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Github, ExternalLink, Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { mockData } from "../data/mockData";

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
    <div className="min-h-screen py-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-light tracking-tight text-black mb-6">
            Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive showcase of full-stack applications, system implementations, 
            and innovative solutions built with modern technologies.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600 font-medium">Filter by technology:</span>
          </div>
          <Select value={selectedFilter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-64 border-gray-300">
              <SelectValue placeholder="All technologies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Technologies</SelectItem>
              {allTechnologies.map((tech) => (
                <SelectItem key={tech} value={tech}>
                  {tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Projects Stats */}
        <div className="mb-16 text-center">
          <p className="text-gray-500">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-gray-200"
            >
              <CardContent className="p-8">
                {/* Project Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-light text-black group-hover:text-gray-700 transition-colors">
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-black transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-black transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Key Features */}
                  {project.keyFeatures && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">Key Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {project.keyFeatures.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Project Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center text-black hover:text-gray-700 transition-colors font-medium"
                  >
                    View Case Study
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <div className="flex items-center gap-3">
                    {project.status && (
                      <Badge 
                        variant={project.status === 'Live' ? 'default' : 'secondary'}
                        className={project.status === 'Live' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {project.status}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">No projects found for the selected technology.</p>
            <Button
              variant="outline"
              onClick={() => handleFilterChange("all")}
              className="border-gray-300 hover:border-black"
            >
              Show All Projects
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-light text-black mb-6">
            Interested in working together?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            I'm always excited to take on new challenges and build innovative solutions. 
            Let's discuss your next project.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 transition-all duration-200 hover:scale-105">
              <Link to="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gray-300 hover:border-black transition-all duration-200">
              <Link to="/about">
                Learn More About Me
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;