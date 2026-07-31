import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import {
  getAppointments,
  updateAppointmentStatus,
} from "../../api/appointmentApi";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  Eye,
  CheckCircle,
  XCircle,
  CircleCheckBig,
} from "lucide-react";

const Appointments = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments(token);
      setAppointments(data.appointments);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status, token);

      toast.success(`Appointment ${status}`);

      fetchAppointments();

    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };

  if (loading) {
    return (
      <Layout>
        <h2 className="text-center mt-10 text-xl">
          Loading Appointments...
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          My Appointments
        </h1>

        <p className="text-gray-500 mt-2">
          Manage today's appointments
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-4">Patient</th>

              <th>Date</th>

              <th>Time</th>

              <th>Symptoms</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {appointments.length > 0 ? (

              appointments.map((appointment) => (

                <tr
                  key={appointment.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-4 py-4">
                    {appointment.full_name}
                  </td>

                  <td>
                    {appointment.appointment_date}
                  </td>

                  <td>
                    {appointment.appointment_time}
                  </td>

                  <td>
                    {appointment.symptoms}
                  </td>

                  <td>

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">

                      {appointment.status}

                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          navigate(
                            `/doctor/patient/${appointment.patient_id}`
                          )
                        }
                        className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-lg"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleStatus(
                            appointment.id,
                            "Approved"
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg"
                      >
                        <CheckCircle size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleStatus(
                            appointment.id,
                            "Completed"
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                      >
                        <CircleCheckBig size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleStatus(
                            appointment.id,
                            "Rejected"
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                      >
                        <XCircle size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No Appointments Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </Layout>
  );
};

export default Appointments;