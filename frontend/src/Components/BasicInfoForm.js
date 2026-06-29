// import React, { useState } from 'react';
// import axios from 'axios';

// function BasicInfoForm({ setPatientId }) {
//   const [form, setForm] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     admission_date: '',
//     diagnosis: '',
//     condition: '',
//     doctor_id: '',
//     icu_id: '',
//     created_by: '', // You can fetch from token or localStorage
//   });


//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try{
//     const res = await axios.post('http://localhost:5000/api/patients/basic-info', form,
//       {
//         headers:{
//           Authorization:`Bearer ${localStorage.getItem("token")}`
//         }
//       }
//     );
//     setPatientId(res.data.patientId);  // store ID for other forms
//     alert('Patient Added!');
//     console.log("Submitting form data:", form);

//   } catch (err) {
//       console.error(err);
//       alert('Error adding patient');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-md max-w-md mx-auto">
//       <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-2" />
//       <input name="age" placeholder="Age" value={form.age} onChange={handleChange} className="w-full border p-2" />
//       <select name="gender" value={form.gender} onChange={handleChange} className="w-full border p-2">
//         <option value="">Select Gender</option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//       </select>
//       <input type="date" name="admission_date" value={form.admission_date} onChange={handleChange} className="w-full border p-2" />
//       <input name="diagnosis" placeholder="Diagnosis" value={form.diagnosis} onChange={handleChange} className="w-full border p-2" />
//       <input name="condition" placeholder="Condition" value={form.condition} onChange={handleChange} className="w-full border p-2" />
//       <input name="doctor_id" placeholder="Doctor ID" value={form.doctor_id} onChange={handleChange} className="w-full border p-2" />
//       <input name="icu_id" placeholder="ICU ID" value={form.icu_id} onChange={handleChange} className="w-full border p-2" />
//       <input name="created_by" placeholder="Created By (User ID)" value={form.created_by} onChange={handleChange} className="w-full border p-2" />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Patient</button>
//     </form>
//   );
// }

// export default BasicInfoForm;

import React, { useState } from 'react';
import axios from 'axios';

function BasicInfoForm({ setPatientId }) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    admission_date: '',
    diagnosis: '',
    condition: '',
    doctor_id: '',
    icu_id: '',
    created_by: '', // You can fetch from token or localStorage
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const res = await axios.post('http://https://hospital-management-backend-mqyh.onrender.com/api/patients/basic-info', form,
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    setPatientId(res.data.patientId);  // store ID for other forms
    alert('Patient Added!');
    console.log("Submitting form data:", form);

  } catch (err) {
      console.error(err);
      alert('Error adding patient');
    }
  };

  return (
    <div className="overflow-y-auto w-full mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-md rounded-lg p-8 border border-gray-200 "
      >
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">📝 Basic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              name="age"
              required
              value={form.age}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter age"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              required
              value={form.gender}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Admission Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Admission Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="admission_date"
              required
              value={form.admission_date}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Diagnosis */}
          <div>
            <label className="block text-sm font-medium mb-1">Diagnosis</label>
            <input
              name="diagnosis"
              value={form.diagnosis}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Diagnosis"
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium mb-1">Condition</label>
            <input
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Condition"
            />
          </div>

          {/* Doctor ID */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Doctor ID <span className="text-red-500">*</span>
            </label>
            <input
              name="doctor_id"
              required
              value={form.doctor_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Doctor ID"
            />
          </div>

          {/* ICU ID */}
          <div>
            <label className="block text-sm font-medium mb-1">
              ICU ID <span className="text-red-500">*</span>
            </label>
            <input
              name="icu_id"
              required
              value={form.icu_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="ICU ID"
            />
          </div>

          {/* Created By */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Created By <span className="text-red-500">*</span>
            </label>
            <input
              name="created_by"
              required
              value={form.created_by}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Created By (User ID)"
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition font-medium"
          >
            ➕ Add Patient
          </button>
        </div>
      </form>
    </div>
  );
}

export default BasicInfoForm;
