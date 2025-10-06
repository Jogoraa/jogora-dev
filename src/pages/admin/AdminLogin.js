import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Lock, Mail, Eye, EyeOff, Shield, Sparkles, Zap, 
  ArrowRight, CheckCircle, AlertCircle, User, Crown
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ParticleBackground from '../../components/ParticleBackground';
import ScrollAnimations from '../../components/ScrollAnimations';
import GlassMorphism from '../../components/GlassMorphism';
import InteractiveButton from '../../components/InteractiveButton';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { signIn, user, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate('/admin/dashboard');
    }
  }, [user, loading, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setAuthError('');
    
    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setAuthError(result.error || 'Sign in failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Epic Background */}
      <ParticleBackground />
      
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-violet-900/50" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-80 right-32 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-r from-blue-500/15 to-violet-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-1/3 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        
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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <ScrollAnimations animation="fade-in-up" delay={0}>
            <div className="text-center mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to Portfolio
              </Link>
            </div>
          </ScrollAnimations>

          {/* Login Card */}
          <ScrollAnimations animation="scale-in" delay={200}>
            <GlassMorphism className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-white/10" intensity="medium">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 mb-6">
                  <Crown className="h-8 w-8 sm:h-10 sm:w-10 text-white animate-pulse" />
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Admin Portal
                </h1>
                <p className="text-gray-400 text-sm sm:text-base">
                  Sign in to manage your portfolio
                </p>
              </div>

              {/* Error Message */}
              {authError && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-200 text-sm">{authError}</p>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-white font-semibold mb-2 block text-sm sm:text-base">
                    Email Address
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`pl-10 sm:pl-12 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400 text-sm sm:text-base ${
                        errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
                      }`}
                      placeholder="admin@example.com"
                    />
                    {errors.email && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <Label htmlFor="password" className="text-white font-semibold mb-2 block text-sm sm:text-base">
                    Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`pl-10 sm:pl-12 pr-10 sm:pr-12 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400 text-sm sm:text-base ${
                        errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Demo Credentials Notice */}
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-blue-200 font-medium text-xs">Demo Access</p>
                      <p className="text-blue-300/80 text-xs">
                        Use any email and password to access the demo admin panel
                      </p>
                    </div>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-400 focus:ring-offset-0"
                    />
                    <span>Remember me</span>
                  </label>
                  <button 
                    type="button"
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <InteractiveButton
                  type="submit"
                  variant="gradient"
                  size="lg"
                  ripple={true}
                  glow={true}
                  magnetic={true}
                  className="w-full group"
                  disabled={isLoading}
                >
                  <div className="flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="text-sm sm:text-base">Signing In...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm sm:text-base">Sign In to Admin</span>
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                </InteractiveButton>
              </form>

              {/* Security Notice */}
              <div className="mt-6 p-3 sm:p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-purple-200 font-medium text-xs sm:text-sm">Secure Access</p>
                    <p className="text-purple-300/80 text-xs">
                      This admin portal is protected with enterprise-grade security
                    </p>
                  </div>
                </div>
              </div>
            </GlassMorphism>
          </ScrollAnimations>

          {/* Footer */}
          <ScrollAnimations animation="fade-in-up" delay={400}>
            <div className="text-center mt-8">
              <p className="text-gray-400 text-xs sm:text-sm">
                © 2024 Portfolio Admin. All rights reserved.
              </p>
            </div>
          </ScrollAnimations>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
