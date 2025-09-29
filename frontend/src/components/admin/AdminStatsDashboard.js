import React from "react";
import { mockData } from "../../data/mockData";

export default function AdminStatsDashboard() {
  // Aggregate statistics from mockData
  const stats = {
    projects: mockData.projects?.length || 0,
    experience: mockData.experience?.length || 0,
    skills: mockData.skills?.reduce((acc, s) => acc + (s.items?.length || 0), 0) || 0,
    education: mockData.education?.length || 0,
    languages: mockData.languages?.length || 0,
    certifications: mockData.certifications?.length || 0,
    featuredProjects: mockData.projects?.filter(p => p.featured).length || 0,
    liveProjects: mockData.projects?.filter(p => p.status === "Live").length || 0,
  };

  // Example: Top 3 technologies used in projects
  const techCount = {};
  mockData.projects?.forEach(p => {
    (p.technologies || []).forEach(t => {
      techCount[t] = (techCount[t] || 0) + 1;
    });
  });
  const topTech = Object.entries(techCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard label="Projects" value={stats.projects} color="blue" />
        <StatCard label="Featured Projects" value={stats.featuredProjects} color="purple" />
        <StatCard label="Live Projects" value={stats.liveProjects} color="green" />
        <StatCard label="Experience" value={stats.experience} color="yellow" />
        <StatCard label="Skills" value={stats.skills} color="pink" />
        <StatCard label="Education" value={stats.education} color="indigo" />
        <StatCard label="Languages" value={stats.languages} color="teal" />
        <StatCard label="Certifications" value={stats.certifications} color="red" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Top Technologies</h2>
          <ul className="space-y-2">
            {topTech.map(([tech, count]) => (
              <li key={tech} className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{tech}</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{count} uses</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Placeholder for future charts/graphs */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center min-h-[200px]">
          <span className="text-gray-400">[Add beautiful charts here]</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    pink: "bg-pink-100 text-pink-700",
    indigo: "bg-indigo-100 text-indigo-700",
    teal: "bg-teal-100 text-teal-700",
    red: "bg-red-100 text-red-700",
  };
  return (
    <div className={`rounded-xl shadow p-6 flex flex-col items-center ${colorMap[color] || "bg-gray-100 text-gray-700"}`}>
      <span className="text-3xl font-bold mb-2">{value}</span>
      <span className="text-sm font-medium uppercase tracking-wide">{label}</span>
    </div>
  );
}
