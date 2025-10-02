import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 print:bg-white print:min-h-0">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 print:hidden ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-modern' 
          : 'bg-white/80 backdrop-blur-md border-b border-gray-100'
      }`}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-xl font-medium tracking-tight text-black hover:scale-105 transition-all duration-300 hover:text-gray-700"
            >
              <span className="font-roboto">Dawit Jogora</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-normal transition-all duration-300 hover:-translate-y-0.5 relative group ${
                    isActive(item.href)
                      ? "text-black font-medium"
                      : "text-gray-600 hover:text-black"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ${
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* Social Links - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="https://github.com/dawitjogora"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/dawitjogora"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:davejogoraa@gmail.com"
                className="text-gray-600 hover:text-black transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 hover:text-black transition-all duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <Menu className={`h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X className={`h-6 w-6 absolute top-0 left-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-400 ease-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100/50">
            <div className="px-6 py-4 space-y-3">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-base transition-all duration-300 hover:translate-x-2 ${
                    isActive(item.href)
                      ? "text-black font-medium"
                      : "text-gray-600 hover:text-black"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Social Links */}
              <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                <a
                  href="https://github.com/dawitjogora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/dawitjogora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:davejogoraa@gmail.com"
                  className="text-gray-600 hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 print:pt-0">
        {children}
      </main>

      {/* Premium Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black border-t border-gray-800/50 mt-24 print:hidden overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-indigo-900/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block mb-6">
                <h3 className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300">
                  Dawit Jogora
                </h3>
              </Link>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
                Junior Full-Stack Developer crafting innovative digital solutions with modern technologies and creative problem-solving.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-medium">Available for new opportunities</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
              <nav className="space-y-4">
                {[
                  { name: "Home", href: "/" },
                  { name: "Projects", href: "/projects" },
                  { name: "About", href: "/about" },
                  { name: "Resume", href: "/resume" },
                  { name: "Contact", href: "/contact" }
                ].map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Connect Section */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6">Let's Connect</h4>
              <div className="space-y-4">
                <a
                  href="https://github.com/dawitjogora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-800 group-hover:bg-gray-700 flex items-center justify-center transition-colors duration-300">
                    <Github className="h-5 w-5" />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/dawitjogora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-300">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">LinkedIn</span>
                </a>
                <a
                  href="mailto:davejogoraa@gmail.com"
                  className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-800 group-hover:bg-purple-600 flex items-center justify-center transition-colors duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © 2025 <span className="text-white font-medium">Dawit Jogora</span>. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Built with ❤️ using React, Next.js & Tailwind CSS
                </p>
              </div>

              {/* Tech Stack */}
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-xs">Powered by:</span>
                <div className="flex items-center gap-3">
                  {[
                    { name: "React", color: "text-blue-400" },
                    { name: "Tailwind", color: "text-cyan-400" },
                    { name: "Supabase", color: "text-green-400" }
                  ].map((tech, index) => (
                    <span key={tech.name} className={`text-xs font-medium ${tech.color} hover:scale-110 transition-transform duration-300 cursor-default`}>
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Back to Top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105"
              >
                <span className="text-xs font-medium">Back to Top</span>
                <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                  <div className="w-2 h-2 border-t border-r border-white transform rotate-[-45deg] translate-y-[1px]" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;