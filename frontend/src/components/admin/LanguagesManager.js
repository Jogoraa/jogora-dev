import React, { useEffect, useState } from "react";
import { mockData } from "../../data/mockData";

export default function LanguagesManager() {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLang, setEditingLang] = useState(null);

  useEffect(() => {
    fetchLanguages();
  }, []);

  async function fetchLanguages() {
    setLoading(true);
    try {
      const res = await fetch("/api/languages");
      if (!res.ok) throw new Error();
      const result = await res.json();
      setLanguages(result.data && result.data.length ? result.data : mockData.languages);
    } catch {
      setLanguages(mockData.languages);
    } finally {
      setLoading(false);
    }
  }

  function openEdit(lang) {
    setEditingLang(lang);
    setModalOpen(true);
  }
  function openCreate() {
    setEditingLang(null);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setEditingLang(null);
  }

  function handleSave(data) {
    if (editingLang) {
      setLanguages((prev) => prev.map((l) => (l.name === editingLang.name ? { ...l, ...data } : l)));
    } else {
      setLanguages((prev) => [
        ...prev,
        { ...data },
      ]);
    }
    closeModal();
  }

  function handleDelete(name) {
    setLanguages((prev) => prev.filter((l) => l.name !== name));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Languages</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={openCreate}>
          + Add Language
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {languages.map((lang) => (
            <div key={lang.name} className="bg-white rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-blue-700">{lang.name}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">{lang.level}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${lang.proficiency || 0}%` }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Proficiency: {lang.proficiency || 0}%</div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="text-blue-600 font-semibold" onClick={() => openEdit(lang)}>Edit</button>
                <button className="text-red-500 font-semibold" onClick={() => handleDelete(lang.name)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {modalOpen && (
        <LanguageModal
          open={modalOpen}
          onClose={closeModal}
          onSave={handleSave}
          editingLang={editingLang}
        />
      )}
    </div>
  );
}

function LanguageModal({ open, onClose, onSave, editingLang }) {
  const [form, setForm] = useState({
    name: "",
    level: "",
    proficiency: 0,
  });

  useEffect(() => {
    if (editingLang) {
      setForm({
        name: editingLang.name || "",
        level: editingLang.level || "",
        proficiency: editingLang.proficiency || 0,
      });
    } else {
      setForm({ name: "", level: "", proficiency: 0 });
    }
  }, [editingLang, open]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "proficiency" ? Number(value) : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
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
            {editingLang ? "Edit Language" : "Add Language"}
          </h3>
        </div>
        <div className="relative mb-3">
          <input name="name" value={form.name} onChange={handleChange} required placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Language Name</label>
        </div>
        <div className="relative mb-3">
          <input name="level" value={form.level} onChange={handleChange} required placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Level (e.g. Native, Advanced)</label>
        </div>
        <div className="relative mb-3">
          <input name="proficiency" type="number" min="0" max="100" value={form.proficiency} onChange={handleChange} required placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Proficiency (%)</label>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
