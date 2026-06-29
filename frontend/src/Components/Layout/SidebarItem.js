import React from "react";

function SidebarItem({ icon, label, isOpen, isLogout = false, onClick, isActive }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-2 rounded cursor-pointer ${
        isLogout ? "hover:bg-red-700" : "hover:bg-blue-700"
      } ${isActive ? "bg-blue-700 text-white" : ""}`}
    >
      <span className="text-xl">{icon}</span>
      {isOpen && <span className="text-sm">{label}</span>}
    </div>
  );
}

export default SidebarItem;
