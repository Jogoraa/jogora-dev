import React, { useEffect, useState } from "react";
import { mockData } from "../../data/mockData";

export default function CertificationsManager() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);

  useEffect(() => {
    fetchCerts();
  }, []);

  async function fetchCerts() {
    setLoading(true);
    try {
      const res = await fetch("/api/certifications");
      if (!res.ok) throw new Error();
      const result = await res.json();
      setCerts(result.data && result.data.length ? result.data : mockData.certifications);
    } catch {
      setCerts(mockData.certifications);
    } finally {
      setLoading(false);
    }
  }

  function openEdit(cert) {
    setEditingCert(cert);
    setModalOpen(true);
  }
  function openCreate() {
    setEditingCert(null);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setEditingCert(null);
  }

  function handleSave(data) {
    if (editingCert) {
      setCerts((prev) => prev.map((c) => (c.credentialId === editingCert.credentialId ? { ...c, ...data } : c)));
    } else {
      setCerts((prev) => [
        ...prev,
        { ...data, credentialId: `CERT-${Date.now()}` },
      ]);
    }
    closeModal();
  }

  function handleDelete(credentialId) {
    setCerts((prev) => prev.filter((c) => c.credentialId !== credentialId));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Certifications</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={openCreate}>
          + Add Certification
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certs.map((cert) => (
            <div key={cert.credentialId} className="bg-white rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-blue-700">{cert.name}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">{cert.date}</span>
                </div>
                <div className="text-sm text-gray-600 font-medium mb-1">{cert.issuer}</div>
                <div className="text-xs text-gray-400 mb-2">Credential ID: {cert.credentialId}</div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="text-blue-600 font-semibold" onClick={() => openEdit(cert)}>Edit</button>
                <button className="text-red-500 font-semibold" onClick={() => handleDelete(cert.credentialId)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {modalOpen && (
        <CertificationModal
          open={modalOpen}
          onClose={closeModal}
          onSave={handleSave}
          editingCert={editingCert}
        />
      )}
    </div>
  );
}

function CertificationModal({ open, onClose, onSave, editingCert }) {
  const [form, setForm] = useState({
    name: "",
    issuer: "",
    date: "",
    credentialId: "",
  });

  useEffect(() => {
    if (editingCert) {
      setForm({
        name: editingCert.name || "",
        issuer: editingCert.issuer || "",
        date: editingCert.date || "",
        credentialId: editingCert.credentialId || "",
      });
    } else {
      setForm({ name: "", issuer: "", date: "", credentialId: "" });
    }
  }, [editingCert, open]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
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
            {editingCert ? "Edit Certification" : "Add Certification"}
          </h3>
        </div>
        <div className="relative mb-3">
          <input name="name" value={form.name} onChange={handleChange} required placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Certification Name</label>
        </div>
        <div className="relative mb-3">
          <input name="issuer" value={form.issuer} onChange={handleChange} required placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Issuer</label>
        </div>
        <div className="relative mb-3">
          <input name="date" value={form.date} onChange={handleChange} required placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Date</label>
        </div>
        <div className="relative mb-3">
          <input name="credentialId" value={form.credentialId} onChange={handleChange} placeholder=" " className="peer w-full bg-gray-50 border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-focus:text-blue-600 peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none">Credential ID</label>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
