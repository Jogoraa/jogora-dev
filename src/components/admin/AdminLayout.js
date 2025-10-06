import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, FolderOpen, User, Settings, LogOut, FileText,
  Menu, X, Crown, Eye, Bell, ChevronDown, Database
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import ParticleBackground from '../ParticleBackground';
import GlassMorphism from '../GlassMorphism';
import InteractiveButton from '../InteractiveButton';
import ProtectedRoute from '../ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';
import { mockData } from '../../data/mockData';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation even if logout fails
      navigate('/admin/login');
    }
  };

  const sidebarItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/admin/dashboard',
      description: 'Overview & Analytics'
    },
    { 
      icon: FolderOpen, 
      label: 'Projects', 
      path: '/admin/projects', 
      count: mockData.projects.length,
      description: 'Manage Portfolio Projects'
    },
    { 
      icon: FileText, 
      label: 'Resume Manager', 
      path: '/admin/resume',
      description: 'Edit Resume Content'
    },
    { 
      icon: Database, 
      label: 'Data Seeder', 
      path: '/admin/data-seeder',
      description: 'Initialize Database'
    },
    { 
      icon: User, 
      label: 'Profile', 
      path: '/admin/profile',
      description: 'Personal Information'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/admin/settings',
      description: 'System Configuration'
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen overflow-hidden">
      {/* Epic Background */}
      <ParticleBackground />
      
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-800/50 via-transparent to-gray-800/50" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <GlassMorphism className="h-full p-4 sm:p-6 border-r border-white/10 flex flex-col overflow-hidden" intensity="medium">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <Crown className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Admin Portal</h2>
                <p className="text-xs text-slate-300">Portfolio Manager</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 mb-8 flex-1 overflow-y-auto pr-1">
              {sidebarItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile after click
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-600/20 to-blue-700/20 text-white border border-blue-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isActive(item.path)
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700'
                      : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                  }`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{item.label}</span>
                      {item.count && (
                        <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30 text-xs">
                          {item.count}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                  </div>
                </Link>
              ))}
            </nav>

            {/* User Profile */}
            <div className="mt-auto pt-4 border-t border-slate-600/30">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-700/30 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {user?.user_metadata?.full_name || 'Admin User'}
                  </p>
                  <p className="text-slate-300 text-xs truncate">
                    {user?.email || 'admin@portfolio.com'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                {/* Quick Portfolio Links */}
                <div className="mb-3">
                  <p className="text-xs text-slate-400 mb-2 px-2">Quick Access</p>
                  <div className="space-y-1">
                    <Link to="/" target="_blank">
                      <Button
                        variant="outline"
                        className="w-full border-slate-500/30 text-slate-200 hover:bg-slate-700/50 hover:border-slate-400/40 justify-start text-sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Home
                      </Button>
                    </Link>
                    <Link to="/projects" target="_blank">
                      <Button
                        variant="outline"
                        className="w-full border-slate-500/30 text-slate-200 hover:bg-slate-700/50 hover:border-slate-400/40 justify-start text-sm"
                      >
                        <FolderOpen className="h-4 w-4 mr-2" />
                        View Projects
                      </Button>
                    </Link>
                    <Link to="/resume" target="_blank">
                      <Button
                        variant="outline"
                        className="w-full border-slate-500/30 text-slate-200 hover:bg-slate-700/50 hover:border-slate-400/40 justify-start text-sm"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Resume
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-slate-500/30 text-slate-200 hover:bg-slate-700/50 hover:border-slate-400/40 justify-start text-sm"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </GlassMorphism>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Bar */}
          <div className="bg-slate-800/40 backdrop-blur-sm border-b border-slate-600/30 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden text-white hover:bg-slate-700/50"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                
                {/* Dynamic Page Title */}
                <div>
                  {location.pathname === '/admin/dashboard' && (
                    <>
                      <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h1>
                      <p className="text-gray-400 text-sm">Welcome back! Here's your portfolio overview.</p>
                    </>
                  )}
                  {location.pathname === '/admin/projects' && (
                    <>
                      <h1 className="text-xl sm:text-2xl font-bold text-white">Projects Manager</h1>
                      <p className="text-gray-400 text-sm">Manage your portfolio projects with ease.</p>
                    </>
                  )}
                  {location.pathname === '/admin/resume' && (
                    <>
                      <h1 className="text-xl sm:text-2xl font-bold text-white">Resume Manager</h1>
                      <p className="text-gray-400 text-sm">Edit and manage your resume content.</p>
                    </>
                  )}
                  {location.pathname === '/admin/data-seeder' && (
                    <>
                      <h1 className="text-xl sm:text-2xl font-bold text-white">Database Seeder</h1>
                      <p className="text-gray-400 text-sm">Initialize your database with mock data.</p>
                    </>
                  )}
                  {location.pathname === '/admin/profile' && (
                    <>
                      <h1 className="text-xl sm:text-2xl font-bold text-white">Profile Settings</h1>
                      <p className="text-gray-400 text-sm">Manage your personal information.</p>
                    </>
                  )}
                  {location.pathname === '/admin/settings' && (
                    <>
                      <h1 className="text-xl sm:text-2xl font-bold text-white">System Settings</h1>
                      <p className="text-gray-400 text-sm">Configure system preferences.</p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <Bell className="h-5 w-5" />
                </Button>
                {/* Mobile quick logout */}
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="lg:hidden border-slate-500/30 text-slate-200 hover:bg-slate-700/50 hover:border-slate-400/40"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
