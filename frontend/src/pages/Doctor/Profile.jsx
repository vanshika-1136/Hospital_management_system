import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../../api/profileApi";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);

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

  const fetchProfile = async () => {
    try {
      const data = await getDoctorProfile(token);

      setFormData({
        fullName: data.doctor.full_name || "",
        email: data.doctor.email || "",
        phone: data.doctor.phone || "",
        department: data.doctor.department || "",
        specialization: data.doctor.specialization || "",
        qualification: data.doctor.qualification || "",
        experience: data.doctor.experience || "",
        consultation_fee:
          data.doctor.consultation_fee || "",
        availability:
          data.doctor.availability || "",
        status: data.doctor.status || "Active",
      });

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await updateDoctorProfile(
        formData,
        token
      );

      toast.success("Profile Updated");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Update Failed"
      );

    }
  };

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

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-2xl shadow p-8">

          <div className="flex items-center gap-5 mb-8">

            <div className="w-24 h-24 rounded-full bg-cyan-600 text-white flex items-center justify-center text-3xl font-bold">

              {formData.fullName
                ?.charAt(0)
                ?.toUpperCase()}

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                Dr. {formData.fullName}

              </h1>

              <p className="text-gray-500">

                {formData.specialization}

              </p>

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            <input
              className="border rounded-xl p-3"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
            />

            <input
              className="border rounded-xl p-3"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />

            <input
              className="border rounded-xl p-3"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />

            <input
              className="border rounded-xl p-3"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Department"
            />

            <input
              className="border rounded-xl p-3"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Specialization"
            />

            <input
              className="border rounded-xl p-3"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Qualification"
            />

            <input
              className="border rounded-xl p-3"
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Experience"
            />

            <input
              className="border rounded-xl p-3"
              type="number"
              name="consultation_fee"
              value={formData.consultation_fee}
              onChange={handleChange}
              placeholder="Consultation Fee"
            />

            <input
              className="border rounded-xl p-3"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="Availability"
            />

            <select
              className="border rounded-xl p-3"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button
              type="submit"
              className="md:col-span-2 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold"
            >
              Save Changes
            </button>

          </form>

        </div>

      </div>

    </Layout>
  );
};

export default Profile;