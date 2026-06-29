import express from 'express';
import { Surgical,History ,addLabRecord, addPatient, AntifungalRecord,AntimicrobialRecord} from '../controllers/patientControllers.js';
import {verifyToken} from '../middlewares/authMiddleware.js';
// import { getFullPatientInfo } from "../controllers/patientControllers.js";
import {
  getFullPatientInfo,
  updateBasicInfo,
  updateAntifungalRecord,
  updateAntimicrobialRecord,
  updateSurgicalRecord,
  updateLabRecord
} from '../controllers/patientControllers.js';
const router = express.Router();

router.post('/surgical-records',  Surgical);


router.post('/basic-info',addPatient); 
router.get('/surgical-history/:patientId/:date',History);
router.post('/antifungal-record',  AntifungalRecord);
router.post('/antimicrobial-record', AntimicrobialRecord);
router.post('/lab-record',addLabRecord);
router.put("/:id",verifyToken, getFullPatientInfo);

router.get('/:id', verifyToken, getFullPatientInfo);
router.put('/basic-info/:id', verifyToken, updateBasicInfo);
router.put('/antifungal-record/:id', verifyToken, updateAntifungalRecord);
router.put('/antimicrobial-record/:id', verifyToken, updateAntimicrobialRecord);
router.put('/surgical-record/:id', verifyToken, updateSurgicalRecord);
router.put('/lab-record/:id', verifyToken, updateLabRecord);

// // GET patient by ID
// router.get('/edit-patients/:id', async (req, res) => {
//   const { id } = req.params;
//   const result = await pool.query('SELECT * FROM patients WHERE id = $1', [id]);
//   res.json(result.rows[0]);
// });

// // PUT update patient
// router.put('/edit-patients/:id', async (req, res) => {
//   const { id } = req.params;
//   const {
//     name, age, gender, admission_date,
//     diagnosis, condition
//   } = req.body;

//   await pool.query(
//     `UPDATE patients SET name=$1, age=$2, gender=$3, admission_date=$4,
//      diagnosis=$5, condition=$6 WHERE id=$7`,
//     [name, age, gender, admission_date, diagnosis, condition, id]
//   );

//   res.json({ message: 'Patient updated' });
// });


export default router;
