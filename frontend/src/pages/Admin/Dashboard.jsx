import { useEffect, useState } from "react";
import {
  Users,
  UserRound,
  CalendarDays,
  HeartPulse,
} from "lucide-react";

import api from "../../api/axios";
import Layout from "../../components/Layout/Layout";
import DashboardCard from "../../components/Layout/DashboardCard";
import RecentUsersTable from "../../components/Tables/RecentUsersTable";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { token } = useAuth();

  const [dashboard, setDashboard] = useState({
    statistics: {
      totalUsers: 0,
      totalDoctors: 0,
      totalPatients: 0,
      totalAppointments: 0,
    },
    recentUsers: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center text-xl mt-10">
          Loading Dashboard...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's an overview of your hospital.
        </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard
          title="Total Users"
          value={dashboard.statistics.totalUsers}
          subtitle="Registered Users"
          icon={<Users size={30} />}
          color="bg-blue-500"
        />

        <DashboardCard
          title="Doctors"
          value={dashboard.statistics.totalDoctors}
          subtitle="Available Doctors"
          icon={<UserRound size={30} />}
          color="bg-green-500"
        />

        <DashboardCard
          title="Patients"
          value={dashboard.statistics.totalPatients}
          subtitle="Registered Patients"
          icon={<HeartPulse size={30} />}
          color="bg-red-500"
        />

        <DashboardCard
          title="Appointments"
          value={dashboard.statistics.totalAppointments || 0}
          subtitle="Today's Appointments"
          icon={<CalendarDays size={30} />}
          color="bg-purple-500"
        />

      </div>

      {/* Recent Users */}

      <div className="mt-10">

        <RecentUsersTable
          users={dashboard.recentUsers}
        />

      </div>

    </Layout>
  );
};

export default Dashboard;