const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/api/patients", async (req, res) => {
  try {
    const { name, age, condition, doctor_id, icu_id } = req.body;
    const result = await pool.query(
      "INSERT INTO patients (name, age, condition, doctor_id, icu_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, age, condition, doctor_id, icu_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));