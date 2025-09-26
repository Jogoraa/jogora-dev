#!/usr/bin/env python3
"""
Portfolio Backend API Test Suite
Tests all portfolio API endpoints with comprehensive error handling
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any, Optional

# Get backend URL from environment
BACKEND_URL = "https://jogora-dev.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, details: str, response_data: Optional[Dict] = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        if response_data and not success:
            print(f"   Response: {json.dumps(response_data, indent=2)}")
    
    def test_health_check(self):
        """Test GET /api/ - Health check endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy":
                    self.log_test("Health Check", True, f"API is healthy - {data.get('message')}", data)
                else:
                    self.log_test("Health Check", False, f"Unexpected response format", data)
            else:
                self.log_test("Health Check", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")
    
    def test_profile_endpoint(self):
        """Test GET /api/profile - Profile data endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/profile")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    profile = data["data"]
                    required_fields = ["full_name", "title", "id"]
                    missing_fields = [field for field in required_fields if field not in profile]
                    
                    if not missing_fields:
                        self.log_test("Profile Endpoint", True, f"Profile data retrieved successfully", data)
                    else:
                        self.log_test("Profile Endpoint", False, f"Missing required fields: {missing_fields}", data)
                else:
                    self.log_test("Profile Endpoint", False, "Invalid response format or no data", data)
            elif response.status_code == 404:
                self.log_test("Profile Endpoint", False, "Profile not found - database may be empty", response.json())
            else:
                self.log_test("Profile Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Profile Endpoint", False, f"Request error: {str(e)}")
    
    def test_projects_endpoint(self):
        """Test GET /api/projects - Projects list endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/projects")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and isinstance(data.get("data"), list):
                    projects = data["data"]
                    self.log_test("Projects Endpoint", True, f"Retrieved {len(projects)} projects", data)
                    
                    # Test with featured filter
                    featured_response = self.session.get(f"{self.base_url}/projects?featured=true")
                    if featured_response.status_code == 200:
                        featured_data = featured_response.json()
                        featured_count = len(featured_data.get("data", []))
                        self.log_test("Projects Featured Filter", True, f"Retrieved {featured_count} featured projects")
                    else:
                        self.log_test("Projects Featured Filter", False, f"Featured filter failed: HTTP {featured_response.status_code}")
                        
                else:
                    self.log_test("Projects Endpoint", False, "Invalid response format", data)
            else:
                self.log_test("Projects Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Projects Endpoint", False, f"Request error: {str(e)}")
    
    def test_individual_project(self):
        """Test GET /api/projects/habesha-harvest - Individual project endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/projects/habesha-harvest")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    project = data["data"]
                    required_fields = ["title", "slug", "id"]
                    missing_fields = [field for field in required_fields if field not in project]
                    
                    if not missing_fields and project.get("slug") == "habesha-harvest":
                        self.log_test("Individual Project", True, f"Project '{project.get('title')}' retrieved successfully", data)
                    else:
                        self.log_test("Individual Project", False, f"Invalid project data or missing fields: {missing_fields}", data)
                else:
                    self.log_test("Individual Project", False, "Invalid response format", data)
            elif response.status_code == 404:
                self.log_test("Individual Project", False, "Project 'habesha-harvest' not found - may not exist in database", response.json())
            else:
                self.log_test("Individual Project", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Individual Project", False, f"Request error: {str(e)}")
    
    def test_experience_endpoint(self):
        """Test GET /api/experience - Work experience endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/experience")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and isinstance(data.get("data"), list):
                    experiences = data["data"]
                    self.log_test("Experience Endpoint", True, f"Retrieved {len(experiences)} work experiences", data)
                else:
                    self.log_test("Experience Endpoint", False, "Invalid response format", data)
            else:
                self.log_test("Experience Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Experience Endpoint", False, f"Request error: {str(e)}")
    
    def test_skills_endpoint(self):
        """Test GET /api/skills - Skills by category endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/skills")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and isinstance(data.get("data"), list):
                    skills = data["data"]
                    self.log_test("Skills Endpoint", True, f"Retrieved {len(skills)} skill categories", data)
                else:
                    self.log_test("Skills Endpoint", False, "Invalid response format", data)
            else:
                self.log_test("Skills Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Skills Endpoint", False, f"Request error: {str(e)}")
    
    def test_contact_form(self):
        """Test POST /api/contact - Contact form submission"""
        try:
            # Test data
            contact_data = {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "subject": "Portfolio Inquiry",
                "message": "Hello, I'm interested in your work and would like to discuss a potential collaboration opportunity."
            }
            
            response = self.session.post(
                f"{self.base_url}/contact",
                json=contact_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    contact_message = data["data"]
                    required_fields = ["name", "email", "subject", "message", "id"]
                    missing_fields = [field for field in required_fields if field not in contact_message]
                    
                    if not missing_fields:
                        self.log_test("Contact Form", True, f"Contact message submitted successfully", data)
                    else:
                        self.log_test("Contact Form", False, f"Missing fields in response: {missing_fields}", data)
                else:
                    self.log_test("Contact Form", False, "Invalid response format", data)
            else:
                self.log_test("Contact Form", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Contact Form", False, f"Request error: {str(e)}")
    
    def test_additional_endpoints(self):
        """Test additional endpoints that exist in the API"""
        endpoints = [
            ("Education", "/education"),
            ("Languages", "/languages"),
            ("Certifications", "/certifications")
        ]
        
        for name, endpoint in endpoints:
            try:
                response = self.session.get(f"{self.base_url}{endpoint}")
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success") and isinstance(data.get("data"), list):
                        items = data["data"]
                        self.log_test(f"{name} Endpoint", True, f"Retrieved {len(items)} {name.lower()} items")
                    else:
                        self.log_test(f"{name} Endpoint", False, "Invalid response format", data)
                else:
                    self.log_test(f"{name} Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                    
            except Exception as e:
                self.log_test(f"{name} Endpoint", False, f"Request error: {str(e)}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting Portfolio API Tests")
        print(f"📍 Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Core tests requested
        self.test_health_check()
        self.test_profile_endpoint()
        self.test_projects_endpoint()
        self.test_individual_project()
        self.test_experience_endpoint()
        self.test_skills_endpoint()
        self.test_contact_form()
        
        # Additional endpoints
        self.test_additional_endpoints()
        
        print("=" * 60)
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"📊 TEST SUMMARY")
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print(f"\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  • {result['test']}: {result['details']}")
        
        # Check for critical issues
        critical_issues = []
        for result in self.test_results:
            if not result["success"]:
                if "Connection error" in result["details"]:
                    critical_issues.append("Backend server connection issues")
                elif "401" in result["details"] or "Invalid API key" in result["details"]:
                    critical_issues.append("Supabase authentication issues")
                elif "500" in result["details"]:
                    critical_issues.append("Internal server errors")
        
        if critical_issues:
            print(f"\n🚨 CRITICAL ISSUES IDENTIFIED:")
            for issue in set(critical_issues):
                print(f"  • {issue}")

def main():
    """Main test execution"""
    tester = PortfolioAPITester(BACKEND_URL)
    tester.run_all_tests()
    
    # Return exit code based on test results
    failed_tests = sum(1 for result in tester.test_results if not result["success"])
    return 1 if failed_tests > 0 else 0

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)