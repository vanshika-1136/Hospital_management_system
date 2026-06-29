import express from 'express';
import { getICUPatients,icusWithHead
    ,  getAllIcus,
  addIcu,
  updateIcu,
  deleteIcu,
   getIcuHeads 
 } from '../controllers/icuHeadController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';


const router = express.Router();
router.get('/icu-patients', verifyToken, getICUPatients);
// router.post('/add-comment',verifyToken, addPatientComment);
router.get('/icus-with-heads',icusWithHead);

router.post('/add-icu',verifyToken, addIcu);          // POST /api/users/add-icu
router.get('/icus',verifyToken, getAllIcus);          // GET /api/users/icus
router.put('/update-icu/:id',verifyToken, updateIcu); // PUT /api/users/update-icu/3
router.delete('/delete-icu/:id', verifyToken,deleteIcu);

router.get('/users/icu-heads', verifyToken,getIcuHeads);
export default router;
