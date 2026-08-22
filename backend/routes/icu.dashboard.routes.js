import express from "express";

import auth from "../middleware/auth.js";
import authorizeRoles from "../middleware/role.js";

import {
  getICUDashboard,
} from "../controllers/icu.dashboard.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  auth,
  authorizeRoles("ICU Head"),
  getICUDashboard
);

export default router;