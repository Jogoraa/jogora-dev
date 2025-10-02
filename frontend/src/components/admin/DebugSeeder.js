import React, { useState } from 'react';
import { Button } from '../ui/button';
import { databaseSeeder } from '../../utils/seedDatabase';
import { testSupabaseConnection, runAllTests } from '../../utils/testSupabase';

const DebugSeeder = () => {
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);

  const addOutput = (message, type = 'info') => {
    setOutput(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }]);
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const runConnectionTest = async () => {
    setLoading(true);
    addOutput('🔄 Testing Supabase connection...', 'info');
    
    try {
      const result = await testSupabaseConnection();
      if (result.success) {
        addOutput('✅ Connection successful!', 'success');
      } else {
        addOutput(`❌ Connection failed: ${result.error}`, 'error');
      }
    } catch (error) {
      addOutput(`💥 Test failed: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const runFullTests = async () => {
    setLoading(true);
    addOutput('🚀 Running all tests...', 'info');
    
    try {
      const results = await runAllTests();
      addOutput(`Connection: ${results.connection.success ? '✅' : '❌'}`, results.connection.success ? 'success' : 'error');
      addOutput(`Authentication: ${results.authentication.success ? '✅' : '❌'}`, results.authentication.success ? 'success' : 'error');
    } catch (error) {
      addOutput(`💥 Tests failed: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const debugTables = async () => {
    setLoading(true);
    addOutput('🔍 Debugging table structure...', 'info');
    
    try {
      // Capture console logs
      const originalLog = console.log;
      const originalError = console.error;
      
      console.log = (...args) => {
        addOutput(args.join(' '), 'info');
        originalLog(...args);
      };
      
      console.error = (...args) => {
        addOutput(args.join(' '), 'error');
        originalError(...args);
      };

      await databaseSeeder.debugTableStructure();
      
      // Restore console
      console.log = originalLog;
      console.error = originalError;
      
      addOutput('✅ Table debug completed', 'success');
    } catch (error) {
      addOutput(`💥 Debug failed: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const runSeeding = async () => {
    setLoading(true);
    clearOutput();
    addOutput('🚀 Starting database seeding...', 'info');
    
    try {
      // Capture console logs during seeding
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      
      console.log = (...args) => {
        addOutput(args.join(' '), 'info');
        originalLog(...args);
      };
      
      console.error = (...args) => {
        addOutput(args.join(' '), 'error');
        originalError(...args);
      };

      console.warn = (...args) => {
        addOutput(args.join(' '), 'warning');
        originalWarn(...args);
      };

      const result = await databaseSeeder.seedAll();
      
      // Restore console
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      
      if (result.success) {
        addOutput('🎉 Seeding completed successfully!', 'success');
      } else {
        addOutput(`⚠️ Seeding completed with ${result.failed} failures`, 'warning');
      }
    } catch (error) {
      addOutput(`💥 Seeding failed: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const checkData = async () => {
    setLoading(true);
    addOutput('📊 Checking existing data...', 'info');
    
    try {
      const data = await databaseSeeder.checkExistingData();
      if (data) {
        addOutput(`Profile: ${data.hasProfile ? '✅' : '❌'}`, data.hasProfile ? 'success' : 'error');
        addOutput(`Experience: ${data.experienceCount} entries`, data.experienceCount > 0 ? 'success' : 'warning');
        addOutput(`Skills: ${data.skillsCount} categories`, data.skillsCount > 0 ? 'success' : 'warning');
        addOutput(`Education: ${data.educationCount} entries`, data.educationCount > 0 ? 'success' : 'warning');
        addOutput(`Certifications: ${data.certificationsCount} entries`, data.certificationsCount > 0 ? 'success' : 'warning');
        addOutput(`Languages: ${data.languagesCount} entries`, data.languagesCount > 0 ? 'success' : 'warning');
        addOutput(`Projects: ${data.projectsCount} entries`, data.projectsCount > 0 ? 'success' : 'warning');
      } else {
        addOutput('❌ Failed to check data', 'error');
      }
    } catch (error) {
      addOutput(`💥 Check failed: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const getMessageColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="p-6 bg-slate-800 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Debug Seeder</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Button onClick={runConnectionTest} disabled={loading} size="sm">
          Test Connection
        </Button>
        <Button onClick={runFullTests} disabled={loading} size="sm">
          Run All Tests
        </Button>
        <Button onClick={debugTables} disabled={loading} size="sm">
          Debug Tables
        </Button>
        <Button onClick={checkData} disabled={loading} size="sm">
          Check Data
        </Button>
        <Button onClick={runSeeding} disabled={loading} size="sm" className="bg-blue-600 hover:bg-blue-700">
          Run Seeding
        </Button>
        <Button onClick={clearOutput} disabled={loading} size="sm" variant="outline">
          Clear
        </Button>
      </div>

      <div className="bg-slate-900 rounded p-4 h-96 overflow-y-auto font-mono text-sm">
        {output.length === 0 ? (
          <div className="text-gray-500">Output will appear here...</div>
        ) : (
          output.map((item, index) => (
            <div key={index} className={`mb-1 ${getMessageColor(item.type)}`}>
              <span className="text-gray-500">[{item.timestamp}]</span> {item.message}
            </div>
          ))
        )}
        {loading && (
          <div className="text-blue-400 animate-pulse">
            Processing...
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugSeeder;
