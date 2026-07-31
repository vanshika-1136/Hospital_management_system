const PrescriptionTable = ({ prescriptions = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow border mt-8">

      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          Prescription History
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left px-6 py-4">Medicine</th>
              <th className="text-left px-6 py-4">Dosage</th>
              <th className="text-left px-6 py-4">Instructions</th>
              <th className="text-left px-6 py-4">Date</th>
            </tr>

          </thead>

          <tbody>

            {prescriptions.length > 0 ? (
              prescriptions.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4">
                    {item.medicine}
                  </td>

                  <td className="px-6 py-4">
                    {item.dosage}
                  </td>

                  <td className="px-6 py-4">
                    {item.instructions}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      item.created_at
                    ).toLocaleDateString()}
                  </td>

                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500"
                >
                  No Prescriptions
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PrescriptionTable;