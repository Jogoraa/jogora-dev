import React, { useEffect, useState } from "react";
import { mockData } from "../../data/mockData";

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // For create/edit modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const result = await res.json();
      if (result.data && result.data.length > 0) {
        setProjects(result.data);
      } else {
        setProjects(mockData.projects);
      }
    } catch (e) {
      setError("Using mock data: " + e.message);
      setProjects(mockData.projects);
    } finally {
      setLoading(false);
    }
  }

  function openEdit(project) {
    setEditingProject(project);
    setModalOpen(true);
  }
  function openCreate() {
    setEditingProject(null);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setEditingProject(null);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  }

  async function handleSave(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    // Parse fields
    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      long_description: formData.get("long_description"),
      technologies: formData.get("technologies").split(",").map(s => s.trim()).filter(Boolean),
      featured: formData.get("featured") === "on",
      status: formData.get("status"),
      github_url: formData.get("github_url"),
      live_url: formData.get("live_url"),
      key_features: formData.get("key_features").split("\n").map(s => s.trim()).filter(Boolean),
      challenges: formData.get("challenges").split("\n").map(s => s.trim()).filter(Boolean),
      solutions: formData.get("solutions").split("\n").map(s => s.trim()).filter(Boolean),
      order_index: Number(formData.get("order_index")),
    };
    const method = editingProject ? "PUT" : "POST";
    const url = editingProject ? `/api/admin/projects/${editingProject.id}` : "/api/admin/projects";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    closeModal();
    fetchProjects();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={openCreate}>
          + Add Project
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Slug</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.title}</td>
                <td className="p-2">{p.slug}</td>
                <td className="p-2 space-x-2">
                  <button className="text-blue-600" onClick={() => openEdit(p)}>
                    Edit
                  </button>
                  <button className="text-red-600" onClick={() => handleDelete(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto">
          <form
            className="bg-white p-8 rounded-lg shadow w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[90vh] overflow-y-auto"
            onSubmit={handleSave}
            style={{ minWidth: 320 }}
          >
            <div className="md:col-span-2 lg:col-span-3">
              <h3 className="text-2xl font-bold mb-4">
                {editingProject ? "Edit Project" : "Add Project"}
              </h3>
            </div>
            <div className="relative mb-3">
              <input
                name="title"
                defaultValue={editingProject?.title || ""}
                className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Title</label>
            </div>
            <div className="relative mb-3">
              <input
                name="slug"
                defaultValue={editingProject?.slug || ""}
                className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Slug</label>
            </div>
            <div className="relative mb-3 lg:col-span-2">
              <textarea
                name="description"
                defaultValue={editingProject?.description || ""}
                className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                rows={2}
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Description</label>
            </div>
            <div className="relative mb-3 lg:col-span-2">
              <textarea
                name="long_description"
                defaultValue={editingProject?.long_description || ""}
                className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                rows={3}
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Long Description</label>
            </div>
            <div className="relative mb-3 lg:col-span-2">
              <input
                name="technologies"
                defaultValue={editingProject?.technologies?.join(", ") || ""}
                className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Technologies (comma separated)</label>
            </div>
            <div className="mb-3 flex items-center space-x-2">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={!!editingProject?.featured}
                className="accent-blue-600 w-5 h-5 rounded focus:ring-2 focus:ring-blue-400"
              />
              <label className="text-gray-700 font-medium">Featured</label>
            </div>
            <div className="relative mb-3">
              <input
                name="status"
                defaultValue={editingProject?.status || "Development"}
                className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Status</label>
            </div>
            <div className="relative mb-3">
              <input
                name="github_url"
                defaultValue={editingProject?.github_url || ""}
                className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                type="url"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">GitHub URL</label>
            </div>
            <div className="relative mb-3 lg:col-span-2">
              <input
                name="live_url"
                defaultValue={editingProject?.live_url || ""}
                className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                type="url"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Live URL</label>
            </div>
            <div className="relative mb-3 lg:col-span-2">
              <textarea
                name="key_features"
                defaultValue={editingProject?.key_features?.join("\n") || ""}
                className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                rows={2}
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Key Features (one per line)</label>
            </div>
            <div className="relative mb-3 lg:col-span-2">
              <textarea
                name="challenges"
                defaultValue={editingProject?.challenges?.join("\n") || ""}
                className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                rows={2}
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Challenges (one per line)</label>
            </div>
            <div className="relative mb-3 md:col-span-2">
              <textarea
                name="solutions"
                defaultValue={editingProject?.solutions?.join("\n") || ""}
                className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                rows={2}
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Solutions (one per line)</label>
            </div>
            <div className="relative mb-3">
              <input
                name="order_index"
                type="number"
                defaultValue={editingProject?.order_index || 0}
                className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Order Index</label>
            </div>
            <div className="flex justify-end space-x-2 mt-4 md:col-span-2 lg:col-span-3">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
