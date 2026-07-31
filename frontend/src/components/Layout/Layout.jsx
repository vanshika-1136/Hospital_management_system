import AdminSidebar from "./AdminSidebar";
import DoctorSidebar from "./DoctorSidebar";
import Navbar from "./Navbar";
import PatientSidebar from "./PatientSidebar";
import { useAuth } from "../../context/AuthContext";

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
          <div className="w-72 bg-slate-900 text-white flex items-center justify-center">
            ICU Sidebar
          </div>
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