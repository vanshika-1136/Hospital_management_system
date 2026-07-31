import api from "./axios";

// ================= GET PROFILE =================

export const getDoctorProfile = async (token) => {
  const response = await api.get("/doctor/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ================= UPDATE PROFILE =================

export const updateDoctorProfile = async (
  profile,
  token
) => {
  const response = await api.put(
    "/doctor/profile",
    profile,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};