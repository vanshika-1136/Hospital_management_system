import React from "react";
// // // import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import UserDashboard from './Components/Roles/UserDashboard';
import AdminDashboard from "./Components/Roles/AdminDashboard";

import DoctorDashboard from "./Components/Roles/DoctorDashboard";
import IcuHeadDashboard from "./Components/Roles/IcuHeadDashboard";
import PatientInfoPage from "./Components/Roles/PatientInfoPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Navigate } from "react-router-dom";
import AddPatientPage from "./Components/AddPatientPage";
import EditPatientPage from './Components/EditPatientPage';
import IcuHeadsPage from "./Components/Roles/IcuHeadsPage";
import SettingsPage from './Components/SettingsPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            // <ProtectedRoute>
              <AdminDashboard />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            // <ProtectedRoute>
              <DoctorDashboard />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/icuhead-dashboard"
          element={
            // <ProtectedRoute>
              <IcuHeadDashboard />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/add-patient"
          element={
            // <ProtectedRoute>
              <AddPatientPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/edit-patient/:id"
          element={
            <ProtectedRoute>
              <EditPatientPage />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/icu-heads" 
        element={
        <ProtectedRoute>
        {<IcuHeadsPage />} 
        </ProtectedRoute>
        }
        />
          <Route path="/settings" 
        element={
        <ProtectedRoute>
        {<SettingsPage />} 
        </ProtectedRoute>
        }
        />
        <Route path="/patient-dashboard" 
        element={
        <ProtectedRoute >
        {<PatientInfoPage />} 
        </ProtectedRoute>
        }
        />
          <Route path="/userDashboard" 
        element={
        <ProtectedRoute >
        {<UserDashboard />} 
        </ProtectedRoute>
        }
        />
      </Routes>
    </Router>
  );
}
export default App;





// function App(){
//   return(
//   <Router>
//     <Routes>
//       <Route path="/" element={<Navigate to="/login" />} />  fallback route --host 3000
//       <Route path="/signup" element ={<Signup />} />
//       <Route path="/login" element ={<Login />} />
//       <Route path="/dashboard" element ={<UserDashboard />} />
//       <Route path="*" element ={<Navigate to="/Login" />} />

//     </Routes>
//   </Router>
//   );
// }

// import React from "react";
// import UserDashboard from "./UserDashboard";

// function App() {
//   return <UserDashboard />;
// }

// import TestPage from './TestPage';
// function App() {
//   return <TestPage />;
// }


// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Components/Login";
// import Dashboard from "./Components/Dashboard";

// function App() {
//   const isAuthenticated = localStorage.getItem("token");

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
//         <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }
