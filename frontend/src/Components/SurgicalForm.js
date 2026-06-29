// components/SurgicalForm.js
import React, { useState } from 'react';
import axios from 'axios';

function SurgicalForm({ patientId, token }) {
  const [form, setForm] = useState({
    surgery_type: '',
    date: '',
    surgeon: '',
    notes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      'http://https://hospital-management-backend-mqyh.onrender.com/api/patients/surgical-records',
      { ...form, patient_id: patientId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Surgical record saved!');
  };

//   const fetchDailyRecords = async (patientId, date) => {
//   const res = await axios.get(
//     `http://https://hospital-management-backend-mqyh.onrender.com/api/patients/surgical-history/${patientId}/${date}`,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   console.log(res.data);
// };
git

  return (
<form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded p-6 mt-4 max-w-xl">
  <h3 className="text-lg font-semibold text-gray-800">Surgical Record</h3>

  <input
    name="surgery_type"
    placeholder="Surgery Type"
    onChange={handleChange}
    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <input
    name="date"
    type="date"
    onChange={handleChange}
    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <input
    name="surgeon"
    placeholder="Surgeon Name"
    onChange={handleChange}
    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <textarea
    name="notes"
    placeholder="Notes"
    onChange={handleChange}
    className="w-full border border-gray-300 rounded px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
  ></textarea>

  <button
    type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
  >
    Save
  </button>
</form>

  );
}

export default SurgicalForm;
