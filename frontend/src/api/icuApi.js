import api from "./axios";

export const getICUDashboard = async (token) => {
  const { data } = await api.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};