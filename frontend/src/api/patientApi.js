import api from "./axios";

//================= GET ALL PATIENTS =================

// export const getDoctorPatients = async (token) => {
//   const response = await api.get("/doctor/patients", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data;
// };
export const getPatientDetails = async (id, token) => {
  const response = await api.get(`/patient/details/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getDoctorPatients = async (token) => {
  const { data } = await api.get(
    "/doctor/patients",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const getPatientDashboard = async (token) => {
  const { data } = await api.get(
    "/patient/dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};