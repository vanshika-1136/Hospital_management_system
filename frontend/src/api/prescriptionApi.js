import api from "./axios";

// ================= ADD PRESCRIPTION =================

export const addPrescription = async (
  prescriptionData,
  token
) => {
  const { data } = await api.post(
    "/prescriptions",
    prescriptionData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};