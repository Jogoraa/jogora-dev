import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import "./styles/print.css";

// Public Components
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";

// Admin Components
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboardContent from "./pages/admin/AdminDashboardContent";
import AdminProjectsContent from "./pages/admin/AdminProjectsContent";
import AdminResume from "./pages/admin/AdminResume";
import AdminDataSeeder from "./pages/admin/AdminDataSeeder";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          {/* Admin Login - Standalone */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin Routes - With Admin Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardContent />} />
            <Route path="projects" element={<AdminProjectsContent />} />
            <Route path="resume" element={<AdminResume />} />
            <Route path="data-seeder" element={<AdminDataSeeder />} />
            <Route path="profile" element={<AdminDashboardContent />} />
            <Route path="settings" element={<AdminDashboardContent />} />
          </Route>
          
          {/* Public Routes - With Layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/resume" element={<Resume />} />
              </Routes>
            </Layout>
          } />
        </Routes>
        <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;