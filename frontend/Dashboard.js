import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://https://hospital-management-backend-mqyh.onrender.com/api/data");
      setRecords(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Data Dashboard</h2>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th>Name</th><th>Age</th><th>Specialization</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, idx) => (
              <tr key={idx}>
                <td>{rec.name}</td>
                <td>{rec.age}</td>
                <td>{rec.specialization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
