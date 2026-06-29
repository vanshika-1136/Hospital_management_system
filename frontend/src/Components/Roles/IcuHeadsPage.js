
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminIcuHeads = () => {
  const [icuHeads, setIcuHeads] = useState([]);
  const [icus, setIcus] = useState([]);
  const [newIcu, setNewIcu] = useState({ name: '', head_user_id: '' });
  const [editingIcu, setEditingIcu] = useState(null);

  useEffect(() => {
    fetchIcuHeads();
    fetchIcus();
  }, []);

  const fetchIcuHeads = async () => {
    try {
      const res = await axios.get('/api/users/icu-heads'); // 🛠 Correct endpoint
      setIcuHeads(res.data);
    } catch (err) {
      console.error('Error fetching ICU heads:', err);
    }
  };

  const fetchIcus = async () => {
    try {
      const res = await axios.get('/api/users/icus'); // 🛠 Correct endpoint
      setIcus(res.data);
    } catch (err) {
      console.error('Error fetching ICUs:', err);
    }
  };

  const handleAddIcu = async () => {
    try {
      await axios.post('/api/users/add-icu', newIcu); // 🛠 Correct endpoint
      setNewIcu({ name: '', head_user_id: '' });
      fetchIcus();
    } catch (err) {
      console.error('Error adding ICU:', err);
    }
  };

  const handleUpdateIcu = async () => {
    try {
      await axios.put(`/api/users/update-icu/${editingIcu.id}`, editingIcu); // 🛠 ID in URL path
      setEditingIcu(null);
      fetchIcus();
    } catch (err) {
      console.error('Error updating ICU:', err);
    }
  };

  const handleDeleteIcu = async (id) => {
    try {
      await axios.delete(`/api/users/delete-icu/${id}`); // 🛠 ID in URL path
      fetchIcus();
    } catch (err) {
      console.error('Error deleting ICU:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage ICUs</h2>

      <div className="mb-6 p-4 border rounded">
        <h3 className="font-semibold mb-2">Add New ICU</h3>
        <input
          type="text"
          placeholder="ICU Name"
          value={newIcu.name}
          onChange={(e) => setNewIcu({ ...newIcu, name: e.target.value })}
          className="border p-1 mr-2"
        />
        <select
          value={newIcu.head_user_id}
          onChange={(e) => setNewIcu({ ...newIcu, head_user_id: e.target.value })}
          className="border p-1 mr-2"
        >
          <option value="">Select ICU Head</option>
          {icuHeads.map((head) => (
            <option key={head.id} value={head.id}>
              {head.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddIcu} className="bg-blue-500 text-white px-3 py-1 rounded">
          Add ICU
        </button>
      </div>

      <h3 className="font-semibold mb-2">Existing ICUs</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ICU Name</th>
            <th className="border px-2 py-1">ICU Head</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {icus.map((icu) => (
            <tr key={icu.id}>
              <td className="border px-2 py-1">
                {editingIcu?.id === icu.id ? (
                  <input
                    value={editingIcu.name}
                    onChange={(e) => setEditingIcu({ ...editingIcu, name: e.target.value })}
                    className="border p-1"
                  />
                ) : (
                  icu.name
                )}
              </td>
              <td className="border px-2 py-1">
                {editingIcu?.id === icu.id ? (
                  <select
                    value={editingIcu.head_user_id}
                    onChange={(e) => setEditingIcu({ ...editingIcu, head_user_id: e.target.value })}
                    className="border p-1"
                  >
                    {icuHeads.map((head) => (
                      <option key={head.id} value={head.id}>
                        {head.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  icu.head_name || 'N/A'
                )}
              </td>
              <td className="border px-2 py-1 space-x-2">
                {editingIcu?.id === icu.id ? (
                  <>
                    <button onClick={handleUpdateIcu} className="bg-green-500 text-white px-2 py-1 rounded">
                      Save
                    </button>
                    <button onClick={() => setEditingIcu(null)} className="bg-gray-400 text-white px-2 py-1 rounded">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingIcu({ id: icu.id, name: icu.name, head_user_id: icu.head_user_id })}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteIcu(icu.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminIcuHeads;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../Layout/Sidebar";
// import Header from "../Layout/Header";

// function AdminIcuHeads() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [icus, setIcus] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [newIcuName, setNewIcuName] = useState("");
//   const [newHeadId, setNewHeadId] = useState("");
//   const [editIcuId, setEditIcuId] = useState(null);
//   const [editIcuName, setEditIcuName] = useState("");

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   // ✅ Fetch ICU Heads only
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/icu-heads", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch ICU heads:", err);
//     }
//   };

//   // ✅ Fetch ICU list
//   const fetchIcus = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/icus-with-heads", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIcus(res.data);
//     } catch (err) {
//       console.error("Failed to fetch ICUs:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchIcus();
//   }, []);

//   // ✅ Add ICU
//   const handleAddIcu = async () => {
//     if (!newIcuName.trim() || !newHeadId) return;
//     try {
//       await axios.post(
//         "http://localhost:5000/api/add-icu",
//         { name: newIcuName, head_user_id: newHeadId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNewIcuName("");
//       setNewHeadId("");
//       fetchIcus();
//     } catch (err) {
//       console.error("Failed to add ICU:", err);
//     }
//   };

//   // ✅ Edit ICU
//   const handleEditIcu = async () => {
//     if (!editIcuName.trim()) return;
//     try {
//       await axios.put(
//         `http://localhost:5000/api/update-icu/${editIcuId}`,
//         { name: editIcuName },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setEditIcuId(null);
//       setEditIcuName("");
//       fetchIcus();
//     } catch (err) {
//       console.error("Failed to update ICU:", err);
//     }
//   };

//   // ✅ Delete ICU
//   const handleDeleteIcu = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this ICU?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/delete-icu/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchIcus();
//     } catch (err) {
//       console.error("Failed to delete ICU:", err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} role={role} />
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//         <main className="flex-1 p-6 bg-gray-100 overflow-auto">
//           {/* ✅ Add New ICU */}
//           <div className="mb-6">
//             <h2 className="text-xl font-bold mb-2">Add New ICU</h2>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Enter ICU Name"
//                 className="border p-2 rounded w-full"
//                 value={newIcuName}
//                 onChange={(e) => setNewIcuName(e.target.value)}
//               />
//               <select
//                 value={newHeadId}
//                 onChange={(e) => setNewHeadId(e.target.value)}
//                 className="border p-2 rounded w-full"
//               >
//                 <option value="">Select ICU Head</option>
//                 {users.map((user) => (
//                   <option key={user.head_id} value={user.head_id}>
//                     {user.head_name}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//                 onClick={handleAddIcu}
//               >
//                 <FaPlus /> Add
//               </button>
//             </div>
//           </div>

//           {/* ✅ ICU List */}
//           {icus.length === 0 ? (
//             <p className="text-gray-600">No ICU data found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {icus.map((icu) => (
//                 <div
//                   key={icu.icu_id}
//                   className="bg-white p-4 rounded shadow border border-gray-200"
//                 >
//                   {editIcuId === icu.icu_id ? (
//                     <>
//                       <input
//                         type="text"
//                         value={editIcuName}
//                         onChange={(e) => setEditIcuName(e.target.value)}
//                         className="border p-2 rounded w-full mb-2"
//                       />
//                       <div className="flex gap-2">
//                         <button
//                           className="bg-green-600 text-white px-3 py-1 rounded"
//                           onClick={handleEditIcu}
//                         >
//                           Save
//                         </button>
//                         <button
//                           className="bg-gray-400 text-white px-3 py-1 rounded"
//                           onClick={() => {
//                             setEditIcuId(null);
//                             setEditIcuName("");
//                           }}
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <p><strong>ICU Name:</strong> {icu.icu_name}</p>
//                       <p><strong>ICU Head:</strong> {icu.head_name || "Not Assigned"}</p>
//                       <div className="flex gap-2 mt-3">
//                         <button
//                           className="bg-yellow-400 px-3 py-1 rounded text-white flex items-center gap-1"
//                           onClick={() => {
//                             setEditIcuId(icu.icu_id);
//                             setEditIcuName(icu.icu_name);
//                           }}
//                         >
//                           <FaEdit /> Edit
//                         </button>
//                         <button
//                           className="bg-red-500 px-3 py-1 rounded text-white flex items-center gap-1"
//                           onClick={() => handleDeleteIcu(icu.icu_id)}
//                         >
//                           <FaTrash /> Delete
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminIcuHeads;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../Layout/Sidebar";
// import Header from "../Layout/Header";

// function AdminIcuHeads() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [icus, setIcus] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [newIcuName, setNewIcuName] = useState("");
//   const [editIcuId, setEditIcuId] = useState(null);
//   const [editIcuName, setEditIcuName] = useState("");
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const [newHeadId, setNewHeadId] = useState("");
//   const [users, setUsers] = useState([]);
// const [editedHeadId, setEditedHeadId] = useState('');


//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

// //   useEffect(() => {
// //   const fetchUsers = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/icus",
// //         { name: newIcuName, head_user_id: newHeadId }, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setUsers(res.data);
// //     } catch (err) {
// //       console.error("Failed to fetch users:", err);
// //     }
// //   };

// //   fetchUsers();
// //   fetchIcus();
// // }, [token]);


//   const fetchIcus = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/icus-with-heads", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIcus(res.data);
//     } catch (err) {
//       console.error("Failed to fetch ICUs:", err);
//     }
//   };

//   useEffect(() => {
//     fetchIcus();
//   }, [token]);

//   const handleAddIcu = async () => {
//     if (!newIcuName.trim()) return;
//     try {
//       await axios.post(
//         "http://localhost:5000/api/add-icu",
//         { name: newIcuName ,head_user_id: newHeadId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNewIcuName("");
//       fetchIcus();
//     } catch (err) {
//       console.error("Failed to add ICU:", err);
//     }
//   };

//   const handleEditIcu = async () => {
//     if (!editIcuName.trim()) return;
//     try {
//       await axios.put(
//         `http://localhost:5000/api/update-icu/icus/${editIcuId}`,
//         { name: editIcuName },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setEditIcuId(null);
//       setEditIcuName("");
//       fetchIcus();
//     } catch (err) {
//       console.error("Failed to update ICU:", err);
//     }
//   };

//   const handleDeleteIcu = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this ICU?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/delete-icu/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchIcus();
//     } catch (err) {
//       console.error("Failed to delete ICU:", err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} role={role} />
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//         <main className="flex-1 p-6 bg-gray-100 overflow-auto">
//           <div className="mb-6">
//             <h2 className="text-xl font-bold mb-2">Add New ICU</h2>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Enter ICU Name"
//                 className="border p-2 rounded w-full"
//                 value={newIcuName}
//                 onChange={(e) => setNewIcuName(e.target.value)}
//               />

//               <select
//   value={newHeadId}
//   onChange={(e) => setNewHeadId(e.target.value)}
//   className="border p-2 rounded w-full"
// >
//   <option value="">Select ICU Head</option>
//   {users.map((user) => (
//     <option key={user.id} value={user.id}>
//       {user.name}
//     </option>
//   ))}
// </select>


//               <button
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//                 onClick={handleAddIcu}
//               >
//                 <FaPlus /> Add
//               </button>
//             </div>
//           </div>

//           {icus.length === 0 ? (
//             <p className="text-gray-600">No ICU data found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {icus.map((icu) => (
//                 <div
//                   key={icu.icu_id}
//                   className="bg-white p-4 rounded shadow border border-gray-200"
//                 >

//                   {editIcuId === icu.icu_id ? (
//   // 🟢 EDIT MODE
//   <div className="bg-white p-4 rounded shadow border border-gray-200">
//     <input
//       type="text"
//       value={editIcuName}
//       onChange={(e) => setEditIcuName(e.target.value)}
//       className="border p-2 rounded w-full mb-2"
//     />
//     <div className="flex gap-2">
//       <button
//         className="bg-green-600 text-white px-3 py-1 rounded"
//         onClick={handleEditIcu}
//       >
//         Save
//       </button>
//       <button
//         className="bg-gray-400 text-white px-3 py-1 rounded"
//         onClick={() => {
//           setEditIcuId(null);
//           setEditIcuName("");
//         }}
//       >
//         Cancel
//       </button>
//     </div>
//   </div>
// ) : (
//   // 🟡 NORMAL DISPLAY
//   <div className="bg-white p-4 rounded shadow border border-gray-200">
//     <p><strong>ICU Name:</strong> {icu.icu_name}</p>
//     <p><strong>ICU Head:</strong> {icu.head_name || "Not Assigned"}</p>
//     <div className="flex gap-2 mt-3">
//       <button
//         className="bg-yellow-400 px-3 py-1 rounded text-white flex items-center gap-1"
//         onClick={() => {
//           setEditIcuId(icu.icu_id);
//           setEditIcuName(icu.icu_name);
//         }}
//       >
//         <FaEdit /> Edit
//       </button>
//       <button
//         className="bg-red-500 px-3 py-1 rounded text-white flex items-center gap-1"
//         onClick={() => handleDeleteIcu(icu.icu_id)}
//       >
//         <FaTrash /> Delete
//       </button>
//     </div>
//   </div>
// )}



                  
//                   {editIcuId === icu.icu_id && (
//                     <div className="mt-2">
//                       <input
//                         type="text"
//                         value={editIcuName}
//                         onChange={(e) => setEditIcuName(e.target.value)}
//                         className="border p-2 rounded w-full mb-2"
//                       />
//                       <button
//                         className="bg-green-600 text-white px-3 py-1 rounded mr-2"
//                         onClick={handleEditIcu}
//                       >
//                         Save
//                       </button>
//                       <button
//                         className="bg-gray-400 text-white px-3 py-1 rounded"
//                         onClick={() => {
//                           setEditIcuId(null);
//                           setEditIcuName("");
//                         }}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminIcuHeads;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaBars, FaHome, FaUserMd, FaFileMedical, FaCog, FaSignOutAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// // import { useLocation } from "react-router-dom";
// import Sidebar from "../Layout/Sidebar";
// import Header from "../Layout/Header";
// // import SidebarItem from "../Layout/SidebarItem"

// // function SidebarItem({ icon, label, isOpen, isLogout = false, onClick,isActive }) {
// //   return (
// //     <div
// //       onClick={onClick}
// //       className={`flex items-center gap-4 p-2 rounded cursor-pointer transition-all 
// //         ${isLogout ? "hover:bg-red-700" : "hover:bg-blue-700"} 
// //         ${isActive ? "bg-blue-700 text-white" : ""}
// //         `}
// //     >
// //       <span className="text-xl">{icon}</span>
// //       {isOpen && <span className="text-sm">{label}</span>}
// //     </div>
// //   );
// // }

// function AdminIcuHeads() {
// //  const location = useLocation();
// //  const isActive = (path) => location.pathname.startsWith(path);

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [icus, setIcus] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem('role');
//   // const dashboardPath =
//   // role === 'admin'
//   //   ? '/admin-dashboard'
//   //   : role === 'icu_head'
//   //   ? '/icu-dashboard'
//   //   : role === 'doctor'
//   //   ? '/doctor-dashboard'
//   //   : '/';

// //   const handleDashboardClick = () => {
// //   if (role === 'admin')  navigate(dashboardPath);
// // };
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   // const handleLogout = () => {
//   //   localStorage.clear();
//   //   navigate("/login");
//   // };

//   useEffect(() => {
//     const fetchIcus = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/icus-with-heads", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setIcus(res.data);
//       } catch (err) {
//         console.error("Failed to fetch ICUs:", err);
//       }
//     };

//     fetchIcus();
//   }, [token]);

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} role={role} />
//       {/* Main Area */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         {/* Header */}
//          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

//         {/* Content */}
//         <main className="flex-1 p-6 bg-gray-100 overflow-auto">
//           {icus.length === 0 ? (
//             <p className="text-gray-600">No ICU data found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {icus.map((icu) => (
//                 <div
//                   key={icu.icu_id}
//                   className="bg-white p-4 rounded shadow border border-gray-200"
//                 >
//                   <p><strong>ICU Name:</strong> {icu.icu_name}</p>
//                   <p><strong>ICU Head:</strong> {icu.head_name || "Not Assigned"}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminIcuHeads;


