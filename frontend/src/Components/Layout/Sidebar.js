import React from "react";
import { FaBars, FaHome, FaUserMd, FaFileMedical, FaCog, FaSignOutAlt } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ isSidebarOpen, toggleSidebar, role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  const dashboardPath =
    role === 'admin' ? '/admin-dashboard'
    : role === 'icu_head' ? '/icu-dashboard'
    : role === 'doctor' ? '/doctor-dashboard'
    : role === 'patient' ? '/patient-dashboard'
    : '/';

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className={`flex flex-col justify-between bg-blue-900 text-white transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} p-4`}>
      <div>
        <button onClick={toggleSidebar} className="text-white text-2xl mb-6">
          <FaBars />
        </button>
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://randomuser.me/api/portraits/men/60.jpg"
            alt="Admin"
            className="rounded-full w-16 h-16 border-2 border-white"
          />
          {isSidebarOpen && (
            <p className="mt-2 text-sm font-medium">Admin</p>
          )}
        </div>
        <nav className="flex flex-col space-y-4">
          <SidebarItem icon={<FaHome />} label="Home" isOpen={isSidebarOpen} onClick={() => navigate(dashboardPath)} isActive={isActive(dashboardPath)} />
          <SidebarItem icon={<FaUserMd />} label="ICU's" isOpen={isSidebarOpen} onClick={() => navigate("/admin/icu-heads")} isActive={isActive("/admin/icu-heads")} />
          <SidebarItem icon={<FaFileMedical />} label="Add Patients" isOpen={isSidebarOpen} onClick={() => navigate("/add-patient")} isActive={isActive("/add-patient")} />
          <SidebarItem icon={<FaCog />} label="Settings" isOpen={isSidebarOpen} onClick={() => navigate("/settings")} isActive={isActive("/settings")} />
        </nav>
      </div>
      <SidebarItem icon={<FaSignOutAlt />} label="Logout" isOpen={isSidebarOpen} onClick={handleLogout} isLogout />
    </aside>
  );
}

export default Sidebar;
