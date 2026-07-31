import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientTable = ({ patients = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow border">

      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          Patient List
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Name
              </th>

              <th className="px-6 py-4 text-left">
                Gender
              </th>

              <th className="px-6 py-4 text-left">
                Age
              </th>

              <th className="px-6 py-4 text-left">
                Blood Group
              </th>

              <th className="px-6 py-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-5">
                    {patient.full_name}
                  </td>

                  <td className="px-6 py-5">
                    {patient.gender}
                  </td>

                  <td className="px-6 py-5">
                    {patient.age}
                  </td>

                  <td className="px-6 py-5">
                    {patient.blood_group}
                  </td>

                  <td className="px-6 py-5 text-center">

                    <button
                      onClick={() =>
                        navigate(
                          `/doctor/patient/${patient.id}`
                        )
                      }
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
                    >
                      <Eye size={18} />
                      View
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No Patients Found
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PatientTable;