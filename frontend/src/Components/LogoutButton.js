import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all stored data
    navigate("/login");   // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md"
    >
      {/* <FaSignOutAlt className="mr-2" />  */}
      Logout
    </button>
  );
};

export default LogoutButton;
