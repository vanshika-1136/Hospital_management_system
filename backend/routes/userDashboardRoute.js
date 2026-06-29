// routes/doctorRoutes.js
import express from "express";
import { getDoctorsBySpecialization } from "../controllers/userDashboardController.js";

const router = express.Router();

router.get("/specializations", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM specializations ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching specializations:", err);
    res.status(500).json({ error: "Failed to fetch specializations" });
  }
});


export default router;

// :specialization → lives in req.params

// ?specialization= → lives in req.query