import express from 'express';
import { getDoctorPatients } from '../controllers/doctorController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/patients', verifyToken, getDoctorPatients);
// router.post('/comment', verifyToken, addDoctorComment);
export default router;
