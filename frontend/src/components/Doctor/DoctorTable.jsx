import { Pencil, Trash2 } from "lucide-react";

const DoctorTable = ({ doctors, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">Name</th>

              <th className="px-6 py-4 text-left">Email</th>

              <th className="px-6 py-4 text-left">Department</th>

              <th className="px-6 py-4 text-left">Specialization</th>

              <th className="px-6 py-4 text-left">Experience</th>

              <th className="px-6 py-4 text-left">Fee</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr
                  key={doctor.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 font-semibold">
                    {doctor.full_name}
                  </td>

                  <td className="px-6 py-4">
                    {doctor.email}
                  </td>

                  <td className="px-6 py-4">
                    {doctor.department || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {doctor.specialization || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {doctor.experience
                      ? `${doctor.experience} Years`
                      : "-"}
                  </td>

                  <td className="px-6 py-4">
                    ₹{doctor.consultation_fee || 0}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        doctor.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {doctor.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => onEdit(doctor)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={20} />
                      </button>

                      <button
                        onClick={() => onDelete(doctor)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan="8"
                  className="text-center py-10 text-gray-500"
                >
                  No Doctors Found
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DoctorTable;