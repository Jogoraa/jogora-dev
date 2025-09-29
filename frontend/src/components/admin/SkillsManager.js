import React, { useEffect, useState } from "react";
import { mockData } from "../../data/mockData";

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    setLoading(true);
    try {
      // Try API, fallback to mock
      const res = await fetch("/api/skills");
      if (!res.ok) throw new Error();
      const result = await res.json();
      setSkills(result.data && result.data.length ? result.data : mockData.skills);
    } catch {
      setSkills(mockData.skills);
    } finally {
      setLoading(false);
    }
  }

  function openEdit(skill) {
    setEditingSkill(skill);
    setModalOpen(true);
  }
  function openCreate() {
    setEditingSkill(null);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setEditingSkill(null);
  }

  function handleSave(data) {
    if (editingSkill) {
      setSkills((prev) => prev.map((s) => (s.category === editingSkill.category ? { ...s, ...data } : s)));
    } else {
      setSkills((prev) => [
        ...prev,
        { ...data, id: Date.now() },
      ]);
    }
    closeModal();
  }

  function handleDelete(category) {
    setSkills((prev) => prev.filter((s) => s.category !== category));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={openCreate}>
          + Add Skill Category
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill.category} className="bg-white rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-blue-700">{skill.category}</span>
                </div>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {skill.items?.map((item, i) => (
                    <li key={i} className="bg-gray-100 text-xs px-2 py-1 rounded-full text-gray-700 border border-gray-200">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="text-blue-600 font-semibold" onClick={() => openEdit(skill)}>Edit</button>
                <button className="text-red-500 font-semibold" onClick={() => handleDelete(skill.category)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {modalOpen && (
        <SkillModal
          open={modalOpen}
          onClose={closeModal}
          onSave={handleSave}
          editingSkill={editingSkill}
        />
      )}
    </div>
  );
}

function SkillModal({ open, onClose, onSave, editingSkill }) {
  const [form, setForm] = useState({
    category: "",
    items: "",
  });

  useEffect(() => {
    if (editingSkill) {
      setForm({
        category: editingSkill.category || "",
        items: (editingSkill.items || []).join(", "),
      });
    } else {
      setForm({ category: "", items: "" });
    }
  }, [editingSkill, open]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      ...form,
      items: form.items.split(",").map((i) => i.trim()).filter(Boolean),
    };
    onSave(data);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto">
      <form
        className="bg-white p-8 rounded-lg shadow w-full max-w-md grid grid-cols-1 gap-6 max-h-[90vh] overflow-y-auto"
        onSubmit={handleSubmit}
        style={{ minWidth: 320 }}
      >
        <div>
          <h3 className="text-2xl font-bold mb-4">
            {editingSkill ? "Edit Skill Category" : "Add Skill Category"}
          </h3>
        </div>
        <div className="relative mb-3">
          <input name="category" value={form.category} onChange={handleChange} required placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Category</label>
        </div>
        <div className="relative mb-3">
          <input name="items" value={form.items} onChange={handleChange} required placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Skills (comma separated)</label>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
