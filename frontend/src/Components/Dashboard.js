import { Navbar } from "flowbite-react";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";

export function Component() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink as={Link} href="#">
          About
        </NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Dashboard() {
//   const [patients, setPatients] = useState([]);
//   const role = localStorage.getItem("role");
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/patients", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const allPatients = res.data;

//         // Filter based on role
//         let filteredPatients = allPatients;
//         if (role === "doctor") {
//           filteredPatients = allPatients.filter(p => p.doctor_user_id.toString() === userId);
//         } else if (role === "icu_head") {
//           filteredPatients = allPatients.filter(p => p.icu_head_id?.toString() === userId || p.created_by.toString() === userId);
//         }

//         setPatients(filteredPatients);
//       } catch (err) {
//         console.error("Failed to load patients", err);
//       }
//     };

//     fetchPatients();
//   }, [role, userId, token]);

//   return (
//     <div>
//       <h2>{role.toUpperCase()} Dashboard</h2>
//       {patients.length === 0 ? (
//         <p>No patients available</p>
//       ) : (
//         <ul>
//           {patients.map((p) => (
//             <li key={p.id}>{p.name} (Age: {p.age}) - ICU: {p.icu_id}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Dashboard;



// src/components/DashboardLayout.js
// import React from 'react';

// function DashboardLayout({ children }) {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-blue-800 text-white p-4">
//         <h2 className="text-xl font-bold mb-6">My Dashboard</h2>
//         <nav>
//           <ul>
//             <li className="mb-4"><a href="/profile">Profile</a></li>
//             <li className="mb-4"><a href="/patients">My Patients</a></li>
//             <li className="mb-4"><a href="/appointments">Appointments</a></li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-6">
//         {children}
//       </main>
//     </div>
//   );
// }

// export default Dashb;
