import React, { useState } from "react";
import BasicInfoForm from "./BasicInfoForm";
import AntifungalForm from "./AntifungalForm";
import AntimicrobialForm from "./AntimicrobialForm";
import SurgicalForm from "./SurgicalForm";
import LabRecordsForm from "./LabRecordsForm";
import Sidebar from "./Layout/Sidebar";
import Header from "./Layout/Header";
function AddPatientPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [showEditSection, setShowEditSection] = useState(false); // Only show extra forms after clicking "Edit"
   
    const [searchTerm, setSearchTerm] = useState("");
      const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const handlePatientAdded = (id) => {
    setPatientId(id);
  };
   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleEditClick = () => {
    setShowEditSection(true);
  };

  return (
        <div className=" overflow-hidden flex-col min-h-screen">
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} role={role} />
         <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <main className="  overflow-y-auto">
      {/* <h2 className="text-2xl font-bold mb-6">Add Patient</h2> */}

      {/* Always show Basic Info Form */}
      {!patientId && (
        <BasicInfoForm setPatientId={setPatientId} />
      )}

      {/* Show Edit button once basic info is submitted */}
      {patientId && !showEditSection && (
        <div className="mt-6">
          <button
            onClick={handleEditClick}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Additional Records
          </button>
        </div>
      )}

      {/* Show other sections only after Edit is clicked */}
      {patientId && showEditSection && (
        <div className="space-y-6 mt-6">
          <AntifungalForm patientId={patientId} />
          <AntimicrobialForm patientId={patientId} />
          <SurgicalForm patientId={patientId} />
          <LabRecordsForm patientId={patientId} />
        </div>
      )}
    </main>
         </div>
      </div>
    </div>
  );
}

export default AddPatientPage;


// import React, { useState, useEffect } from "react";
// import BasicInfoForm from "./BasicInfoForm";
// // import { useParams } from 'react-router-dom';
// import AntifungalForm from "./AntifungalForm";
// import AntimicrobialForm from "./AntimicrobialForm";
// import SurgicalForm from "./SurgicalForm";
// import LabRecordsForm from "./LabRecordsForm";
// // import { useNavigate } from 'react-router-dom';

// function AddPatientPage() {
//   const [patientId, setPatientId] = useState(null);
//   const [activeSection, setActiveSection] = useState("basic");
//   const token = localStorage.getItem("token");


//   useEffect(() => {
//     if (!token) {
//       console.error("Token missing, unauthorized access");
//       // You might also redirect the user to login:
//       window.location.href = "/login";
//     }
//   }, [token]);

//   const tabs = [
//     { key: "basic", label: "Basic Info" },
//     { key: "antifungal", label: "Antifungal" },
//     { key: "antimicrobial", label: "Antimicrobial" },
//     { key: "surgical", label: "Surgical" },
//     { key: "lab", label: "Lab Records" },
//   ];

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Add Patient</h2>

//       <div className="flex space-x-4 mb-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveSection(tab.key)}
//             disabled={tab.key !== "basic" && !patientId}
//             className={`px-4 py-2 rounded-lg border 
//               ${
//                 activeSection === tab.key
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-800"
//               } 
//               ${
//                 tab.key !== "basic" && !patientId
//                   ? "opacity-50 cursor-not-allowed"
//                   : ""
//               }
//             `}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Render forms based on selected section */}
//       {activeSection === "basic" && (
//         <BasicInfoForm setPatientId={setPatientId} />
//       )}
//       {activeSection === "antifungal" && (
//         <AntifungalForm patientId={patientId} />
//       )}
//       {activeSection === "antimicrobial" && (
//         <AntimicrobialForm patientId={patientId} />
//       )}
//       {activeSection === "surgical" && <SurgicalForm patientId={patientId} />}
//       {activeSection === "lab" && <LabRecordsForm patientId={patientId} />}
//     </div>
//   );
// }

// export default AddPatientPage;

// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./PatientForm.css";

// function PatientForm() {
//   const [form, setForm] = useState({ name: "", age: "", condition: "", doctor_id: "", icu_id: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try{
//     const res = await fetch("http://localhost:5000/api/patients", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//     toast.success("✅ Patient added successfully!");

//     setForm({
//           name: "",
//           age: "",
//           condition: "",
//           doctor_id: "",
//           icu_id: "",
//         });
//       }else{
//          toast.error("❌ Failed to add patient.");
//          console.log({ name, age, condition, doctor_id, icu_id });

//       }
//     } catch(err){
//       console.error(err);
//       toast.error("server error")
//     }
//     // const data = await res.json();
//     // alert("Patient added: " + JSON.stringify(data));
//     // setForm({ name: "", age: "", condition: "", doctor_id: "", icu_id: "" });
//   };

//   return (
//      <div className="form-container">
//       <h2>Add New Patient</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Patient Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="age"
//           placeholder="Age"
//           value={form.age}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="condition"
//           placeholder="Condition"
//           value={form.condition}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="doctor_id"
//           placeholder="Doctor ID"
//           value={form.doctor_id}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="icu_id"
//           placeholder="ICU ID"
//           value={form.icu_id}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Add Patient</button>
//       </form>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default PatientForm;
