import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import Layout from "../../components/Layout/Layout";
import DoctorTable from "../../components/Doctor/DoctorTable";
import { getDoctors } from "../../api/doctorApi";
import { useAuth } from "../../context/AuthContext";
import AddDoctorModal from "../../components/Doctor/AddDoctorModal";
import EditDoctorModal from "../../components/Doctor/EditDoctorModal";
import DeleteDoctorModal from "../../components/Doctor/DeleteDoctorModal";

const DoctorManagement = () => {
  const { token } = useAuth();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
   
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors(token);

      setDoctors(data.doctors);
      setFilteredDoctors(data.doctors);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const [selectedDoctor, setSelectedDoctor] = useState(null);
const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter((doctor) =>
      doctor.full_name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.email.toLowerCase().includes(search.toLowerCase()) ||
      doctor.department?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredDoctors(filtered);
  }, [search, doctors]);



const handleEdit = (doctor) => {
  setSelectedDoctor(doctor);
  setIsEditOpen(true);
};
const handleDelete = (doctor) => {
  setSelectedDoctor(doctor);
  setIsDeleteOpen(true);
};

  return (
    <Layout>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Doctor Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all doctors from one place.
          </p>
        </div>

        <button
        onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-3 rounded-xl"
        >
          <Plus size={20} />
          Add Doctor
        </button>

      </div>

      {/* Search */}

      <div className="relative mb-6">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search Doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border rounded-xl py-3 pl-12 pr-5 outline-none focus:ring-2 focus:ring-cyan-500"
        />

      </div>

      {/* Table */}

      {loading ? (
        <div className="text-center py-10">
          Loading Doctors...
        </div>
      ) : (
        <DoctorTable
            doctors={filteredDoctors}
  onEdit={handleEdit}
  onDelete={handleDelete}
        />
      )}
     
     <AddDoctorModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  fetchDoctors={fetchDoctors}
/>

<EditDoctorModal
  isOpen={isEditOpen}
  onClose={() => setIsEditOpen(false)}
  doctor={selectedDoctor}
  fetchDoctors={fetchDoctors}
/>
<DeleteDoctorModal
  isOpen={isDeleteOpen}
  onClose={() => setIsDeleteOpen(false)}
  doctor={selectedDoctor}
  fetchDoctors={fetchDoctors}
/>
    </Layout>
  );
};

export default DoctorManagement;