import React, { useEffect, useState } from "react";

// Mock messages for demo (replace with API or real data as needed)
const mockMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Project Inquiry",
    message: "Hi, I am interested in your portfolio project. Can we discuss?",
    date: "2025-09-28 10:30",
    read: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Job Opportunity",
    message: "We have a job opening that matches your skills.",
    date: "2025-09-27 15:12",
    read: true,
  },
];

export default function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setLoading(true);
    try {
      // Replace with API call if available
      setMessages(mockMessages);
    } finally {
      setLoading(false);
    }
  }

  function markAsRead(id) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  }
  function deleteMessage(id) {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setSelected(null);
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1 bg-white rounded-xl shadow p-4 overflow-y-auto max-h-[70vh]">
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        <ul className="divide-y">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`py-3 px-2 cursor-pointer rounded transition ${selected?.id === msg.id ? "bg-blue-50" : "hover:bg-gray-50"}`}
              onClick={() => setSelected(msg)}
            >
              <div className="flex justify-between items-center">
                <span className={`font-semibold ${msg.read ? "text-gray-500" : "text-blue-700"}`}>{msg.name}</span>
                {!msg.read && <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">New</span>}
              </div>
              <div className="text-xs text-gray-400">{msg.subject}</div>
              <div className="text-xs text-gray-300">{msg.date}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-2 bg-white rounded-xl shadow p-8 flex flex-col min-h-[300px]">
        {selected ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-1">{selected.subject}</h3>
                <div className="text-sm text-gray-500 mb-1">From: <span className="font-semibold">{selected.name}</span> ({selected.email})</div>
                <div className="text-xs text-gray-400 mb-2">{selected.date}</div>
              </div>
              <div className="flex gap-2">
                {!selected.read && (
                  <button className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold" onClick={() => markAsRead(selected.id)}>Mark as Read</button>
                )}
                <button className="bg-red-100 text-red-700 px-3 py-1 rounded font-semibold" onClick={() => deleteMessage(selected.id)}>Delete</button>
              </div>
            </div>
            <div className="text-gray-700 text-base mt-4 whitespace-pre-line">{selected.message}</div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <span className="text-2xl mb-2">📬</span>
            <span>Select a message to view details</span>
          </div>
        )}
      </div>
    </div>
  );
}
