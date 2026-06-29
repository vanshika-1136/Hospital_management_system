// middlewares/hashPassword.js
import bcrypt from 'bcrypt';

export const hashPassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is missing for hashing.' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    req.body.password = hashed; // overwrite plain with hashed
    next(); // move to DB insertion
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).json({ message: 'Failed to hash password' });
  }
};





