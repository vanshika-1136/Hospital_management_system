import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

import AddPrescriptionModal from "../../components/Doctor/AddPrescriptionModal";
import PrescriptionTable from "../../components/Doctor/PrescriptionTable";

const PatientDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [records, setRecords] = useState([]);

  const [showPrescriptionModal, setShowPrescriptionModal] =
    useState(false);

  const fetchPatient = async () => {
    try {
      const { data } = await api.get(`/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatient(data.patient);
      setAppointments(data.appointments);
      setPrescriptions(data.prescriptions);
      setRecords(data.medicalRecords);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, []);

  if (!patient) {
    return (
      <Layout>
        <h2 className="text-center mt-10 text-xl">
          Loading Patient...
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Patient Details
        </h1>

        <button
          onClick={() => setShowPrescriptionModal(true)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl"
        >
          Add Prescription
        </button>

      </div>

      {/* Patient Info */}

      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <h2 className="text-2xl font-semibold mb-5">
          Basic Information
        </h2>

        <div className="grid grid-cols-2 gap-5">

          <p>
            <strong>Name:</strong> {patient.full_name}
          </p>

          <p>
            <strong>Email:</strong> {patient.email}
          </p>

          <p>
            <strong>Age:</strong> {patient.age}
          </p>

          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>

          <p>
            <strong>Phone:</strong> {patient.phone}
          </p>

          <p>
            <strong>Blood Group:</strong> {patient.blood_group}
          </p>

          <p className="col-span-2">
            <strong>Address:</strong> {patient.address}
          </p>

        </div>

      </div>

      {/* Appointment History */}

      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <h2 className="text-2xl font-semibold mb-5">
          Appointment History
        </h2>

        <table className="w-full">

          <thead className="border-b">

            <tr>

              <th className="text-left py-3">
                Date
              </th>

              <th className="text-left">
                Time
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Symptoms
              </th>

            </tr>

          </thead>

          <tbody>

            {appointments.length > 0 ? (

              appointments.map((item) => (

                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-3">
                    {item.appointment_date}
                  </td>

                  <td>
                    {item.appointment_time}
                  </td>

                  <td>
                    {item.status}
                  </td>

                  <td>
                    {item.symptoms}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="text-center py-6"
                >
                  No Appointment History
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Prescription Table */}

      <PrescriptionTable
        prescriptions={prescriptions}
      />

      {/* Medical Records */}

      <div className="bg-white rounded-2xl shadow p-6 mt-8">

        <h2 className="text-2xl font-semibold mb-5">
          Medical Records
        </h2>

        {records.length > 0 ? (

          records.map((record) => (

            <div
              key={record.id}
              className="border rounded-lg p-4 mb-4"
            >

              <pre className="whitespace-pre-wrap">
                {JSON.stringify(record, null, 2)}
              </pre>

            </div>

          ))

        ) : (

          <p>No Medical Records</p>

        )}

      </div>

      {/* Prescription Modal */}

      {showPrescriptionModal && (

        <AddPrescriptionModal
          patientId={patient.id}
          onClose={() =>
            setShowPrescriptionModal(false)
          }
          onSuccess={fetchPatient}
        />

      )}

    </Layout>
  );
};

export default PatientDetails;