// import pool from "../db.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded JWT:", decoded);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};



// GET /dashboard/:role/:userId
// export const getDashboardData = async (req, res) => {
//   const { role, userId } = req.params;

//   try {
//     let result;

//     if (role === "admin") {
//       result = await pool.query(`
//         SELECT p.*, u.name AS doctor_name, i.name AS icu_name
//         FROM patients p
//         JOIN users u ON p.doctor_id = u.id
//         JOIN icus i ON p.icu_id = i.id
//       `);
//     } else if (role === "doctor") {
//       result = await pool.query(
//         `SELECT * FROM patients WHERE doctor_id = $1`,
//         [userId]
//       );
//     } else if (role === "icuhead") {
//       const icuResult = await pool.query(
//         `SELECT id FROM icus WHERE head_id = $1`,
//         [userId]
//       );
//       const icuIds = icuResult.rows.map(row => row.id);
//       if (icuIds.length === 0) {
//         return res.json([]);
//       }

//       result = await pool.query(
//         `SELECT * FROM patients WHERE icu_id = ANY($1::int[])`,
//         [icuIds]
//       );
//     } else {
//       return res.status(403).json({ message: "Invalid role" });
//     }

//     res.json(result.rows);
//   } catch (err) {
//     console.error("Dashboard error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


