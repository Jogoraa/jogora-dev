import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { mockData } from "../data/mockData";

const Contact = () => {
  const { profile } = mockData;
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen py-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-light tracking-tight text-black mb-6">
            Let's Connect
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I'm always interested in new opportunities, collaborations, and meaningful conversations. 
            Whether you have a project in mind or just want to say hello, I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-8">
                <h2 className="text-2xl font-light mb-6 text-black">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="mr-4 h-5 w-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-gray-800 font-medium">Email</p>
                      <a 
                        href={`mailto:${profile.email}`}
                        className="text-gray-600 hover:text-black transition-colors"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="mr-4 h-5 w-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-gray-800 font-medium">Phone</p>
                      <a 
                        href={`tel:${profile.phone}`}
                        className="text-gray-600 hover:text-black transition-colors"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="mr-4 h-5 w-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-gray-800 font-medium">Location</p>
                      <p className="text-gray-600">{profile.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-light mb-6 text-black">Follow Me</h3>
                <div className="space-y-4">
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-black transition-colors group"
                  >
                    <Github className="mr-4 h-5 w-5" />
                    <span className="font-medium">GitHub</span>
                    <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-black transition-colors group"
                  >
                    <Linkedin className="mr-4 h-5 w-5" />
                    <span className="font-medium">LinkedIn</span>
                    <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border-gray-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-light mb-6 text-black">Quick Actions</h3>
                <div className="space-y-4">
                  <Button asChild variant="outline" className="w-full justify-start border-gray-300 hover:border-black">
                    <Link to="/resume">
                      <CheckCircle className="mr-3 h-4 w-4" />
                      Download Resume
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full justify-start border-gray-300 hover:border-black">
                    <Link to="/projects">
                      <ExternalLink className="mr-3 h-4 w-4" />
                      View Portfolio
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-gray-300 hover:border-black"
                    onClick={() => window.open(`mailto:${profile.email}?subject=Quick%20Chat%20Request`)}
                  >
                    <Mail className="mr-3 h-4 w-4" />
                    Schedule a Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-white border-gray-200">
              <CardContent className="p-8">
                <h2 className="text-2xl font-light mb-6 text-black">Send a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 border-gray-300 focus:border-black"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-gray-700">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 border-gray-300 focus:border-black"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-gray-700">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-1 border-gray-300 focus:border-black"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-gray-700">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="mt-1 border-gray-300 focus:border-black"
                      placeholder="Tell me about your project, idea, or just say hello..."
                      rows={6}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-black text-white hover:bg-gray-800 transition-all duration-200 hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Response Time:</strong> I typically respond to messages within 24 hours. 
                    For urgent matters, feel free to call me directly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-light text-black mb-6">
            Ready to Start Something Great?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether it's a complex web application, mobile app, or system integration project, 
            I'm here to help turn your vision into reality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-black text-white hover:bg-gray-800 transition-all duration-200 hover:scale-105"
              onClick={() => window.open(`mailto:${profile.email}?subject=Project%20Inquiry`)}
            >
              Start a Project
              <Mail className="ml-2 h-4 w-4" />
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

export default Contact;