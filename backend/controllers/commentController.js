import pool from '../db.js';

// Add a new comment
export const addComment = async (req, res) => {
  const userId = req.user.id;
  const { patientId, comment } = req.body;

  try {
    await pool.query(
      `INSERT INTO patient_comments (patient_id, user_id, comment) VALUES ($1, $2, $3)`,
      [patientId, userId, comment]
    );
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get comments for a patient
export const getCommentsByPatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    const result = await pool.query(
      `SELECT c.comment, c.created_at, u.name AS commenter 
       FROM patient_comments c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.patient_id = $1 ORDER BY c.created_at DESC`,
      [patientId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

