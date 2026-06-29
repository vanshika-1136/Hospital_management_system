import React, { useState } from "react";
import axios from "axios";
import {
  FaBars,
  FaHome,
  FaUser,
  FaUserMd,
  FaFileMedical,
  FaCog,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const categories = [
    { label: "General Physician", icon: "🩺" },
    { label: "Skin & Hair", icon: "💆‍♀️" },
    { label: "Women's Health", icon: "🤰" },
    { label: "Dental Care", icon: "🦷" },
    { label: "Child Specialist", icon: "🧒" },
    { label: "Ear, Nose, Throat", icon: "👂" },
    { label: "Mental Wellness", icon: "🧠" },
    { label: "More", icon: "➕" },
  ];

  const fetchDoctors = async (specialization) => {
    setLoading(true);
    setError(null);
    try {
    const encodedSpec = encodeURIComponent(specialization);
    const res = await axios.get(`http://localhost:5000/api/doctors?specialization=${encodedSpec}`);
    setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to fetch doctors.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (label) => {
    console.log("Clicked:",label);
    setSelectedCategory(label);
    fetchDoctors(label);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`flex flex-col justify-between bg-blue-900 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } p-4`}
      >
        <div>
          <button onClick={toggleSidebar} className="text-white text-2xl mb-6">
            <FaBars />
          </button>

          <div className="flex flex-col items-center mb-6">
            <img
              src="https://randomuser.me/api/portraits/men/60.jpg"
              alt="Doctor"
              className="rounded-full w-16 h-16 border-2 border-white"
            />
            {isSidebarOpen && (
              <p className="mt-2 text-sm font-medium">John Doe</p>
            )}
          </div>

          <nav className="flex flex-col space-y-4">
            <SidebarItem icon={<FaHome />} label="Home" isOpen={isSidebarOpen} />
            <SidebarItem icon={<FaUser />} label="Personal Info" isOpen={isSidebarOpen} />
            <SidebarItem icon={<FaUserMd />} label="My Doctors" isOpen={isSidebarOpen} />
            <SidebarItem icon={<FaFileMedical />} label="Medical Records" isOpen={isSidebarOpen} />
            <SidebarItem icon={<FaCog />} label="Settings" isOpen={isSidebarOpen} />
          </nav>
        </div>

        <SidebarItem icon={<FaSignOutAlt />} label="Logout" isOpen={isSidebarOpen} isLogout />
      </aside>

      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow px-4 py-3 flex items-center justify-between relative">
          <div className="w-6"></div>
          <h1 className="text-xl font-bold text-blue-900 text-center flex-1 hidden sm:block">
            Medicare
          </h1>
          <div
            className={`flex items-center bg-gray-100 border border-gray-300 rounded-md px-2 py-1 transition-all duration-300 ${
              isSidebarOpen ? "w-64" : "w-full max-w-md"
            }`}
          >
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Find a Doctor for your Health Problem
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
              {categories.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(item.label)}
                  className="flex flex-col items-center hover:bg-blue-100 cursor-pointer p-2 rounded-md"
                >
                  <div className="w-20 h-20 rounded-lg bg-blue-50 flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <span className="mt-2 text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

            {selectedCategory && (
              <div className="mt-6">
                <h3 className="text-md font-semibold mb-3 text-blue-900">
                  Doctors for: {selectedCategory}
                </h3>

                {loading && <p className="text-blue-600">Loading doctors...</p>}
                {error && <p className="text-red-600">{error}</p>}

                <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-4">
                  {doctors.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center p-4 bg-white rounded-lg shadow-md"
                    >
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800">{doc.name}</h4>
                        <p className="text-sm text-gray-600">{doc.specialization}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Medicare. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, isOpen, isLogout = false }) {
  return (
    <div
      className={`flex items-center gap-4 p-2 rounded cursor-pointer ${
        isLogout ? "hover:bg-red-700" : "hover:bg-blue-700"
      }`}
    >
      <span className="text-xl">{icon}</span>
      {isOpen && <span className="text-sm">{label}</span>}
    </div>
  );
}


// import React, { useState } from "react";
// import axios from "axios";

// import {
//   FaBars,
//   FaHome,
//   FaUser,
//   FaUserMd,
//   FaFileMedical,
//   FaCog,
//   FaSignOutAlt,
//   FaSearch,
// } from "react-icons/fa";

// export default function DashboardLayout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   

//   const categories = [
//     { label: "General Physician", icon: "🩺" },
//     { label: "Skin & Hair", icon: "💆‍♀️" },
//     { label: "Women's Health", icon: "🤰" },
//     { label: "Dental Care", icon: "🦷" },
//     { label: "Child Specialist", icon: "🧒" },
//     { label: "Ear, Nose, Throat", icon: "👂" },
//     { label: "Mental Wellness", icon: "🧠" },
//     { label: "More", icon: "➕" },
//   ];

//     const fetchDoctors = async (specialization) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/doctors/${specialization}`);
//       setDoctors(res.data);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };

//   const handleCategoryClick = (label) => {
//     setSelectedCategory(label);
//     fetchDoctors(label);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`flex flex-col justify-between bg-blue-900 text-white transition-all duration-300 ${
//           isSidebarOpen ? "w-64" : "w-20"
//         } p-4`}
//       >
//         <div>
//           <button onClick={toggleSidebar} className="text-white text-2xl mb-6">
//             <FaBars />
//           </button>

//           <div className="flex flex-col items-center mb-6">
//             <img
//               src="https://via.placeholder.com/60"
//               alt="User"
//               className="rounded-full w-16 h-16 border-2 border-white"
//             />
//             {isSidebarOpen && (
//               <p className="mt-2 text-sm font-medium">John Doe</p>
//             )}
//           </div>

//           <nav className="flex flex-col space-y-4">
//             <SidebarItem
//               icon={<FaHome />}
//               label="Home"
//               isOpen={isSidebarOpen}
//             />
//             <SidebarItem
//               icon={<FaUser />}
//               label="Personal Info"
//               isOpen={isSidebarOpen}
//             />
//             <SidebarItem
//               icon={<FaUserMd />}
//               label="My Doctors"
//               isOpen={isSidebarOpen}
//             />
//             <SidebarItem
//               icon={<FaFileMedical />}
//               label="Medical Records"
//               isOpen={isSidebarOpen}
//             />
//             <SidebarItem
//               icon={<FaCog />}
//               label="Settings"
//               isOpen={isSidebarOpen}
//             />
//           </nav>
//         </div>

//         <SidebarItem
//           icon={<FaSignOutAlt />}
//           label="Logout"
//           isOpen={isSidebarOpen}
//           isLogout
//         />
//       </aside>

//       {/* Main Area */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         {/* Header */}
//         <header className="bg-white shadow px-4 py-3 flex items-center justify-between relative">
//           {/* Left: Sidebar toggle button (invisible placeholder if needed) */}
//           <div className="w-6"></div>

//           {/* Center: App name */}
//           <h1 className="text-xl font-bold text-blue-900 text-center flex-1 hidden sm:block">
//             Medicare
//           </h1>

//           {/* Right: Search bar (optional) */}
//           <div
//             className={`flex items-center bg-gray-100 border border-gray-300 rounded-md px-2 py-1 transition-all duration-300 ${
//               isSidebarOpen ? "w-64" : "w-full max-w-md"
//             }`}
//           >
//             <FaSearch className="text-gray-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-transparent outline-none w-full"
//             />
//           </div>
//         </header>
        

//          {/* Scrollable Doctor List */}
//       {selectedCategory && (
//         <div>
//           <h3 className="text-md font-semibold mb-3 text-blue-900">
//             Doctors for: {selectedCategory}
//           </h3>

//           <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-4">
//             {doctors.map((doc, idx) => (
//               <div
//                 key={idx}
//                 className="flex items-center p-4 bg-white rounded-lg shadow-md"
//               >
//                 <img
//                   src={doc.image}
//                   alt={doc.name}
//                   className="w-16 h-16 rounded-full object-cover mr-4"
//                 />
//                 <div>
//                   <h4 className="font-bold text-gray-800">{doc.name}</h4>
//                   <p className="text-sm text-gray-600">{doc.specialization}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="p-4">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               Find a Doctor for your Health Problem
//             </h2>

//             <div className="grid grid-cols-4 gap-4 text-center text-sm">
//               {categories.map((item, index) => (
//                 <div key={index} className="flex flex-col items-center  hover:bg-blue-100">
//                   <div className="w-20 h-20 rounded-lg bg-blue-50 flex items-center justify-center text-2xl">
//                     {item.icon}
//                   </div>
//                   <span className=" mt-2 text-gray-700 ">{item.label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </main>

//         {/* Footer */}
//         <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
//           &copy; {new Date().getFullYear()} Medicare. All rights reserved.
//         </footer>
//       </div>
//     </div>
//   );
// }

// function SidebarItem({ icon, label, isOpen, isLogout = false }) {
//   return (
//     <div
//       className={`flex items-center gap-4 p-2 rounded cursor-pointer ${
//         isLogout ? "hover:bg-red-700" : "hover:bg-blue-700"
//       }`}
//     >
//       <span className="text-xl">{icon}</span>
//       {isOpen && <span className="text-sm">{label}</span>}
//     </div>
//   );
// }

// min-h-screen on the container ensures page fills the screen even with less content.

// flex-1 on <main> makes it grow and push the footer down.

// No fixed or sticky on the footer — it only shows when you scroll down.
