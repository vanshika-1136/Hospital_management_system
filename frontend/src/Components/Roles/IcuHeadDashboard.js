import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from "../LogoutButton";
import { useNavigate } from 'react-router-dom';

function IcuHeadDashboard() {
  const [patients, setPatients] = useState([]);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [visibleComments, setVisibleComments] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      console.error("Token missing, unauthorized access");
      return;
    }

    const fetchIcusWithPatients = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/icu-patients', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPatients(res.data);
      } catch (err) {
        console.error('Fetch patients error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIcusWithPatients();
  }, [token]);

  const handleChange = (patientId, text) => {
    setNewComments(prev => ({ ...prev, [patientId]: text }));
  };

  const handleSubmit = async (patientId) => {
    try {
      await axios.post('http://localhost:5000/api/comments', {
        patientId,
        comment: newComments[patientId]
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNewComments(prev => ({ ...prev, [patientId]: '' }));
      fetchComments(patientId);
    } catch (err) {
      console.error('Error posting comment:', err.response?.data || err.message);
    }
  };

  const fetchComments = async (patientId) => {
         const isVisible = visibleComments[patientId];
     if (isVisible) {
    // Hide comments
    setVisibleComments((prev) => ({ ...prev, [patientId]: false }));
  } else {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(prev => ({ ...prev, [patientId]: res.data }));
      setVisibleComments((prev) => ({ ...prev, [patientId]: true }));
    } catch (err) {
      console.error('Error fetching comments:', err.response?.data || err.message);
    }
  }
  };

  if (loading) return <p className="p-4">Loading patients...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-blue-400">
        PATIENTS ADDED BY YOU
      </h1>
       


       <div className="flex justify-end mb-4">
  <button
    onClick={() => navigate("/add-patient")}
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow"
  >
    Add Patient
  </button>
</div>



      {patients.length === 0 && <p>No ICU patients assigned.</p>}

      {patients.map((patient) => (
        <div key={patient.id} className="border p-4 mb-4 rounded shadow">
          {/* <h2 className="text-lg font-semibold">{patient.name}</h2> */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{patient.name}</h2>
            <button
              onClick={() => navigate(`/edit-patient/${patient.id}`)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
          </div>
          <p>Age: {patient.age}</p>
          <p>ICU: {patient.icu_name}</p>

          <textarea
            className="border rounded w-full p-2 mt-2"
            placeholder="Add a comment..."
            value={newComments[patient.id] || ""}
            onChange={(e) => handleChange(patient.id, e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded mt-2"
            onClick={() => handleSubmit(patient.id)}
          >
            Submit
          </button>

          <div className="mt-3">
            <strong>Comments:</strong>
           <button
                      className="text-blue-500 underline"
                      onClick={() => fetchComments(patient.id)}
                    >
                      {visibleComments[patient.id] ?'Unload Comments' : 'Load Comments'}
                    </button>

                    {visibleComments[patient.id] && (
            <ul className="list-disc ml-5 mt-2">
              {(comments[patient.id] || []).map((c, i) => (
                <li key={i}>
                  <strong>{c.commenter}</strong>: {c.comment}{" "}
                  <small>({new Date(c.created_at).toLocaleString()})</small>
                </li>
              ))}
            </ul>
            )}
          </div>
        </div>
      ))}
      <LogoutButton />
    </div>
  );
}

export default IcuHeadDashboard;


// components/IcuHeadDashboard.js
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { jwtDecode } from 'jwt-decode';
// import LogoutButton from "../LogoutButton"; // Adjust path as needed
// function IcuHeadDashboard() {
//   const [patients, setPatients] = useState([]);
//   const alertShown = useRef(false); // prevent double alert

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("token");
//     const decoded = jwtDecode(token);
//     if (decoded.exp * 1000 < Date.now()) {
//       alert("Session expired. Please login again.");
//       localStorage.clear();
//       window.location.href = "/login";
//       return;
//     }
//     console.log("Fetching ICU patients with token:", token);
//     if (!token || !userId) {
//       if (!alertShown.current) {
//         alert("Unauthorized. Please login again.");
//         alertShown.current = true;
//       }
//       return;
//     }
//     axios
//       .get(`http://localhost:5000/api/icu-patients`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         console.log("ICU Patients:", res.data);
//         setPatients(res.data);
//       })
//       .catch((err) => {
//         console.error(
//           "Error fetching ICU patients:",
//           err.response?.data || err.message
//         );
//         if (err.response?.status === 401) {
//           alert("Unauthorized. Please login again.");
//         }
//       });
//   }, []);
//   console.log("Token:", localStorage.getItem("token"));

//   const handleComment = async (patientId) => {
//     const comment = prompt("Enter comment");
//     await axios.post(
//       `http://localhost:5000/api/comments`,
//       {
//         patientId,
//         comment,
//       },
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       }
//     );
//   };

//   return (
//     <div>
//       <h2>ICU Head Dashboard</h2>
//       {patients.map((p) => (
//         <div key={p.id}>
//           <p>
//             {p.name} | ICU: {p.icu_name}
//           </p>
//           <button onClick={() => handleComment(p.id)}>Add Comment</button>
//         </div>
//       ))}
//       <LogoutButton />
//     </div>
//   );
// }

// export default IcuHeadDashboard;
