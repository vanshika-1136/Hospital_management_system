import { deleteDoctor } from "../../api/doctorApi";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const DeleteDoctorModal = ({
  isOpen,
  onClose,
  doctor,
  fetchDoctors,
}) => {
  const { token } = useAuth();

  if (!isOpen || !doctor) return null;

  const handleDelete = async () => {
    try {
      await deleteDoctor(doctor.id, token);

      toast.success("Doctor Deleted Successfully");

      fetchDoctors();

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-96 p-8">

        <h2 className="text-2xl font-bold mb-4">
          Delete Doctor
        </h2>

        <p className="text-gray-600 mb-8">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {doctor.full_name}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteDoctorModal;