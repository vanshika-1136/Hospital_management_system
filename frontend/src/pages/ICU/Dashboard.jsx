import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";

import { useAuth } from "../../context/AuthContext";

import { getICUDashboard } from "../../api/icuApi";

const Dashboard = () => {
  const { token, user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const data = await getICUDashboard(token);

      setDashboard(data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboard();
    }
  }, [token]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <h2 className="text-xl font-semibold">
            Loading ICU Dashboard...
          </h2>
        </div>
      </Layout>
    );
  }

  if (!dashboard) {
    return (
      <Layout>
        <div className="text-center mt-20">
          <h2 className="text-xl font-semibold text-red-500">
            Failed to load ICU Dashboard
          </h2>
        </div>
      </Layout>
    );
  }

  const { statistics, patients } = dashboard;

  return (
    <Layout>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Welcome, {user?.full_name} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          ICU Management Overview
        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Total Beds */}

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">
            Total ICU Beds
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {statistics.totalBeds}
          </h2>

        </div>

        {/* Occupied */}

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">
            Occupied Beds
          </p>

          <h2 className="text-4xl font-bold text-red-500 mt-3">
            {statistics.occupiedBeds}
          </h2>

        </div>

        {/* Available */}

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">
            Available Beds
          </p>

          <h2 className="text-4xl font-bold text-green-500 mt-3">
            {statistics.availableBeds}
          </h2>

        </div>

      </div>

      {/* Current ICU Patients */}

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Current ICU Patients
        </h2>

        {patients.length === 0 ? (

          <p className="text-gray-500">
            No patients currently admitted to ICU.
          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">
                    Bed
                  </th>

                  <th className="text-left">
                    Patient
                  </th>

                  <th className="text-left">
                    Age
                  </th>

                  <th className="text-left">
                    Gender
                  </th>

                  <th className="text-left">
                    Blood Group
                  </th>

                  <th className="text-left">
                    Admitted
                  </th>

                </tr>

              </thead>

              <tbody>

                {patients.map((patient) => (

                  <tr
                    key={patient.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="py-4 font-semibold">
                      {patient.bed_number}
                    </td>

                    <td>
                      {patient.full_name}
                    </td>

                    <td>
                      {patient.age}
                    </td>

                    <td>
                      {patient.gender}
                    </td>

                    <td>
                      {patient.blood_group}
                    </td>

                    <td>
                      {patient.admitted_at
                        ? new Date(
                            patient.admitted_at
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </Layout>
  );
};

export default Dashboard;