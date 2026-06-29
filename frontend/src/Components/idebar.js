// src/Components/Sidebar.js
import React from "react";
import {
  FaBars,
  FaHome,
  FaUserMd,
  FaFileMedical,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SidebarItem({ icon, label, isOpen, isLogout = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-2 rounded cursor-pointer ${
        isLogout ? "hover:bg-red-700" : "hover:bg-blue-700"
      }`}
    >
      <span className="text-xl">{icon}</span>
      {isOpen && <span className="text-sm">{label}</span>}
    </div>
  );
}

const Sidebar = ({ isOpen, toggleSidebar, onLogout }) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`flex flex-col justify-between bg-blue-900 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } p-4`}
    >
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
          {isOpen && <p className="mt-2 text-sm font-medium">Admin</p>}
        </div>

        <nav className="flex flex-col space-y-4">
          <SidebarItem icon={<FaHome />} label="Dashboard" isOpen={isOpen} />
          <SidebarItem
            icon={<FaUserMd />}
            label="ICU Heads"
            isOpen={isOpen}
            onClick={() => navigate("/admin/icu-heads")}
          />
          <SidebarItem
            icon={<FaFileMedical />}
            label="All Patients"
            isOpen={isOpen}
          />
          <SidebarItem icon={<FaCog />} label="Settings" isOpen={isOpen} />
        </nav>
      </div>

      <SidebarItem
        icon={<FaSignOutAlt />}
        label="Logout"
        isOpen={isOpen}
        onClick={onLogout}
        isLogout
      />
    </aside>
  );
};

export default Sidebar;

