import pool from '../db.js';

export const getDoctorPatients = async (req, res) => {
   try {
    const userId = req.user.id;
    const role = req.user.role;
      if (role !== 'doctor') {
    return res.status(403).json({ message: 'Access denied' });
    }
        // Get doctor's id from doctors table
    const doctorResult = await pool.query(
      'SELECT id FROM doctor_profiles WHERE user_id = $1',
      [userId]
    );

        if (doctorResult.rows.length === 0) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    const doctorId = doctorResult.rows[0].id;
 
    const result = await pool.query(
       `SELECT p.*, i.name AS icu_name
       FROM patients p
       LEFT JOIN icus i ON p.icu_id = i.id
       WHERE p.doctor_id = $1`
    //   `
    //   SELECT p.*, i.name AS icu_name, u.name AS doctor_name
    //   FROM patients p
    //   JOIN icus i ON p.icu_id = i.id
    //   JOIN users u ON p.created_by= u.id
    //   WHERE p.created_by= $1
    // `
    , [doctorId]);

    res.json(result.rows);
  } catch (err) {
    console.error('Error in getDoctorPatients:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
export const addPatientComment = async (req, res) => {
  const { patient_id, comment } = req.body;
  const doctor_id = req.user.id;
  const role = req.user.role;

  if (!patient_id || !comment) {
        return res.status(400).json({ message: 'Patient ID and comment are required' });
  }
    if (role !== 'doctor') {
    return res.status(403).json({ message: 'Access denied' });
   }
  try {
    await pool.query(
      'INSERT INTO patient_comments (patient_id, user_id, comment) VALUES ($1, $2, $3)',
      [patient_id, doctor_id, comment]
    );
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
