import React, { useState, useEffect } from "react";

// Mock profile data (replace with API integration as needed)
const mockProfile = {
  name: "Dave Jogora",
  title: "Full Stack Developer",
  avatar: "/profile-avatar.png", // Place a profile image in public/ or use a placeholder
  bio: "Passionate developer with a love for building beautiful, scalable web applications. Experienced in React, FastAPI, and cloud technologies.",
  email: "dave.jogora@example.com",
  phone: "+123 456 7890",
  location: "Nairobi, Kenya",
  website: "https://jogora.dev",
  socials: {
    github: "https://github.com/jogoraa",
    linkedin: "https://linkedin.com/in/jogoraa",
    twitter: "https://twitter.com/jogoraa",
  },
};

export default function ProfileManager() {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    // Simulate fetch
    setProfile(mockProfile);
    setForm(mockProfile);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSocialChange(e) {
    setForm({ ...form, socials: { ...form.socials, [e.target.name]: e.target.value } });
  }
  function handleSave() {
    setProfile(form);
    setEdit(false);
  }
  function handleCancel() {
    setForm(profile);
    setEdit(false);
  }

  if (!profile) return <div className="text-center py-8 text-gray-400">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
      <div className="flex flex-col items-center md:w-1/3">
        <img
          src={profile.avatar}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-200 shadow mb-4 object-cover"
          onError={e => (e.target.src = 'https://ui-avatars.com/api/?name=Dave+Jogora&background=0D8ABC&color=fff')}
        />
        <h2 className="text-2xl font-bold text-blue-700 mb-1">{profile.name}</h2>
        <div className="text-blue-400 font-semibold mb-2">{profile.title}</div>
        <div className="flex gap-3 mt-2">
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-black text-gray-400 text-xl"><i className="fab fa-github"></i>🐙</a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 text-gray-400 text-xl"><i className="fab fa-linkedin"></i>💼</a>
          <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 text-gray-400 text-xl"><i className="fab fa-twitter"></i>🐦</a>
        </div>
      </div>
      <div className="flex-1">
        {edit ? (
          <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Title</label>
              <input name="title" value={form.title} onChange={handleChange} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Bio</label>
              <textarea name="bio" value={form.bio} onChange={handleChange} className="input input-bordered w-full min-h-[80px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Location</label>
                <input name="location" value={form.location} onChange={handleChange} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Website</label>
                <input name="website" value={form.website} onChange={handleChange} className="input input-bordered w-full" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">GitHub</label>
                <input name="github" value={form.socials.github} onChange={handleSocialChange} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">LinkedIn</label>
                <input name="linkedin" value={form.socials.linkedin} onChange={handleSocialChange} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Twitter</label>
                <input name="twitter" value={form.socials.twitter} onChange={handleSocialChange} className="input input-bordered w-full" />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded font-bold hover:bg-blue-700">Save</button>
              <button type="button" className="bg-gray-200 text-gray-700 px-5 py-2 rounded font-bold" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        ) : (
          <div>
            <div className="text-lg text-gray-700 mb-2 whitespace-pre-line">{profile.bio}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div><span className="font-semibold">Email:</span> {profile.email}</div>
              <div><span className="font-semibold">Phone:</span> {profile.phone}</div>
              <div><span className="font-semibold">Location:</span> {profile.location}</div>
              <div><span className="font-semibold">Website:</span> <a href={profile.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{profile.website}</a></div>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="bg-blue-600 text-white px-5 py-2 rounded font-bold hover:bg-blue-700" onClick={() => setEdit(true)}>Edit Profile</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
