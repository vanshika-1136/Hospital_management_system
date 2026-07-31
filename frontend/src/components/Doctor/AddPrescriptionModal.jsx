import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import { addPrescription } from "../../api/prescriptionApi";

const AddPrescriptionModal = ({
  patientId,
  onClose,
  onSuccess,
}) => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    medicine: "",
    dosage: "",
    instructions: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPrescription(
        {
          patient_id: patientId,
          ...formData,
        },
        token
      );

      toast.success("Prescription Added");

      onSuccess();
      onClose();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to Add Prescription"
      );

    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-xl rounded-2xl p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Add Prescription
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            name="medicine"
            placeholder="Medicine"
            className="w-full border rounded-lg p-3"
            value={formData.medicine}
            onChange={handleChange}
            required
          />

          <input
            name="dosage"
            placeholder="Dosage"
            className="w-full border rounded-lg p-3"
            value={formData.dosage}
            onChange={handleChange}
            required
          />

          <textarea
            name="instructions"
            placeholder="Instructions"
            rows={4}
            className="w-full border rounded-lg p-3"
            value={formData.instructions}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl"
          >
            Save Prescription
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddPrescriptionModal;