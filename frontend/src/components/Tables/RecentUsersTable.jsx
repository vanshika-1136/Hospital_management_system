const RecentUsersTable = ({ users = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* Header */}

      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Users
        </h2>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left px-6 py-4 text-gray-500 font-semibold">
                Name
              </th>

              <th className="text-left px-6 py-4 text-gray-500 font-semibold">
                Email
              </th>

              <th className="text-left px-6 py-4 text-gray-500 font-semibold">
                Role
              </th>

              <th className="text-left px-6 py-4 text-gray-500 font-semibold">
                Joined
              </th>

              <th className="text-left px-6 py-4 text-gray-500 font-semibold">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 font-medium">
                    {user.full_name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">

                    <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm">
                      {user.role_name}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      Active
                    </span>

                  </td>

                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-400"
                >
                  No Users Found
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default RecentUsersTable;