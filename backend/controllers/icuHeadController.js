import pool from '../db.js';

// Add a comment to a patient by ICU head
export const addPatientComment = async (req, res) => {
  const { patient_id, comment } = req.body;
  const icu_head_id = req.user.id;

  if (!patient_id || !comment) {
    return res.status(400).json({ message: 'Patient ID and comment are required' });
  }

  try {
    await pool.query(
      'INSERT INTO patient_comments (patient_id, icu_head_id, comment) VALUES ($1, $2, $3)',
      [patient_id, icu_head_id, comment]
    );
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getICUPatients = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    if (role !== 'icu_head') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const icuResult = await pool.query(
      'SELECT id FROM icus WHERE head_user_id = $1',
      [userId]
    );

    if (icuResult.rows.length === 0) {
      return res.status(404).json({ message: 'No ICU found for this ICU head' });
    }

    const icuId = icuResult.rows[0].id;

    const patientsResult = await pool.query(
      `SELECT p.*, i.name AS icu_name, u.name AS created_by
       FROM patients p
       JOIN icus i ON p.icu_id = i.id
       JOIN users u ON p.created_by = u.id
       WHERE p.icu_id = $1`,
      [icuId]
    );

    res.json(patientsResult.rows);
  } catch (err) {
    console.error('Error in getICUPatients:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const icusWithHead =async (req, res) => {
  try {
    const result = await pool.query(`
     SELECT icus.id, icus.name AS icu_name, users.name AS head_name
      FROM icus
      JOIN users ON icus.head_user_id = users.id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching ICUs with heads:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




export const getAllIcus = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT icus.*, users.name AS head_name 
      FROM icus 
      LEFT JOIN users ON icus.head_user_id = users.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching ICUs:", err);
    res.status(500).json({ error: "Failed to fetch ICUs" });
  }
};

// Add ICU
export const addIcu= async (req, res) => {
  const { name, head_user_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO icus (name, head_user_id) VALUES ($1, $2) RETURNING *`,
      [name, head_user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding ICU:", err);
    res.status(500).json({ error: "Failed to add ICU" });
  }
};

// Update ICU
export const updateIcu = async (req, res) => {
  const { id } = req.params;
  const { name, head_user_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE icus SET name = $1, head_user_id = $2 WHERE id = $3 RETURNING *`,
      [name, head_user_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating ICU:", err);
    res.status(500).json({ error: "Failed to update ICU" });
  }
};

// Delete ICU
export const deleteIcu = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM icus WHERE id = $1`, [id]);
    res.json({ message: "ICU deleted successfully" });
  } catch (err) {
    console.error("Error deleting ICU:", err);
    res.status(500).json({ error: "Failed to delete ICU" });
  }
};

export const getIcuHeads = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        icus.id AS icu_id,
        icus.name AS icu_name,
        users.id AS head_id,
        users.name AS head_name,
        users.email AS head_email,
        users.image AS head_image
      FROM icus
      JOIN users ON icus.head_user_id = users.id
      WHERE users.role = 'icuhead'
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching ICU Heads:', error.message);
    res.status(500).json({ message: 'Failed to fetch ICU Heads' });
  }
};
// import pool from '../db.js';

// export const getICUPatients = async (req, res) => {
//   try {
//     const userId = req.user.id; // comes from token
    
//      const role = req.user.role; 
//      console.log("Logged-in user ID:", req.user.id);
//      if (role !== 'icu_head') {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//     // Find ICU where this user is head
//     const icuResult = await pool.query(
//       `SELECT id FROM icus WHERE head_user_id = $1`,
//       [userId]
//     );
//     console.log("ICU Result:", icuResult.rows);

//     if (icuResult.rows.length === 0) {
//       return res.status(404).json({ message: "ICU not found for this user-head" });
//     }

//     const icuId = icuResult.rows[0].id;

//     // Fetch patients under this ICU
//     const result = await pool.query(`
//       SELECT p.*, i.name AS icu_name, u.name AS created_by
//       FROM patients p
//       JOIN icus i ON p.icu_id = i.id
//       JOIN users u ON p.created_by = u.id
//       WHERE p.icu_id = $1
//     `, [icuId]);

//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error in getICUPatients:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

