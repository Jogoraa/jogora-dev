import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Calendar, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { mockData } from "../data/mockData";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = mockData.projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen py-24 px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-black mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
          <Button asChild variant="outline">
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8 -ml-4 hover:bg-gray-50">
          <Link to="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-black mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                {project.longDescription || project.description}
              </p>
            </div>
            <div className="flex items-center gap-3 ml-6">
              {project.githubUrl && project.githubUrl !== "#" && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
              )}
              {project.liveUrl && project.liveUrl !== "#" && (
                <Button asChild size="sm" className="bg-black text-white hover:bg-gray-800">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Project Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Badge variant={project.status === 'Live' ? 'default' : 'secondary'} 
                   className={project.status === 'Live' ? 'bg-green-100 text-green-700' : ''}>
              {project.status}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              2024
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              {project.featured ? 'Featured Project' : 'Side Project'}
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-gray-100 text-gray-700">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Features */}
            {project.keyFeatures && (
              <Card className="bg-white border-gray-200">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-light mb-6 text-black">Key Features</h2>
                  <ul className="space-y-3">
                    {project.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Challenges & Solutions */}
            {project.challenges && project.solutions && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white border-gray-200">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-light mb-4 text-black">Challenges</h3>
                    <ul className="space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 text-sm leading-relaxed">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-light mb-4 text-black">Solutions</h3>
                    <ul className="space-y-3">
                      {project.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 text-sm leading-relaxed">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4 text-black">Project Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <span className="ml-2 font-medium">{project.status}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <span className="ml-2 font-medium">
                      {project.featured ? 'Featured Project' : 'Side Project'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Technologies:</span>
                    <span className="ml-2 font-medium">{project.technologies.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4 text-black">Quick Links</h3>
                <div className="space-y-3">
                  {project.githubUrl && project.githubUrl !== "#" && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-black transition-colors"
                    >
                      <Github className="mr-3 h-4 w-4" />
                      View Source Code
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-black transition-colors"
                    >
                      <ExternalLink className="mr-3 h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-24">
          <h2 className="text-3xl font-light text-black mb-8">More Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockData.projects
              .filter(p => p.id !== project.id && p.featured)
              .slice(0, 2)
              .map((relatedProject) => (
                <Card key={relatedProject.id} className="group hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-light mb-2 text-black group-hover:text-gray-700 transition-colors">
                      {relatedProject.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{relatedProject.description}</p>
                    <Link
                      to={`/projects/${relatedProject.slug}`}
                      className="inline-flex items-center text-black hover:text-gray-700 transition-colors text-sm font-medium"
                    >
                      View Project
                      <ArrowLeft className="ml-2 h-3 w-3 rotate-180" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;