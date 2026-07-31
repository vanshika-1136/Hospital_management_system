import {
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const AppointmentTable = ({ appointments = [] }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border">

      <div className="p-6 border-b">

        <h2 className="text-2xl font-bold">
          Today's Appointments
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left px-6 py-4">
                Time
              </th>

              <th className="text-left px-6 py-4">
                Patient
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-center px-6 py-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-5 font-medium">
                    {appointment.appointment_time}
                  </td>

                  <td className="px-6 py-5">
                    {appointment.full_name}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      <button
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg"
                      >
                        <CheckCircle size={18} />
                      </button>

                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                      >
                        <Clock size={18} />
                      </button>

                      <button
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                      >
                        <XCircle size={18} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan="4"
                  className="text-center py-8 text-gray-500"
                >
                  No appointments today.
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AppointmentTable;