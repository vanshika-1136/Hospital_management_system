import api from "./axios";

export const getICUDashboard = async (token) => {
  const { data } = await api.get("/icu/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};