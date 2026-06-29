import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from "./Layout/Sidebar";
import Header from "./Layout/Header";

function SettingsPage() {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: ''
  });
  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: '',
    newPassword: ''
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem('token');
   const role = localStorage.getItem("role");

  const handleInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };
   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handlePasswordChange = (e) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
  };

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        'http://https://hospital-management-backend-mqyh.onrender.com/api/settings/update-info',
        personalInfo,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || 'Info updated successfully!');
    } catch (err) {
      setMessage('Error updating info.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        'http://https://hospital-management-backend-mqyh.onrender.com/api/settings/change-password',
        passwordInfo,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || 'Password changed successfully!');
    } catch (err) {
      setMessage('Error changing password.');
    }
  };

  return (
     <div className=" overflow-hidden flex-col min-h-screen">
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} role={role} />
         <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      {/* Personal Info */}
      <form onSubmit={handleInfoSubmit} className="space-y-4 mb-6 bg-white p-4 shadow rounded">
        <h2 className="text-xl font-medium">Personal Info</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={personalInfo.name}
          onChange={handleInfoChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={personalInfo.email}
          onChange={handleInfoChange}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Info</button>
      </form>

      {/* Password Change */}
      <form onSubmit={handlePasswordSubmit} className="space-y-4 bg-white p-4 shadow rounded">
        <h2 className="text-xl font-medium">Change Password</h2>
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={passwordInfo.oldPassword}
          onChange={handlePasswordChange}
          className="w-full border p-2 rounded"
           autoComplete="current-password"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={passwordInfo.newPassword}
          onChange={handlePasswordChange}
          className="w-full border p-2 rounded"
           autoComplete="new-password"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Change Password</button>
      </form>
    </main>
     </div>
      </div>
    </div>
  );
}

export default SettingsPage;
