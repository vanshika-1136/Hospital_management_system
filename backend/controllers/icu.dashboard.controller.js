import pool from "../config/db.js";

export const getICUDashboard = async (req, res) => {
  try {
    // Total beds
    const totalBeds = await pool.query(`
      SELECT COUNT(*) AS total
      FROM icu_beds
    `);

    // Occupied beds
    const occupiedBeds = await pool.query(`
      SELECT COUNT(*) AS total
      FROM icu_beds
      WHERE status = 'Occupied'
    `);

    // Available beds
    const availableBeds = await pool.query(`
      SELECT COUNT(*) AS total
      FROM icu_beds
      WHERE status = 'Available'
    `);

    // Current ICU patients
    const patients = await pool.query(`
      SELECT
        icu_beds.id,
        icu_beds.bed_number,
        icu_beds.admitted_at,
        patients.id AS patient_id,
        users.full_name,
        patients.age,
        patients.gender,
        patients.blood_group
      FROM icu_beds
      JOIN patients
        ON icu_beds.patient_id = patients.id
      JOIN users
        ON patients.user_id = users.id
      WHERE icu_beds.status = 'Occupied'
      ORDER BY icu_beds.admitted_at DESC
    `);

    res.status(200).json({
      success: true,

      statistics: {
        totalBeds: Number(totalBeds.rows[0].total),
        occupiedBeds: Number(occupiedBeds.rows[0].total),
        availableBeds: Number(availableBeds.rows[0].total),
      },

      patients: patients.rows,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to load ICU dashboard",
    });
  }
};