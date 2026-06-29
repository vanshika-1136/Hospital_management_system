import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loginSignupRoute from './routes/loginSignupRoute.js';
import adminRoute from './routes/adminRoute.js';
import doctorRoute from './routes/doctorRoute.js';
import icuHeadRoute from './routes/icuHeadRoute.js';
import commentRoute from './routes/commentRoute.js';
import patientRecordsRoutes from './routes/patientRecords.js';
import settingsRoutes from './routes/settings.js';
import userRoute from './routes/userRoute.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', loginSignupRoute);
// app.use('/api/patients', patientRoutes);


app.use('/api/patients', patientRecordsRoutes);


app.use('/api/admin', adminRoute);          // Admin dashboard API

app.use('/api/users', adminRoute);
app.use('/api/doctor', doctorRoute);        // Doctor dashboard API
app.use('/api', icuHeadRoute);     // ICU Head dashboard API
app.use('/api/comments', commentRoute);     // Shared comment APIs
app.use('/api/settings', settingsRoutes);
app.use('/api/users',userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




