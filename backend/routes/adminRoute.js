import { getAllIcusWithPatients } from '../controllers/adminController.js';import express from 'express';

import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/patients', verifyToken, verifyAdmin, getAllIcusWithPatients);
// router.post('/api/icus',verifyToken,addICU);
// router.get('/icu-heads', verifyToken, getIcuHeads);

// router.get('/', getAllIcus);
// router.post('/', addIcu);
// router.put('/:id', updateIcu);
// router.delete('/:id', deleteIcu);





export default router;

