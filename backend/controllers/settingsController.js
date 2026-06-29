// controllers/settingsController.js
import pool from '../db.js';
import bcrypt from 'bcrypt';

export const updateInfo = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user.id;

  try {
    await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, userId]
    );
    res.json({ message: 'Info updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update info.' });
  }
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query('SELECT password FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ message: 'Old password incorrect.' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashed, userId]);

    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error changing password.' });
  }
};
