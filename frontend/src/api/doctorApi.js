import api from "./axios";

// ================= GET ALL DOCTORS =================

export const getDoctors = async (token) => {
  const response = await api.get("/doctor", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ================= ADD DOCTOR =================

export const addDoctor = async (doctorData, token) => {
  const response = await api.post(
    "/doctor",
    doctorData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ================= UPDATE DOCTOR =================

export const updateDoctor = async (
  id,
  doctorData,
  token
) => {
  const response = await api.put(
    `/doctor${id}`,
    doctorData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ================= DELETE DOCTOR =================

export const deleteDoctor = async (
  id,
  token
) => {
  const response = await api.delete(
    `/doctor/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



