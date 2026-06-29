import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";

const router = express.Router();

// :role => admin | doctor | icuhead
router.get("/:role/:userId", getDashboardData);

export default router;
