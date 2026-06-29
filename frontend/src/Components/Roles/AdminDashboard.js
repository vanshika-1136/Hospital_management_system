import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [icus, setIcus] = useState([]);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [visibleComments, setVisibleComments] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);



  useEffect(() => {
    const fetchIcusWithPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIcus(res.data);
      } catch (err) {
        console.error("Error fetching data:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchIcusWithPatients();
  }, [token]);

  const toggleComments = async (patientId) => {
    const isVisible = visibleComments[patientId];
    if (isVisible) {
      setVisibleComments((prev) => ({ ...prev, [patientId]: false }));
    } else {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments((prev) => ({ ...prev, [patientId]: res.data }));
        setVisibleComments((prev) => ({ ...prev, [patientId]: true }));
      } catch (err) {
        console.error("Error fetching comments:", err.response?.data || err.message);
      }
    }
  };

  const handleChange = (patientId, value) => {
    setNewComments((prev) => ({ ...prev, [patientId]: value }));
  };

  const handleSubmit = async (patientId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/comments",
        {
          patientId,
          comment: newComments[patientId],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewComments((prev) => ({ ...prev, [patientId]: "" }));
      toggleComments(patientId);
    } catch (err) {
      console.error("Error submitting comment:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex-col min-h-screen">
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} role={role} />

        {/* Main Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Content */}
          <main className="flex-1 p-6 overflow-y-hidden">
            {loading ? (
              <p>Loading Admin Dashboard...</p>
            ) : (
              <>
                {/* ICU Tags */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2 text-gray-700">All ICUs</h2>
                  <div className="flex flex-wrap gap-3">
                    {icus.map((icu) => (
                      <div
                        key={icu.icu_id}
                        onClick={() => {
                          const section = document.getElementById(`icu-${icu.icu_id}`);
                          if (section) section.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="border border-gray-300 rounded px-4 py-2 text-sm shadow hover:bg-blue-100 transition cursor-pointer bg-blue-200"
                      >
                        {icu.icu_name}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mb-4">
                    <button
                      onClick={() => navigate("/add-patient")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow"
                    >
                      Add Patient
                    </button>
                  </div>
                </div>

                {/* ICU Patient Cards */}
                <div className="w-full overflow-x-auto">
                  <div className="flex gap-4">
                    {icus.map((icu) => (
                      <div
                        key={icu.icu_id}
                        id={`icu-${icu.icu_id}`}
                        className="w-full flex-shrink-0 rounded p-4 shadow-md border h-[500px] overflow-y-auto bg-blue-100 "
                      >
                        <h2 className="text-4xl font-bold mb-2 ">{icu.icu_name}</h2>
                        <p className="text-xl mb-3 text-gray-900">
                          ICU Head: {icu.icu_head_name}
                        </p>

                        {icu.patients.filter((p) =>
                          p.name.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length === 0 ? (
                          <p>No patient found in this ICU.</p>
                        ) : (
                          icu.patients
                            .filter((p) =>
                              p.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((patient) => (
                              <div
                                key={patient.id}
                                className="border border-pink-300 p-3 mb-3 rounded bg-pink-50 shadow w-full flex-shrink-0"
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium">Patient Name:</span>
                                    <span className="font-semibold">{patient.name}</span>
                                  </div>
                                  <button
                                    onClick={() => navigate(`/edit-patient/${patient.id}`)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                                  >
                                    Edit
                                  </button>
                                </div>

                                <p>Age: {patient.age}</p>

                                <textarea
                                  placeholder="Add comment..."
                                  value={newComments[patient.id] || ""}
                                  onChange={(e) => handleChange(patient.id, e.target.value)}
                                  className="w-full border border-pink-200 p-2 rounded mt-2 bg-pink-50"
                                />
                                <button
                                  onClick={() => handleSubmit(patient.id)}
                                  className="bg-blue-600 text-white px-4 py-1 rounded mt-1"
                                >
                                  Submit
                                </button>

                                <div className="mt-2">
                                  <button
                                    className="text-blue-500 underline"
                                    onClick={() => toggleComments(patient.id)}
                                  >
                                    {visibleComments[patient.id]
                                      ? "Unload Comments"
                                      : "Load Comments"}
                                  </button>
                                  {visibleComments[patient.id] && (
                                    <ul className="ml-4 mt-2 list-disc">
                                      {(comments[patient.id] || []).map((c, i) => (
                                        <li key={i}>
                                          <strong>{c.commenter}</strong>: {c.comment}{" "}
                                          <small>
                                            ({new Date(c.created_at).toLocaleString()})
                                          </small>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </div>
                            ))
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaBars, FaHome, FaUserMd, FaFileMedical, FaCog, FaSignOutAlt, FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// function SidebarItem({ icon, label, isOpen, isLogout = false,onClick ,isActive}) {
//   return (
//     <div
//       onClick= {onClick}
//       className={`flex items-center gap-4 p-2 rounded cursor-pointer ${
//       isLogout ? "hover:bg-red-700" : "hover:bg-blue-700"}
//       ${isActive ? "bg-blue-700 text-white" : ""}
//       }`}
//     >
//       <span className="text-xl">{icon}</span>
//       {isOpen && <span className="text-sm">{label}</span>}
//     </div>
//   );
// }


// function AdminDashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [icus, setIcus] = useState([]);
//   const [comments, setComments] = useState({});
//   const [newComments, setNewComments] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [visibleComments, setVisibleComments] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");
//  const location = useLocation();
 

  

//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
//     const isActive = (path) => location.pathname.startsWith(path);
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const dashboardPath =
//   role === 'admin'
//     ? '/admin-dashboard'
//     : role === 'icu_head'
//     ? '/icu-dashboard'
//     : role === 'doctor'
//     ? '/doctor-dashboard'
//     :role ==='patient'
//     ? '/patient-dashboard'
//     : '/';

//   const handleDashboardClick = () => {
//    navigate(dashboardPath);};

//   useEffect(() => {
//     const fetchIcusWithPatients = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/admin/patients", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setIcus(res.data);
//       } catch (err) {
//         console.error("Error fetching data:", err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) fetchIcusWithPatients();
//   }, [token]);

//   const toggleComments = async (patientId) => {
//     const isVisible = visibleComments[patientId];
//     if (isVisible) {
//       setVisibleComments((prev) => ({ ...prev, [patientId]: false }));
//     } else {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/comments/${patientId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setComments((prev) => ({ ...prev, [patientId]: res.data }));
//         setVisibleComments((prev) => ({ ...prev, [patientId]: true }));
//       } catch (err) {
//         console.error("Error fetching comments:", err.response?.data || err.message);
//       }
//     }
//   };

//   const handleChange = (patientId, value) => {
//     setNewComments((prev) => ({ ...prev, [patientId]: value }));
//   };

//   const handleSubmit = async (patientId) => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/comments",
//         {
//           patientId,
//           comment: newComments[patientId],
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setNewComments((prev) => ({ ...prev, [patientId]: "" }));
//       toggleComments(patientId);
//     } catch (err) {
//       console.error("Error submitting comment:", err.response?.data || err.message);
//     }
//   };
//       const handleLogout = () => {
//     localStorage.clear(); // logout logic
//     navigate("/login");
//   };
//   return (
//     <div className=" flex-col min-h-screen ">
//       <div className="flex h-screen bg-gray-100 ">
//         {/* Sidebar */}
//         <aside
//           className={`flex flex-col justify-between bg-blue-900 text-white transition-all duration-300 ${
//             isSidebarOpen ? "w-64" : "w-20"
//           } p-4`}
//         >
//           <div>
//             <button
//               onClick={toggleSidebar}
//               className="text-white text-2xl mb-6"
//             >
//               <FaBars />
//             </button>

//             <div className="flex flex-col items-center mb-6">
//               <img
//                 src="https://randomuser.me/api/portraits/men/60.jpg"
//                 alt="Admin"
//                 className="rounded-full w-16 h-16 border-2 border-white"
//               />
//               {isSidebarOpen && (
//                 <p className="mt-2 text-sm font-medium">Admin</p>
//               )}
//             </div>

//             <nav className="flex flex-col space-y-4">
//               <SidebarItem
//                 icon={<FaHome />}
//                 label="Home"
//                 isOpen={isSidebarOpen}
//                 onClick={handleDashboardClick}
//                 isActive={isActive(dashboardPath)}
//               />
//               <SidebarItem
//                 icon={<FaUserMd />}
//                 label="ICU's"
//                 isOpen={isSidebarOpen}
//                 onClick={()=>navigate("/admin/icu-heads")}
//               />
//               <SidebarItem
//                 icon={<FaFileMedical />}
//                 label="Add Patients"
//                 isOpen={isSidebarOpen}
//                 onClick={() => navigate("/add-patient")}
//                 isActive={isActive("/add-patient")}
//               />
//               <SidebarItem
//                 icon={<FaCog />}
//                 label="Settings"
//                 isOpen={isSidebarOpen}
//                   onClick={() => navigate("/settings")}
//   isActive={isActive("/settings")}
//               />
//             </nav>
//           </div>

//           <SidebarItem
//             icon={<FaSignOutAlt />}
//             label="Logout"
//             isOpen={isSidebarOpen}
//             onClick={handleLogout}
//             isLogout
//           />
           
//         </aside>

//         {/* Main Area */}
//         <div className="flex flex-col flex-1 overflow-hidden">
//           {/* Header */}
//           <header className="bg-white shadow px-4 py-3 flex items-center justify-between relative">
//             <div className="w-6"></div>
//             <h1 className="text-xl font-bold text-blue-900 text-center flex-1">
//               Admin Dashboard
//             </h1>
//             <div
//               className={`flex items-center bg-gray-100 border border-gray-300 rounded-md px-2 py-1`}
//             >
//               <FaSearch className="text-gray-500 mr-2" />
//               <input
//                 type="text"
//                 placeholder="Search by patient name..."
//                 value={searchTerm}
//                 onChange={(e)=> setSearchTerm(e.target.value)}
//                 className="bg-transparent outline-none w-full"
//               />
//             </div>
//           </header>

//           {/* Content */}
//           <main className="flex-1  p-6 overflow-y-hidden">
           

//             {loading ? (
//               <p>Loading Admin Dashboard...</p>
//             ) : (
//               <>
//                 {/* ICU Tags */}
//                 <div className="mb-6 ">
//                   <h2 className="text-lg font-semibold mb-2 text-gray-700">
//                     All ICUs
//                   </h2>
                  
//                   <div className="flex flex-wrap gap-3">
//                     {icus.map((icu) => (
//                       <div
//                         key={icu.icu_id}
//                         onClick={() => {
//                           const section = document.getElementById(
//                             `icu-${icu.icu_id}`
//                           );
//                           if (section)
//                             section.scrollIntoView({ behavior: "smooth" });
//                         }}
//                         className="border border-gray-300 rounded px-4 py-2 text-sm shadow hover:bg-blue-100 transition cursor-pointer bg-blue-200"
//                       >
//                         {icu.icu_name}
//                       </div>
//                     ))}
//                   </div> 

//                    <div className="flex justify-end mb-4">
//               <button
//                 onClick={() => navigate("/add-patient")}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow"
//               >
//                 Add Patient
//               </button>
            
//            </div>
//                 </div>

//                 {/* ICU Patient Cards */}
// <div className="w-full overflow-x-auto ">
//   <div className="flex gap-4 ">
//   {icus.map((icu) => (
//     <div
//       key={icu.icu_id}
//       id={`icu-${icu.icu_id}`}
//       className=" w-full flex-shrink-0 rounded p-4 shadow-md border  h-[500px] overflow-y-auto  bg-blue-100"
//     >
//       <div className="border-blue-200">
//       <h2 className="text-xl font-bold mb-2">{icu.icu_name}</h2>
//       <p className="text-sm mb-3 text-gray-700">
//         ICU Head: {icu.icu_head_name}
//       </p>

//       {icu.patients.filter((patient) =>
//   patient.name.toLowerCase().includes(searchTerm.toLowerCase())
// ).length === 0 ? (
//   <p>No patient found in this ICU.</p>

//       ) : (
//         // icu.patients.map((patient) => (


//           icu.patients
//   .filter((patient) =>
//     patient.name.toLowerCase().includes(searchTerm.toLowerCase())
//   )
//   .map((patient) => (


//           <div
//             key={patient.id}
//             className="border border-pink-300 p-3 mb-3 rounded bg-pink-50 shadow w-full flex-shrink-0"
//           >
//             <div className="flex justify-between items-center">
//               <div className="flex items-center space-x-2" >
//               <h3 className="flex">Patient Name :</h3>
//               <h3 className="font-semibold ">{patient.name}</h3>
//               </div>
//               <button
//                 onClick={() => navigate(`/edit-patient/${patient.id}`)}
//                 className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
//               >
//                 Edit
//               </button>
//             </div>

//             <p>Age: {patient.age}</p>
//             {/* <p>Doctor assigned: {patient.doctor_name || "Not assigned"}</p> */}

//             <textarea
//               placeholder="Add comment..."
//               value={newComments[patient.id] || ""}
//               onChange={(e) => handleChange(patient.id, e.target.value)}
//               className="w-full border border-pink-200 p-2 rounded mt-2 bg-pink-50"
//             />
//             <button
//               onClick={() => handleSubmit(patient.id)}
//               className="bg-blue-600 text-white px-4 py-1 rounded mt-1"
//             >
//               Submit
//             </button>
             
//             <div className="mt-2">
//               <button
//                 className="text-blue-500 underline"
//                 onClick={() => toggleComments(patient.id)}
//               >
//                 {visibleComments[patient.id] ? "Unload Comments" : "Load Comments"}
//               </button>
//               {visibleComments[patient.id] && (
//                 <ul className="ml-4 mt-2 list-disc">
//                   {(comments[patient.id] || []).map((c, i) => (
//                     <li key={i}>
//                       <strong>{c.commenter}</strong>: {c.comment}{" "}
//                       <small>({new Date(c.created_at).toLocaleString()})</small>
//                     </li>
//                   ))}
//                 </ul>
                
//               )}
//             </div>
//           </div>
//         ))
//       )}
//       </div>
//     </div>
     
//   ))}
//   </div>
 
// </div>


//               </>
//             )}
//           </main>

//           {/* Footer
//         <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600 ">
//           &copy; {new Date().getFullYear()} Medicare All rights reserved.
//         </footer> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

