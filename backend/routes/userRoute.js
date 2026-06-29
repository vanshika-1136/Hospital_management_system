
import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {me,update} from '../controllers/userController.js'
const router = express.Router();

router.get("/me", verifyToken, me);     // Add from above
router.put("/update", verifyToken, update); // Add from above

export default router;
