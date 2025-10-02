// Simple test script to verify Supabase connection
import { supabase, TABLES } from '../config/supabase';

export const testSupabaseConnection = async () => {
  try {
    console.log('🔄 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from(TABLES.PROFILE).select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Supabase connection failed:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Supabase connection successful!');
    console.log(`📊 Found ${data || 0} profiles in database`);
    
    return { success: true, profileCount: data || 0 };
  } catch (error) {
    console.error('💥 Connection test failed:', error);
    return { success: false, error: error.message };
  }
};

export const testAuthentication = async () => {
  try {
    console.log('🔄 Testing authentication...');
    
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.log('ℹ️ No authenticated user (this is normal for public access)');
      return { success: true, authenticated: false };
    }
    
    if (user) {
      console.log('✅ User authenticated:', user.email);
      return { success: true, authenticated: true, user };
    }
    
    console.log('ℹ️ No user session found');
    return { success: true, authenticated: false };
  } catch (error) {
    console.error('💥 Authentication test failed:', error);
    return { success: false, error: error.message };
  }
};

// Run all tests
export const runAllTests = async () => {
  console.log('🚀 Running Supabase tests...\n');
  
  const connectionTest = await testSupabaseConnection();
  const authTest = await testAuthentication();
  
  console.log('\n📋 Test Results:');
  console.log('- Connection:', connectionTest.success ? '✅ PASS' : '❌ FAIL');
  console.log('- Authentication:', authTest.success ? '✅ PASS' : '❌ FAIL');
  
  return {
    connection: connectionTest,
    authentication: authTest,
    allPassed: connectionTest.success && authTest.success
  };
};
