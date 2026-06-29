import pool from '../db.js';

// Admin: Get all ICUs with ICU Head info + patients in each ICU
export const getAllIcusWithPatients = async (req, res) => {
  try {
    // Get ICUs with ICU head name
    const icuResult = await pool.query(`
      SELECT icus.id AS icu_id, icus.name AS icu_name, users.name AS icu_head_name
      FROM icus
      JOIN users ON icus.head_user_id = users.id
    `);

    const icus = icuResult.rows;

    // For each ICU, get patients in that ICU
    for (const icu of icus) {
      const patientResult = await pool.query(`
        SELECT patients.id, patients.name, patients.age, u.name AS doctor_name
        FROM patients
        LEFT JOIN users u ON patients.doctor_id = u.id
        WHERE patients.icu_id = $1
      `, [icu.icu_id]);

      icu.patients = patientResult.rows;
    }

    res.json(icus);
  } catch (error) {
    console.error("Admin fetch error:", error);
    res.status(500).json({ message: "Failed to fetch ICU and patient data" });
  }
};




