import AdminSidebar from "./AdminSidebar";
import DoctorSidebar from "./DoctorSidebar";
import Navbar from "./Navbar";
import PatientSidebar from "./PatientSidebar";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
const Layout = ({ children }) => {
  const { user } = useAuth();
 console.log("Logged in user:", user);
 console.log("Current Role:", user?.role_name);
  const renderSidebar = () => {
    switch (user?.role_name) {
      
      case "Admin":
        return <AdminSidebar />;

      case "Doctor":
        return <DoctorSidebar />;

      case "Patient":
      return <PatientSidebar />;
      
case "ICU Head":
  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white">

      <div className="h-20 flex items-center justify-center border-b border-slate-700">

        <h1 className="text-2xl font-bold text-cyan-400">
          🏥 HospitalMS
        </h1>

      </div>

      <nav className="p-4 mt-6">

        <NavLink
          to="/icu/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl ${
              isActive
                ? "bg-cyan-500"
                : "hover:bg-slate-800"
            }`
          }
        >
          ICU Dashboard
        </NavLink>

      </nav>

    </aside>
  );

      default:
        return null;
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {renderSidebar()}

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
};

export default Layout;