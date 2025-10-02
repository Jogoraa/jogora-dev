import React, { useState, useEffect } from 'react';
import { 
  Database, Upload, Download, RefreshCw, CheckCircle, 
  AlertCircle, Loader2, FileText, Users, Briefcase,
  Code, GraduationCap, Award, Globe, FolderOpen
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import ScrollAnimations from '../../components/ScrollAnimations';
import GlassMorphism from '../../components/GlassMorphism';
import InteractiveButton from '../../components/InteractiveButton';
import DebugSeeder from '../../components/admin/DebugSeeder';
import { useAuth } from '../../contexts/AuthContext';
import { databaseSeeder } from '../../utils/seedDatabase';

const AdminDataSeeder = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [checking, setChecking] = useState(false);
  const [existingData, setExistingData] = useState(null);
  const [seedResult, setSeedResult] = useState(null);
  const [error, setError] = useState(null);

  // Check existing data on component mount
  useEffect(() => {
    if (isAuthenticated) {
      checkExistingData();
    }
  }, [isAuthenticated]);

  const checkExistingData = async () => {
    if (!isAuthenticated) return;

    try {
      setChecking(true);
      setError(null);
      const data = await databaseSeeder.checkExistingData();
      setExistingData(data);
    } catch (error) {
      console.error('Error checking existing data:', error);
      setError('Failed to check existing data');
    } finally {
      setChecking(false);
    }
  };

  const handleSeedDatabase = async () => {
    if (!isAuthenticated) {
      setError('You must be authenticated to seed the database');
      return;
    }

    try {
      setSeeding(true);
      setError(null);
      setSeedResult(null);

      const result = await databaseSeeder.seedAll();
      setSeedResult(result);
      
      // Refresh existing data check
      await checkExistingData();
    } catch (error) {
      console.error('Error seeding database:', error);
      setError(error.message || 'Failed to seed database');
    } finally {
      setSeeding(false);
    }
  };

  // Show authentication required message
  if (!isAuthenticated) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-gray-400 mb-4">You must be signed in to access the data seeder.</p>
          <Button onClick={() => window.location.href = '/admin/login'} className="bg-blue-600 hover:bg-blue-700">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  const dataStats = [
    { 
      icon: Users, 
      label: 'Profile', 
      value: existingData?.hasProfile ? '✓' : '✗',
      color: existingData?.hasProfile ? 'from-green-500 to-emerald-600' : 'from-gray-500 to-gray-600'
    },
    { 
      icon: Briefcase, 
      label: 'Experience', 
      value: existingData?.experienceCount || 0,
      color: (existingData?.experienceCount || 0) > 0 ? 'from-blue-500 to-indigo-600' : 'from-gray-500 to-gray-600'
    },
    { 
      icon: Code, 
      label: 'Skills', 
      value: existingData?.skillsCount || 0,
      color: (existingData?.skillsCount || 0) > 0 ? 'from-purple-500 to-violet-600' : 'from-gray-500 to-gray-600'
    },
    { 
      icon: GraduationCap, 
      label: 'Education', 
      value: existingData?.educationCount || 0,
      color: (existingData?.educationCount || 0) > 0 ? 'from-yellow-500 to-orange-600' : 'from-gray-500 to-gray-600'
    },
    { 
      icon: Award, 
      label: 'Certifications', 
      value: existingData?.certificationsCount || 0,
      color: (existingData?.certificationsCount || 0) > 0 ? 'from-pink-500 to-rose-600' : 'from-gray-500 to-gray-600'
    },
    { 
      icon: Globe, 
      label: 'Languages', 
      value: existingData?.languagesCount || 0,
      color: (existingData?.languagesCount || 0) > 0 ? 'from-teal-500 to-cyan-600' : 'from-gray-500 to-gray-600'
    },
    { 
      icon: FolderOpen, 
      label: 'Projects', 
      value: existingData?.projectsCount || 0,
      color: (existingData?.projectsCount || 0) > 0 ? 'from-indigo-500 to-blue-600' : 'from-gray-500 to-gray-600'
    }
  ];

  const hasAnyData = existingData && (
    existingData.hasProfile ||
    existingData.experienceCount > 0 ||
    existingData.skillsCount > 0 ||
    existingData.educationCount > 0 ||
    existingData.certificationsCount > 0 ||
    existingData.languagesCount > 0 ||
    existingData.projectsCount > 0
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <ScrollAnimations animation="fade-in-up" delay={0}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Database Seeder</h2>
                {user && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    Connected to Supabase
                  </Badge>
                )}
              </div>
              <p className="text-gray-400 text-sm">Initialize your database with mock portfolio data</p>
              {error && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {error}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={checkExistingData}
              disabled={checking}
              className="border-white/20 text-white hover:bg-white/10"
            >
              {checking ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
          </div>
        </div>
      </ScrollAnimations>

      {/* Current Data Status */}
      <ScrollAnimations animation="fade-in-up" delay={200}>
        <GlassMorphism className="rounded-2xl border-white/10 p-6 mb-8" intensity="medium">
          <h3 className="text-lg font-semibold text-white mb-6">Current Database Status</h3>
          
          {checking ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-white mr-3" />
              <span className="text-gray-300">Checking database...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
              {dataStats.map((stat, index) => (
                <GlassMorphism key={index} className="p-4 rounded-xl border-white/10" intensity="low">
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-gray-400 text-xs">{stat.label}</p>
                  </div>
                </GlassMorphism>
              ))}
            </div>
          )}

          {existingData && (
            <div className="mt-6 p-4 rounded-lg bg-slate-700/30">
              <div className="flex items-center gap-3">
                {hasAnyData ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-green-200 font-medium text-sm">Database has existing data</p>
                      <p className="text-green-300/80 text-xs">
                        Seeding will overwrite existing data with mock data
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="text-yellow-200 font-medium text-sm">Database is empty</p>
                      <p className="text-yellow-300/80 text-xs">
                        Ready to seed with mock portfolio data
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </GlassMorphism>
      </ScrollAnimations>

      {/* Seeding Actions */}
      <ScrollAnimations animation="fade-in-up" delay={400}>
        <GlassMorphism className="rounded-2xl border-white/10 p-6 mb-8" intensity="medium">
          <h3 className="text-lg font-semibold text-white mb-6">Seed Database</h3>
          
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-200 font-medium text-sm">What will be seeded?</p>
                  <ul className="text-blue-300/80 text-xs mt-2 space-y-1">
                    <li>• Complete profile information</li>
                    <li>• Professional work experience</li>
                    <li>• Skills organized by categories</li>
                    <li>• Educational background</li>
                    <li>• Certifications and languages</li>
                    <li>• Portfolio projects with details</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <InteractiveButton
                variant="gradient"
                size="lg"
                ripple={true}
                glow={true}
                onClick={handleSeedDatabase}
                disabled={seeding || !isAuthenticated}
                className="flex-1"
              >
                {seeding ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                    Seeding Database...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-3" />
                    Seed Database with Mock Data
                  </>
                )}
              </InteractiveButton>

              <Button
                variant="outline"
                size="lg"
                onClick={checkExistingData}
                disabled={checking}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Check Status
              </Button>
            </div>
          </div>
        </GlassMorphism>
      </ScrollAnimations>

      {/* Seeding Results */}
      {seedResult && (
        <ScrollAnimations animation="fade-in-up" delay={600}>
          <GlassMorphism className="rounded-2xl border-white/10 p-6 mb-8" intensity="medium">
            <h3 className="text-lg font-semibold text-white mb-6">Seeding Results</h3>
            
            <div className={`p-4 rounded-lg ${
              seedResult.success 
                ? 'bg-green-500/10 border border-green-500/20' 
                : 'bg-yellow-500/10 border border-yellow-500/20'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {seedResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                )}
                <div>
                  <p className={`font-medium text-sm ${
                    seedResult.success ? 'text-green-200' : 'text-yellow-200'
                  }`}>
                    {seedResult.success ? 'Seeding Completed Successfully!' : 'Seeding Completed with Issues'}
                  </p>
                  <p className={`text-xs ${
                    seedResult.success ? 'text-green-300/80' : 'text-yellow-300/80'
                  }`}>
                    {seedResult.successful}/{seedResult.successful + seedResult.failed} operations successful
                  </p>
                </div>
              </div>
              
              {seedResult.success && (
                <p className="text-green-300/80 text-xs">
                  Your database has been populated with mock portfolio data. You can now use the admin interface to manage your content!
                </p>
              )}
            </div>
          </GlassMorphism>
        </ScrollAnimations>
      )}

      {/* Debug Tools */}
      <ScrollAnimations animation="fade-in-up" delay={800}>
        <GlassMorphism className="rounded-2xl border-white/10 p-6" intensity="medium">
          <h3 className="text-lg font-semibold text-white mb-6">Debug Tools</h3>
          <DebugSeeder />
        </GlassMorphism>
      </ScrollAnimations>
    </div>
  );
};

export default AdminDataSeeder;
