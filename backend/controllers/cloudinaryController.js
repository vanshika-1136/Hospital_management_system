import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import pool from '../db.js'; // PostgreSQL connection

export const uploadImage = async (req, res) => {
  try {
    // 1. Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path , {
    folder: 'user_profiles'
    });
    fs.unlinkSync(req.file.path); // remove local temp file

    // 2. Save URL to database
    const { userId } = req.body;
    const imageUrl = result.secure_url;

    await pool.query(
      'UPDATE users SET image = $1 WHERE id = $2',
      [imageUrl, userId]
    );

    res.json({ message: 'Image uploaded', imageUrl });
  } catch (err) {
    console.error('Cloudinary error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
};


