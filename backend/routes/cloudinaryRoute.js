import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/cloudinaryController.js';

const upload = multer({ dest: 'uploads/' }); // Temporary storage
const router = express.Router();

router.post('/upload', upload.single('image'), uploadImage);

export default router;
