import {
  LayoutDashboard,
  Users,
  UserRound,
  CalendarDays,
  Building2,
  FileText,
  Settings,
  LogOut,
  HeartPulse,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      title: "Doctors",
      icon: <UserRound size={20} />,
      path: "/admin/doctors",
    },
    {
      title: "Patients",
      icon: <Users size={20} />,
      path: "/admin/patients",
    },
    {
      title: "Appointments",
      icon: <CalendarDays size={20} />,
      path: "/admin/appointments",
    },
    {
      title: "ICU",
      icon: <HeartPulse size={20} />,
      path: "/admin/icu",
    },
    {
      title: "Departments",
      icon: <Building2 size={20} />,
      path: "/admin/departments",
    },
    {
      title: "Reports",
      icon: <FileText size={20} />,
      path: "/admin/reports",
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-2xl font-bold text-cyan-400">
          🏥 HospitalMS
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl mb-2 transition-all ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 py-3 rounded-xl"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;