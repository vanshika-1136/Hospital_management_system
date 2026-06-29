// controllers/doctorController.js
import pool from "../db.js";

// Get doctors by specialization
export const getDoctorsBySpecialization = async (req, res) => {
  const { specialization } = req.query

  try {
    const result = await pool.query(
      `
      SELECT u.id, u.name, u.image, s.name AS specialization
      FROM users u
      JOIN doctor_profiles dp ON dp.user_id = u.id
      JOIN specializations s ON dp.specialization_id = s.id
      WHERE s.name = $1 AND u.role = 'doctor'
      `,
      [specialization]
    );
     if (result.rows.length === 0) {
      return res.status(404).json({ message: "No doctors found for this specialization." });
    }
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};
