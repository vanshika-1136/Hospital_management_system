import express from "express";
import cors from "cors";
import pg from "pg"; // or destructure with: import { Pool } from "pg";
import dotenv from "dotenv"; 

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Route to insert patient
app.post("/api/patients", async (req, res) => {
  const { name, age, condition, doctor_id, icu_id } = req.body;

  try {
    await pool.query(
      "INSERT INTO patients (name, age, condition, doctor_id, icu_id) VALUES ($1, $2, $3, $4, $5)",
      [name, age, condition, doctor_id, icu_id]
    );
    res.status(201).json({ message: "Patient added" });
  } catch (err) {
    console.error("DB Insert Error:", err);
    res.status(500).json({ error: "Failed to add patient" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});



//To see patient details
// app.listen(5000, () => console.log("Server running on port 5000"));

// app.get('/api/patients', async (req, res) => {
//   const result = await pool.query('SELECT * FROM patients');
//   res.json(result.rows);
// });
