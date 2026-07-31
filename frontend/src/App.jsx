import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Admin/Dashboard";
import DoctorManagement from "./pages/Admin/DoctorManagement";
import PatientDetails from "./pages/Doctor/PatientDetails"
import DoctorDashboard from "./pages/Doctor/Dashboard";
import Profile from "./pages/Doctor/Profile";
import Patients from "./pages/Doctor/Patients";
import Appointments from "./pages/Doctor/Appointments";
import MedicalRecords from "./pages/Doctor/MedicalRecords";
import Reports from "./pages/Doctor/Reports";
import PatientDashboard from "./pages/Patient/Dashboard";


function ICUDashboard() {
  return <h1>ICU Head Dashboard</h1>;
}

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

        {/* Admin Doctor Management */}

        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <DoctorManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/icu/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ICU Head"]}>
              <ICUDashboard />
            </ProtectedRoute>
          }
        />
       
<Route
  path="/doctor/patient/:id"
  element={
    <ProtectedRoute allowedRoles={["Doctor"]}>
      <PatientDetails />
    </ProtectedRoute>
  }
/>
 
 <Route
  path="/doctor/profile"
  element={
    <ProtectedRoute allowedRoles={["Doctor"]}>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/doctor/patients"
  element={
    <ProtectedRoute allowedRoles={["Doctor"]}>
      <Patients />
    </ProtectedRoute>
  }
/>

<Route
  path="/doctor/appointments"
  element={
    <ProtectedRoute allowedRoles={["Doctor"]}>
      <Appointments />
    </ProtectedRoute>
  }
/>

<Route
  path="/doctor/records"
  element={
    <ProtectedRoute allowedRoles={["Doctor"]}>
      <MedicalRecords />
    </ProtectedRoute>
  }
/>

<Route
path="/doctor/reports"
element={
<ProtectedRoute allowedRoles={["Doctor"]}>
<Reports/>
</ProtectedRoute>
}
/>

{/* <Route
  path="/patient/dashboard"
  element={
    <ProtectedRoute allowedRoles={["Patient"]}>
      <PatientDashboard />
    </ProtectedRoute>
  }
/> */}

{/* <Route
  path="/patient/dashboard"
  element={
    <ProtectedRoute allowedRoles={["Patient"]}>
      <PatientDashboard />
    </ProtectedRoute>
  }
/> */}

      </Routes>
    </>
  );
}

export default App;
