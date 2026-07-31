import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { updateDoctor } from "../../api/doctorApi";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const EditDoctorModal = ({
  isOpen,
  onClose,
  doctor,
  fetchDoctors,
}) => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    specialization: "",
    qualification: "",
    experience: "",
    consultation_fee: "",
    availability: "",
    status: "Active",
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        fullName: doctor.full_name || "",
        email: doctor.email || "",
        phone: doctor.phone || "",
        department: doctor.department || "",
        specialization: doctor.specialization || "",
        qualification: doctor.qualification || "",
        experience: doctor.experience || "",
        consultation_fee: doctor.consultation_fee || "",
        availability: doctor.availability || "",
        status: doctor.status || "Active",
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateDoctor(doctor.id, formData, token);

      toast.success("Doctor Updated Successfully");

      fetchDoctors();

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-3xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute right-5 top-5"
        >
          <X />
        </button>

        <h2 className="text-3xl font-bold mb-6">
          Edit Doctor
        </h2>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-2 gap-5"
        >
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            placeholder="Full Name"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            placeholder="Email"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            placeholder="Phone"
          />

          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            placeholder="Department"
          />

          <input
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            placeholder="Specialization"
          />

          <input
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            placeholder="Qualification"
          />

          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            placeholder="Experience"
          />

          <input
            type="number"
            name="consultation_fee"
            value={formData.consultation_fee}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            placeholder="Consultation Fee"
          />

          <input
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            placeholder="Availability"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button
            className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
          >
            Update Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDoctorModal;