import { useState } from "react";
import { X } from "lucide-react";
import { addDoctor } from "../../api/doctorApi";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const AddDoctorModal = ({ isOpen, onClose, fetchDoctors }) => {
  const { token } = useAuth();

  const initialState = {
    fullName: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    specialization: "",
    qualification: "",
    experience: "",
    consultation_fee: "",
    availability: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoctor(formData, token);

      toast.success("Doctor Added Successfully");

      setFormData(initialState);

      fetchDoctors();

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-3xl p-8 relative">

        {/* Close */}

        <button
          onClick={onClose}
          className="absolute right-5 top-5"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-6">
          Add Doctor
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5"
        >

          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="experience"
            type="number"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="consultation_fee"
            type="number"
            placeholder="Consultation Fee"
            value={formData.consultation_fee}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="availability"
            placeholder="Availability"
            value={formData.availability}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <button
            type="submit"
            className="col-span-2 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold"
          >
            Add Doctor
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddDoctorModal;