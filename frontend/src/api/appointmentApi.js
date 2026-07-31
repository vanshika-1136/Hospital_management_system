import api from "./axios";

// ================= GET APPOINTMENTS =================

export const getAppointments = async (token) => {
  const { data } = await api.get("/appointments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// ================= UPDATE STATUS =================

export const updateAppointmentStatus = async (
  id,
  status,
  token
) => {
  const { data } = await api.put(
    `/appointments/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};