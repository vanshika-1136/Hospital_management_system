// components/AntifungalForm.js
import React, { useState } from 'react';
import axios from 'axios';

function AntifungalForm({ patientId, token }) {
  const [form, setForm] = useState({
    drug_name: '',
    dosage: '',
    frequency: '',
    administered_by: '',
    notes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      'http://https://hospital-management-backend-mqyh.onrender.com/api/patients/antifungal-record',
      { ...form, patient_id: patientId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Antifungal record saved!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded p-6 mt-4 max-w-xl">
      <h3 className="text-lg font-semibold text-gray-800">Antifungal Record</h3>

      <input
        name="drug_name"
        value={form.drug_name}
        onChange={handleChange}
        placeholder="Drug Name"
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        name="dosage"
        value={form.dosage}
        onChange={handleChange}
        placeholder="Dosage"
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        name="frequency"
        value={form.frequency}
        onChange={handleChange}
        placeholder="frequency"
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        name="administered_by"
        value={form.administered_by}
        onChange={handleChange}
        placeholder="Administered By"
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

export default AntifungalForm;
