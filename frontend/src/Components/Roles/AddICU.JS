import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminContent() {
  const [icuName, setIcuName] = useState('');
  const [icuHeads, setIcuHeads] = useState([]);
  const [selectedHeadId, setSelectedHeadId] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchIcuHeads = async () => {
      const res = await axios.get('http://localhost:5000/api/icu-heads', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIcuHeads(res.data);
    };

    fetchIcuHeads();
  }, []);

  const handleAddICU = async () => {
    if (!icuName || !selectedHeadId) {
      alert("Please enter ICU name and select a head.");
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/icus',
        { name: icuName, head_user_id: selectedHeadId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message);
      setIcuName('');
      setSelectedHeadId('');
    } catch (err) {
      alert(err.response?.data?.message || "Error adding ICU");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Add ICU</h2>

      <input
        type="text"
        value={icuName}
        onChange={(e) => setIcuName(e.target.value)}
        placeholder="Enter ICU name"
        className="border p-2 rounded w-64"
      />

      <select
        value={selectedHeadId}
        onChange={(e) => setSelectedHeadId(e.target.value)}
        className="border p-2 rounded w-64"
      >
        <option value="">Select ICU Head</option>
        {icuHeads.map((head) => (
          <option key={head.id} value={head.id}>
            {head.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleAddICU}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add ICU
      </button>
    </div>
  );
}

export default AdminContent;
