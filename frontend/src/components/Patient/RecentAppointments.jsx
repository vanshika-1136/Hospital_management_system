const RecentAppointments = ({ appointments }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-5">
        Recent Appointments
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">
              Date
            </th>

            <th>Status</th>

            <th>Symptoms</th>

          </tr>

        </thead>

        <tbody>

          {appointments.map((item) => (

            <tr
              key={item.id}
              className="border-b"
            >

              <td className="py-3">
                {item.appointment_date}
              </td>

              <td>{item.status}</td>

              <td>{item.symptoms}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RecentAppointments;