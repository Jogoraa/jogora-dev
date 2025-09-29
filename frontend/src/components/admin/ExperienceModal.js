import React, { useEffect, useState } from "react";
import { mockData } from "../../data/mockData";

export default function ExperienceModal({ open, onClose, onSave, editingExp }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    period: "",
    location: "",
    type: "Full-time",
    description: "",
    achievements: "",
    technologies: "",
  });

  useEffect(() => {
    if (editingExp) {
      setForm({
        company: editingExp.company || "",
        role: editingExp.role || "",
        period: editingExp.period || "",
        location: editingExp.location || "",
        type: editingExp.type || "Full-time",
        description: editingExp.description || "",
        achievements: (editingExp.achievements || []).join("\n"),
        technologies: (editingExp.technologies || []).join(", "),
      });
    } else {
      setForm({
        company: "",
        role: "",
        period: "",
        location: "",
        type: "Full-time",
        description: "",
        achievements: "",
        technologies: "",
      });
    }
  }, [editingExp, open]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      ...form,
      achievements: form.achievements.split("\n").map((a) => a.trim()).filter(Boolean),
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
    };
    onSave(data);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto">
      <form
        className="bg-white p-8 rounded-lg shadow w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[90vh] overflow-y-auto"
        onSubmit={handleSubmit}
        style={{ minWidth: 320 }}
      >
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold mb-4">
            {editingExp ? "Edit Experience" : "Add Experience"}
          </h3>
        </div>
        <div className="relative mb-3">
          <input name="company" value={form.company} onChange={handleChange} required placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Company</label>
        </div>
        <div className="relative mb-3">
          <input name="role" value={form.role} onChange={handleChange} required placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Role</label>
        </div>
        <div className="relative mb-3">
          <input name="period" value={form.period} onChange={handleChange} placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Period</label>
        </div>
        <div className="relative mb-3">
          <input name="location" value={form.location} onChange={handleChange} placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Location</label>
        </div>
        <div className="relative mb-3">
          <select name="type" value={form.type} onChange={handleChange} className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Type</label>
        </div>
        <div className="relative mb-3 md:col-span-2">
          <textarea name="description" value={form.description} onChange={handleChange} rows={2} placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Description</label>
        </div>
        <div className="relative mb-3 md:col-span-2">
          <textarea name="achievements" value={form.achievements} onChange={handleChange} rows={2} placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Achievements (one per line)</label>
        </div>
        <div className="relative mb-3 md:col-span-2">
          <input name="technologies" value={form.technologies} onChange={handleChange} placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Technologies (comma separated)</label>
        </div>
        <div className="flex justify-end space-x-2 mt-4 md:col-span-2">
          <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
