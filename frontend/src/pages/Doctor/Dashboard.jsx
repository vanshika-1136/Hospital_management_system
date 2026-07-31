import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import DashboardCards from "../../pages/Doctor/DashboardCards";
import AppointmentTable from "../../pages/Doctor/AppointmentTable";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { token, user } = useAuth();

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get(
        "/doctor/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <Layout>
        <h2 className="text-center mt-20 text-xl">
          Loading Dashboard...
        </h2>
      </Layout>
    );

  return (
    <Layout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Welcome Dr. {user.full_name} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here's your hospital overview.
        </p>

      </div>

      <DashboardCards
        statistics={dashboard.statistics}
      />

      <div className="mt-10">

        <AppointmentTable
          appointments={
            dashboard.todayAppointments
          }
        />

      </div>

    </Layout>
  );
};

export default Dashboard;