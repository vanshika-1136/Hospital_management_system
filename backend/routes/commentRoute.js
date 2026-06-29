import express from 'express';
import { addComment, getCommentsByPatient } from '../controllers/commentController.js';
import {verifyToken} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, addComment);
router.get('/:patientId', verifyToken, getCommentsByPatient);

export default router;

