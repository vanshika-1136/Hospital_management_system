
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function EditPatientPage() {
//   const { id } = useParams(); // from route like /edit-patient/:id
//   const [loading, setLoading] = useState(true);
//   // const token = localStorage.getItem('token');
//   const [basicInfo, setBasicInfo] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     admission_date: '',
//     doctor_id: '',
//     icu_id: ''
//   });

//   const [antifungal, setAntifungal] = useState({
//     drug_name: '', dosage: '', frequency: '', administered_by: '', notes: ''
//   });

//   const [antimicrobial, setAntimicrobial] = useState({
//     drug_name: '', dosage: '', frequency: '', administered_by: '', notes: ''
//   });

//   const [surgical, setSurgical] = useState({
//     surgery_type: '', date: '', surgeon: '', notes: ''
//   });

//   const [lab, setLab] = useState({
//     test_name: '', result: '', date: '', technician: '', notes: ''
//   });

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/patients/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data) {
//           setBasicInfo(res.data.basicInfo || {});
//           setAntifungal(res.data.antifungal || {});
//           setAntimicrobial(res.data.antimicrobial || {});
//           setSurgical(res.data.surgical || {});
//           setLab(res.data.lab || {});
//         }
//       } catch (err) {
//         console.error('Error fetching patient:', err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, token]);

  
//   const handleUpdate = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/patients/basic-info/${id}`, basicInfo, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       await axios.put(`http://localhost:5000/api/patients/antifungal-record/${id}`, antifungal, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       await axios.put(`http://localhost:5000/api/patients/antimicrobial-record/${id}`, antimicrobial, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       await axios.put(`http://localhost:5000/api/patients/surgical-record/${id}`, surgical, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       await axios.put(`http://localhost:5000/api/patients/lab-record/${id}`, lab, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       alert('Patient updated successfully!');
//     } catch (err) {
//       console.error('Update error:', err.message);
//       alert('Error updating patient.');
//     }
//   };

//   if (loading) return <div>Loading patient info...</div>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-blue-700">Edit Patient Info</h2>

//       {/* SECTION: BASIC INFO */}
//       <Section title="Basic Info">
//         {[
//           ['Name', 'name'], ['Age', 'age'], ['Gender', 'gender'],
//           ['Admission Date', 'admission_date', 'date'],
//           ['Doctor ID', 'doctor_id'], ['ICU ID', 'icu_id']
//         ].map(([label, key, type]) => (
//           <InputField
//             key={key}
//             label={label}
//             type={type || 'text'}
//             value={basicInfo[key] || ''}
//             onChange={(e) => setBasicInfo({ ...basicInfo, [key]: e.target.value })}
//           />
//         ))}
//       </Section>

//       {/* SECTION: ANTIFUNGAL */}
//       <Section title="Antifungal Records">
//         {['drug_name', 'dosage', 'frequency', 'administered_by', 'notes'].map((key) => (
//           <InputField
//             key={key}
//             label={key.replace(/_/g, ' ')}
//             value={antifungal[key] || ''}
//             onChange={(e) => setAntifungal({ ...antifungal, [key]: e.target.value })}
//           />
//         ))}
//       </Section>

//       {/* SECTION: ANTIMICROBIAL */}
//       <Section title="Antimicrobial Records">
//         {['drug_name', 'dosage', 'frequency', 'administered_by', 'notes'].map((key) => (
//           <InputField
//             key={key}
//             label={key.replace(/_/g, ' ')}
//             value={antimicrobial[key] || ''}
//             onChange={(e) => setAntimicrobial({ ...antimicrobial, [key]: e.target.value })}
//           />
//         ))}
//       </Section>

//       {/* SECTION: SURGICAL */}
//       <Section title="Surgical Records">
//         {['surgery_type', 'date', 'surgeon', 'notes'].map((key) => (
//           <InputField
//             key={key}
//             label={key.replace(/_/g, ' ')}
//             type={key === 'date' ? 'date' : 'text'}
//             value={surgical[key] || ''}
//             onChange={(e) => setSurgical({ ...surgical, [key]: e.target.value })}
//           />
//         ))}
//       </Section>

//       {/* SECTION: LAB */}
//       <Section title="Lab Records">
//         {['test_name', 'result', 'date', 'technician', 'notes'].map((key) => (
//           <InputField
//             key={key}
//             label={key.replace(/_/g, ' ')}
//             type={key === 'date' ? 'date' : 'text'}
//             value={lab[key] || ''}
//             onChange={(e) => setLab({ ...lab, [key]: e.target.value })}
//           />
//         ))}
//       </Section>

//       <button
//         onClick={handleUpdate}
//         className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//       >
//         Save Changes
//       </button>
//     </div>
//   );
// }

// // Reusable input field
// const InputField = ({ label, value, onChange, type = 'text' }) => (
//   <div className="flex flex-col">
//     <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <input
//       type={type}
//       value={value}
//       onChange={onChange}
//       className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//     />
//   </div>
// );

// // Reusable section container
// const Section = ({ title, children }) => (
//   <div className="space-y-4 border border-gray-300 p-4 rounded-md shadow-sm mb-6">
//     <h3 className="text-lg font-semibold text-blue-500">{title}</h3>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {children}
//     </div>
//   </div>
//   );

// export default EditPatientPage;



