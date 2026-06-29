import express from 'express';
import { sendOTP, verifyOTP, registerUser, login } from '../controllers/loginSignupController.js';
import { hashPassword } from '../middlewares/hashPassword.js';

const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP, hashPassword, registerUser);
router.post('/login', login);

export default router;
