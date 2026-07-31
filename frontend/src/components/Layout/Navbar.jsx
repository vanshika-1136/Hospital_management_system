import { Bell, Search, CalendarDays } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">

      {/* Search */}

      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search doctors, patients..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Right Section */}

      <div className="flex items-center gap-6">

        {/* Date */}

        <div className="hidden md:flex items-center gap-2 text-gray-600">
          <CalendarDays size={18} />
          <span>{today}</span>
        </div>

        {/* Notification */}

        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell size={22} />
          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* User */}

        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-full bg-cyan-500 flex items-center justify-center text-white text-lg font-bold">
            {user?.full_name?.charAt(0)?.toUpperCase() || "A"}
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">
              {user?.full_name || "Admin"}
            </h3>

            <p className="text-sm text-gray-500">
              {user?.role_name}
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;