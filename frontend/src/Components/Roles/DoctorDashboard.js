import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from "../LogoutButton";
import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [visibleComments, setVisibleComments] = useState({});
  const navigate =useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      console.error("Token missing, unauthorized access");
      return;
    }

    const fetchPatients = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/doctor/patients', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPatients(res.data);

        // res.data.forEach((patient) => fetchComments(patient.id));
      } catch (err) {
        console.error('Fetch doctor patients error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [token]);

  const handleChange = (patientId, text) => {
    setNewComments(prev => ({ ...prev, [patientId]: text }));
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


  if (loading) return <p className="p-4">Loading your patients...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Doctor Dashboard</h1>


      <div className="flex justify-end mb-4">
  <button
    onClick={() => navigate("/add-patient")}
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow"
  >
    Add Patient
  </button>
</div>



      {patients.length === 0 && <p>No patients assigned to you.</p>}

      {patients.map((patient) => (
        <div key={patient.id} className="border p-4 mb-4 rounded shadow">
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
            className="bg-green-600 text-white px-4 py-1 rounded mt-2"
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

export default DoctorDashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import LogoutButton from "../LogoutButton"; // Adjust path as needed

// function DoctorDashboard() {
//   const [patients, setPatients] = useState([]);

//   useEffect(() => {
//     const id = localStorage.getItem('userId');
//     axios.get(`http://localhost:5000/api/patients?created_by=${id}`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//     }).then(res => setPatients(res.data));
//   }, []);

//   const handleComment = async (patientId) => {
//     const comment = prompt('Enter comment');
//     await axios.post(`http://localhost:5000/api/comments`, {
//       patientId,
//       comment,
//     }, {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//     });
//   };

//   return (
//     <div>
//       <h2>Doctor Dashboard</h2>
//       {patients.map((p) => (
//         <div key={p.id}>
//           <p>{p.name}</p>
//           <button onClick={() => handleComment(p.id)}>Add Comment</button>
//         </div>
//       ))}
//        <LogoutButton />
//     </div>
//   );
// }

// export default DoctorDashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import LogoutButton from "../LogoutButton";

// function DoctorDashboard() {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchPatients = async () => {
//     try {
//       const id = localStorage.getItem('userId');
//       const res = await axios.get(`http://localhost:5000/api/doctor/patients?doctorId=${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setPatients(res.data);
//     } catch (err) {
//       setError("Failed to fetch patients");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const handleComment = async (patientId) => {
//     const comment = prompt('Enter comment:');
//     if (!comment) return;
//     try {
//       await axios.post(`http://localhost:5000/api/comments`, {
//         patientId,
//         comment,
//       }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       alert("Comment added!");
//     } catch (err) {
//       alert("Failed to add comment");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Doctor Dashboard</h2>
//       {patients.map((p) => (
//         <div key={p.id} className="border p-2 mb-3">
//           <p><strong>Name:</strong> {p.name}</p>
//           <p><strong>Details:</strong> {p.details || 'N/A'}</p>
//           <button onClick={() => handleComment(p.id)} className="bg-blue-500 text-white px-3 py-1 mt-2 rounded">
//             Add Comment
//           </button>
//         </div>
//       ))}
//       <LogoutButton />
//     </div>
//   );
// }

// export default DoctorDashboard;
