
import React, { useState } from "react";
import { Sidebar } from "../components/AdminSidebar";
import ProjectsManager from "../components/admin/ProjectsManager";
import ExperienceManager from "../components/admin/ExperienceManager";
import SkillsManager from "../components/admin/SkillsManager";
import EducationManager from "../components/admin/EducationManager";
import LanguagesManager from "../components/admin/LanguagesManager";
import CertificationsManager from "../components/admin/CertificationsManager";
import MessagesManager from "../components/admin/MessagesManager";
import ProfileManager from "../components/admin/ProfileManager";
import AdminStatsDashboard from "../components/admin/AdminStatsDashboard";

export default function AdminDashboard() {
  const [selected, setSelected] = useState("dashboard");

  let content = null;
  if (selected === "dashboard") content = <AdminStatsDashboard />;
  else if (selected === "projects") content = <ProjectsManager />;
  else if (selected === "experience") content = <ExperienceManager />;
  else if (selected === "skills") content = <SkillsManager />;
  else if (selected === "education") content = <EducationManager />;
  else if (selected === "languages") content = <LanguagesManager />;
  else if (selected === "certifications") content = <CertificationsManager />;
  else if (selected === "messages") content = <MessagesManager />;
  else if (selected === "profile") content = <ProfileManager />;
  else content = null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onSelect={setSelected} selected={selected} />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        {content}
      </main>
    </div>
  );
}
