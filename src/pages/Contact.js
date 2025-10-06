import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, CheckCircle,
  Rocket, Star, Zap, Heart, Sparkles, MessageCircle, Clock, Globe
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { mockData } from "../data/mockData";
import ParticleBackground from "../components/ParticleBackground";
import ScrollAnimations from "../components/ScrollAnimations";
import GlassMorphism from "../components/GlassMorphism";
import InteractiveButton from "../components/InteractiveButton";

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
    <div className="relative min-h-screen overflow-hidden">
      {/* Epic Background */}
      <ParticleBackground />
      
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-green-900/50" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-80 right-32 w-80 h-80 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-1/3 w-64 h-64 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          {/* Spectacular Header */}
          <ScrollAnimations animation="fade-in-up" delay={0}>
            <div className="text-center mb-16 sm:mb-24 lg:mb-32">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-white/10 text-white text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse" />
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce-subtle" />
                <span className="hidden sm:inline">Let's Connect</span>
                <span className="sm:hidden">Contact</span>
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-wiggle" />
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white mb-6 sm:mb-8 leading-none">
                <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent animate-gradient bg-300%">
                  GET IN
                </span>
                <br />
                <span className="bg-gradient-to-r from-teal-200 via-cyan-200 to-white bg-clip-text text-transparent animate-gradient bg-300%" style={{ animationDelay: '1s' }}>
                  TOUCH
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light px-4">
                Ready to collaborate on something amazing? Let's turn your vision into reality together
              </p>
            </div>
          </ScrollAnimations>

          {/* Epic Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-16 sm:mb-24 lg:mb-32 px-4">
            {/* Contact Information */}
            <ScrollAnimations animation="fade-in-up" delay={200}>
              <div className="space-y-6 sm:space-y-8">
                {/* Main Contact Card */}
                <GlassMorphism className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border-white/10 hover:scale-105 transition-all duration-500" intensity="medium">
                  <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white animate-pulse" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Contact Info</h2>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                    {[
                      { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, color: "text-emerald-400" },
                      { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, color: "text-teal-400" },
                      { icon: MapPin, label: "Location", value: profile.location, color: "text-cyan-400" },
                      { icon: Clock, label: "Response Time", value: "< 24 Hours", color: "text-blue-400" }
                    ].map((contact, index) => (
                      <div key={index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300 group">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <contact.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${contact.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-400 text-xs sm:text-sm font-medium mb-1">{contact.label}</div>
                          {contact.href ? (
                            <a href={contact.href} className="text-white font-semibold hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base break-all">
                              {contact.value}
                            </a>
                          ) : (
                            <div className="text-white font-semibold text-sm sm:text-base">{contact.value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassMorphism>

                {/* Social Links */}
                <GlassMorphism className="p-8 rounded-3xl border-white/10 hover:scale-105 transition-all duration-500" intensity="medium">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Follow Me</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: Github, label: "GitHub", url: profile.socialLinks.github, color: "from-gray-600 to-gray-800" },
                      { icon: Linkedin, label: "LinkedIn", url: profile.socialLinks.linkedin, color: "from-blue-600 to-blue-800" }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block"
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                        <div className="relative flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${social.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <social.icon className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-white font-semibold group-hover:text-emerald-400 transition-colors duration-300">{social.label}</span>
                          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-white ml-auto transition-colors duration-300" />
                        </div>
                      </a>
                    ))}
                  </div>
                </GlassMorphism>

                {/* Quick Actions */}
                <GlassMorphism className="p-8 rounded-3xl border-white/10 hover:scale-105 transition-all duration-500" intensity="medium">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Quick Actions</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: CheckCircle, label: "Download Resume", to: "/resume" },
                      { icon: Star, label: "View Portfolio", to: "/projects" },
                      { icon: Heart, label: "About Me", to: "/about" }
                    ].map((action, index) => (
                      <InteractiveButton
                        key={index}
                        variant="secondary"
                        size="md"
                        ripple={true}
                        className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 group"
                      >
                        <Link to={action.to} className="flex items-center gap-3 w-full">
                          <action.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                          {action.label}
                        </Link>
                      </InteractiveButton>
                    ))}
                  </div>
                </GlassMorphism>
              </div>
            </ScrollAnimations>

            {/* Epic Contact Form */}
            <ScrollAnimations animation="fade-in-up" delay={400}>
              <GlassMorphism className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border-white/10 hover:scale-105 transition-all duration-500" intensity="medium">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Send className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white animate-bounce-subtle" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Send Message</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white font-semibold mb-2 block">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-white font-semibold mb-2 block">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-white font-semibold mb-2 block">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-white font-semibold mb-2 block">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400"
                      placeholder="Tell me about your project, idea, or just say hello..."
                      rows={6}
                    />
                  </div>
                  
                  <InteractiveButton
                    type="submit"
                    disabled={isSubmitting}
                    variant="gradient"
                    size="xl"
                    ripple={true}
                    glow={true}
                    magnetic={true}
                    className="w-full group"
                  >
                    <div className="flex items-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Rocket className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                          Send Message
                          <Send className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </div>
                  </InteractiveButton>
                </form>
                
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-5 w-5 text-emerald-400" />
                    <span className="text-white font-semibold">Quick Response Guaranteed</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    I typically respond to messages within 24 hours. For urgent matters, feel free to call me directly or connect on LinkedIn.
                  </p>
                </div>
              </GlassMorphism>
            </ScrollAnimations>
          </div>

          {/* Epic CTA Section */}
          <ScrollAnimations animation="fade-in-up" delay={600}>
            <div className="text-center">
              <GlassMorphism className="max-w-4xl mx-auto p-16 rounded-3xl border-white/10" intensity="medium">
                <div className="mb-8">
                  <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Ready to Start Something Great?
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                    Whether it's a complex web application, mobile app, or system integration project, I'm here to help turn your vision into reality.
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
                    onClick={() => window.open(`mailto:${profile.email}?subject=Project%20Inquiry`)}
                  >
                    <div className="flex items-center gap-3">
                      <Rocket className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                      Start a Project
                      <Mail className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </InteractiveButton>
                  
                  <InteractiveButton
                    variant="secondary"
                    size="xl"
                    ripple={true}
                    magnetic={true}
                    className="group bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Link to="/about" className="flex items-center gap-3">
                      <Heart className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                      Learn More About Me
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

export default Contact;