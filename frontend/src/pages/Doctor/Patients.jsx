import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import PatientTable from "./PatientTable";
import { getDoctorPatients } from "../../api/patientApi";
import { useAuth } from "../../context/AuthContext";

const Patients = () => {
  const { token } = useAuth();

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      const data = await getDoctorPatients(token);

      setPatients(data.patients || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  if (loading) {
    return (
      <Layout>
        <h2 className="text-center text-xl mt-10">
          Loading Patients...
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          My Patients
        </h1>

        <p className="text-gray-500 mt-2">
          Patients assigned to you.
        </p>
      </div>

      <PatientTable patients={patients} />
    </Layout>
  );
};

export default Patients;