// routes/patients.js
router.post('/', async (req, res) => {
  const { name, age, gender, admission_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO patients (name, age, gender, admission_date) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, age, gender, admission_date]
    );
    res.status(201).send({ message: 'Patient added', patient_id: result.rows[0].id });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// patientRecords.js
router.post('/antifungal-record', verifyToken, AntifungalRecord);

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loginSignupRoute from './routes/loginSignupRoute.js';
import adminRoute from './routes/adminRoute.js';
import doctorRoute from './routes/doctorRoute.js';
import icuHeadRoute from './routes/icuHeadRoute.js';
import commentRoute from './routes/commentRoute.js';
import patientRecordsRoutes from './routes/patientRecords.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', loginSignupRoute);



app.use('/api/patients', patientRecordsRoutes);


app.use('/api/admin', adminRoute);          // Admin dashboard API
app.use('/api/doctor', doctorRoute);        // Doctor dashboard API
app.use('/api', icuHeadRoute);     // ICU Head dashboard API
app.use('/api/comments', commentRoute);     // Shared comment APIs


// Test route
// app.get('/', (req, res) => {
//   res.send('Hospital Management API is running');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
