import React, { useEffect, useState } from "react";
import { mockData } from "../../data/mockData";

export default function EducationManager() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);

  useEffect(() => {
    fetchEducation();
  }, []);

  async function fetchEducation() {
    setLoading(true);
    try {
      const res = await fetch("/api/education");
      if (!res.ok) throw new Error();
      const result = await res.json();
      setEducation(result.data && result.data.length ? result.data : mockData.education);
    } catch {
      setEducation(mockData.education);
    } finally {
      setLoading(false);
    }
  }

  function openEdit(edu) {
    setEditingEdu(edu);
    setModalOpen(true);
  }
  function openCreate() {
    setEditingEdu(null);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setEditingEdu(null);
  }

  function handleSave(data) {
    if (editingEdu) {
      setEducation((prev) => prev.map((e) => (e.id === editingEdu.id ? { ...e, ...data } : e)));
    } else {
      setEducation((prev) => [
        ...prev,
        { ...data, id: Date.now() },
      ]);
    }
    closeModal();
  }

  function handleDelete(id) {
    setEducation((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Education</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={openCreate}>
          + Add Education
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {education.map((edu) => (
            <div key={edu.id} className="bg-white rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-blue-700">{edu.institution}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">{edu.degree}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">{edu.period} | {edu.location}</div>
                <div className="text-gray-700 mb-2">{edu.description}</div>
                <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
                  {edu.achievements?.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
                <div className="flex flex-wrap gap-2 mt-2">
                  {edu.relevant_courses?.map((c, i) => (
                    <span key={i} className="bg-gray-100 text-xs px-2 py-1 rounded-full text-gray-700 border border-gray-200">{c}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="text-blue-600 font-semibold" onClick={() => openEdit(edu)}>Edit</button>
                <button className="text-red-500 font-semibold" onClick={() => handleDelete(edu.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {modalOpen && (
        <EducationModal
          open={modalOpen}
          onClose={closeModal}
          onSave={handleSave}
          editingEdu={editingEdu}
        />
      )}
    </div>
  );
}

function EducationModal({ open, onClose, onSave, editingEdu }) {
  const [form, setForm] = useState({
    institution: "",
    degree: "",
    period: "",
    location: "",
    gpa: "",
    description: "",
    achievements: "",
    relevant_courses: "",
  });

  useEffect(() => {
    if (editingEdu) {
      setForm({
        institution: editingEdu.institution || "",
        degree: editingEdu.degree || "",
        period: editingEdu.period || "",
        location: editingEdu.location || "",
        gpa: editingEdu.gpa || "",
        description: editingEdu.description || "",
        achievements: (editingEdu.achievements || []).join("\n"),
        relevant_courses: (editingEdu.relevant_courses || []).join(", "),
      });
    } else {
      setForm({ institution: "", degree: "", period: "", location: "", gpa: "", description: "", achievements: "", relevant_courses: "" });
    }
  }, [editingEdu, open]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      ...form,
      achievements: form.achievements.split("\n").map((a) => a.trim()).filter(Boolean),
      relevant_courses: form.relevant_courses.split(",").map((c) => c.trim()).filter(Boolean),
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
            {editingEdu ? "Edit Education" : "Add Education"}
          </h3>
        </div>
        <div className="relative mb-3">
          <input name="institution" value={form.institution} onChange={handleChange} required placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Institution</label>
        </div>
        <div className="relative mb-3">
          <input name="degree" value={form.degree} onChange={handleChange} required placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Degree</label>
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
          <input name="gpa" value={form.gpa} onChange={handleChange} placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">GPA</label>
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
          <input name="relevant_courses" value={form.relevant_courses} onChange={handleChange} placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Relevant Courses (comma separated)</label>
        </div>
        <div className="flex justify-end space-x-2 mt-4 md:col-span-2">
          <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
