// routes/settings.js
import express from 'express';
import {verifyToken} from '../middlewares/authMiddleware.js';
import { updateInfo, changePassword } from '../controllers/settingsController.js';

const router = express.Router();

router.put('/update-info', verifyToken, updateInfo);
router.put('/change-password', verifyToken, changePassword);

export default router;
