import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/AuthContext";
import { getPatientDashboard } from "../../api/patientApi";

import DashboardCards from "../../components/Patient/DashboardCards";
import RecentAppointments from "../../components/Patient/RecentAppointments";

const Dashboard = () => {

  const { token, user } = useAuth();

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchDashboard = async () => {

    try {

      const data =
        await getPatientDashboard(token);

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
        <h2 className="text-center mt-10">
          Loading...
        </h2>
      </Layout>
    );

  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-2">
        Welcome {user.full_name}
      </h1>

      <p className="text-gray-500 mb-8">
        Assigned Doctor :
        {" "}
        {dashboard.statistics.assignedDoctor}
      </p>

      <DashboardCards
        statistics={dashboard.statistics}
      />

      <RecentAppointments
        appointments={dashboard.appointments}
      />

    </Layout>
  );
};

export default Dashboard;