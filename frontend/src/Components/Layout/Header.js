import React from "react";
import { FaSearch } from "react-icons/fa";

function Header({ searchTerm, setSearchTerm }) {
  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between relative">
      <div className="w-6"></div>
      <h1 className="text-xl font-bold text-blue-900 text-center flex-1">Medicare</h1>
      <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-2 py-1">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by patient name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none w-full"
        />
      </div>
    </header>
  );
}

export default Header;
