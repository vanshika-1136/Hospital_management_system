// components/LabRecordsForm.js
import React, { useState } from 'react';
import axios from 'axios';

function LabRecordsForm({ patientId, token }) {
  const [form, setForm] = useState({
    test_name: '',
    result: '',
    date: '',
    technician: '',
    notes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      'http://https://hospital-management-backend-mqyh.onrender.com/api/patients/lab-record',
      { ...form, patient_id: patientId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Lab record saved!');
  };

  return (
<form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded p-6 mt-4 max-w-xl">
  <h3 className="text-lg font-semibold text-gray-800">Lab Record</h3>

  <input
    name="test_name"
    value={form.test_name}
    onChange={handleChange}
    placeholder="Test Name"
    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <input
    name="result"
    value={form.result}
    onChange={handleChange}
    placeholder="Result"
    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <input
    name="date"
    type="date"
    value={form.date}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <input
    name="technician"
    value={form.technician}
    onChange={handleChange}
    placeholder="Technician Name"
    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <textarea
    name="notes"
    value={form.notes}
    onChange={handleChange}
    placeholder="Notes"
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

export default LabRecordsForm;
