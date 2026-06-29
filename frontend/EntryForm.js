import React, { useState } from "react";
import axios from "axios";

function EntryForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    specialization: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://https://hospital-management-backend-mqyh.onrender.com/api/data", formData);
      alert("Data submitted successfully");
      setFormData({ name: "", age: "", specialization: "" });
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Data Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
        <input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Specialization" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EntryForm;
