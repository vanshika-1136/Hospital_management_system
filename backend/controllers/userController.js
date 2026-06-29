import pool from '../db.js';
export const me= async (req, res) => {
  try {
    const result = await pool.query("SELECT name, email FROM users WHERE id = $1", [req.user.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user info" });
  }
};
export const update=async (req, res) => {
  const { name, email } = req.body;
  try {
    await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [
      name,
      email,
      req.user.id,
    ]);
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user info" });
  }
};