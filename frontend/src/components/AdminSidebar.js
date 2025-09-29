import React from "react";

const navItems = [
  { label: "Dashboard", key: "dashboard" },
  { label: "Projects", key: "projects" },
  { label: "Experience", key: "experience" },
  { label: "Skills", key: "skills" },
  { label: "Education", key: "education" },
  { label: "Languages", key: "languages" },
  { label: "Certifications", key: "certifications" },
  { label: "Messages", key: "messages" },
  { label: "Profile", key: "profile" },
];

export function Sidebar({ onSelect, selected }) {
  return (
    <aside className="w-64 bg-white shadow-lg h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b">
        <span className="text-xl font-bold text-gray-800">Admin Panel</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect && onSelect(item.key)}
            className={`w-full text-left px-4 py-2 rounded-lg transition font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 ${selected === item.key ? "bg-blue-600 text-white" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t text-xs text-gray-400">&copy; {new Date().getFullYear()} Dawit Jogora</div>
    </aside>
  );
}
