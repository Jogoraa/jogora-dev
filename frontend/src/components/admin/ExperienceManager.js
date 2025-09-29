import React, { useEffect, useState } from "react";
import { mockData } from "../../data/mockData";
import ExperienceModal from "./ExperienceModal";

export default function ExperienceManager() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  // For create/edit modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);

  useEffect(() => {
    fetchExperience();
  }, []);

  async function fetchExperience() {
    setLoading(true);
    try {
      // Try API, fallback to mock
      const res = await fetch("/api/experience");
      if (!res.ok) throw new Error();
      const result = await res.json();
      setExperience(result.data && result.data.length ? result.data : mockData.experience);
    } catch {
      setExperience(mockData.experience);
    } finally {
      setLoading(false);
    }
  }

  function openEdit(exp) {
    setEditingExp(exp);
    setModalOpen(true);
  }
  function openCreate() {
    setEditingExp(null);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setEditingExp(null);
  }


  function handleSave(data) {
    if (editingExp) {
      // Update
      setExperience((prev) => prev.map((e) => (e.id === editingExp.id ? { ...e, ...data } : e)));
    } else {
      // Add
      setExperience((prev) => [
        ...prev,
        { ...data, id: Date.now() },
      ]);
    }
    closeModal();
  }

  function handleDelete(id) {
    setExperience((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Experience</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={openCreate}>
          + Add Experience
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experience.map((exp) => (
            <div key={exp.id} className="bg-white rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-blue-700">{exp.company}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">{exp.type}</span>
                </div>
                <div className="text-sm text-gray-600 font-medium mb-1">{exp.role}</div>
                <div className="text-xs text-gray-400 mb-2">{exp.period} | {exp.location}</div>
                <div className="text-gray-700 mb-2">{exp.description}</div>
                <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
                  {exp.achievements?.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
                <div className="flex flex-wrap gap-2 mt-2">
                  {exp.technologies?.map((t, i) => (
                    <span key={i} className="bg-gray-100 text-xs px-2 py-1 rounded-full text-gray-700 border border-gray-200">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="text-blue-600 font-semibold" onClick={() => openEdit(exp)}>Edit</button>
                <button className="text-red-500 font-semibold" onClick={() => handleDelete(exp.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ExperienceModal
        open={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        editingExp={editingExp}
      />
    </div>
  );
}
