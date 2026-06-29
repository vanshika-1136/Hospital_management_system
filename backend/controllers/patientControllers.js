import express from 'express';
import pool from '../db.js';

const router = express.Router();

export const Surgical= async (req, res) => {
  const { patient_id, surgery_type, date, surgeon, notes } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO surgical_records (patient_id, surgery_type, date, surgeon, notes,created_at) VALUES ($1, $2, $3, $4, $5,NOW())',
      [patient_id, surgery_type, date, surgeon, notes]
    );
    res.status(201).send({ message: 'Surgical record added.' ,
      data:result.rows[0]
    });
  } catch (err) {
    // res.status(500).send({ error: err.message });
    console.error('Error saving surgical record:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const History =  async (req, res) => {
  const { patientId, date } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM surgical_records WHERE patient_id = $1 AND date = $2',
      [patientId, date]
    );
    res.send(result.rows);
  } catch (err) {
    // res.status(500).send({ error: err.message });
    console.error('Error fetching surgical history:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
export const AntifungalRecord = async (req, res) => {
  const { patient_id, drug_name, dosage, frequency, administered_by, notes } = req.body;
  try {
    await pool.query(
      `INSERT INTO antifungal_records 
       (patient_id, drug_name, dosage, frequency, administered_by, notes) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [patient_id, drug_name, dosage, frequency, administered_by, notes]
    );
    res.status(201).send({ message: 'Antifungal record added.' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
// controllers/antimicrobialController.js


export const AntimicrobialRecord = async (req, res) => {
  try {
    const { patientId, drug_name, dosage, frequency, administered_by, notes } = req.body;

    const result = await pool.query(
      `INSERT INTO antimicrobial_records 
        (patient_id, drug_name, dosage, frequency, administered_by, notes,created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
      [patientId, drug_name, dosage, frequency, administered_by, notes]
    );

    res.status(201).json({
      message: 'Antimicrobial record added successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error saving antimicrobial record:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const addLabRecord = async (req, res) => {
  const { patient_id, test_name, result, date, technician, notes } = req.body;

  try {
    const query = `
      INSERT INTO lab_records (patient_id, test_name, result, date, technician, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [patient_id, test_name, result, date, technician, notes];
    const resultQuery = await pool.query(query, values);

    res.status(201).json({ message: 'Lab record saved successfully', data: resultQuery.rows[0] });
  } catch (err) {
    console.error('Error saving lab record:', err.message);
    res.status(500).json({ message: 'Server error while saving lab record' });
  }
};


export const addPatient = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      diagnosis,
      condition,
      doctor_id,
      icu_id,
      created_by,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO patients 
       (name, age, gender, diagnosis, condition, doctor_id, icu_id, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [name, age, gender, diagnosis, condition, doctor_id, icu_id, created_by]
    );

    res.status(201).json({ message: "Patient added", patientId: result.rows[0].id });
  } catch (err) {
    console.error("Error inserting patient:", err);
    res.status(500).json({ message: "Failed to add patient" });
  }
};
export const updateAntifungalRecord = async (req, res) => {
  const { id } = req.params;
  const { drug_name, dosage, frequency, administered_by, notes } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM antifungal_records WHERE patient_id = $1`,
      [id]
    );

    if (result.rows.length > 0) {
      // Record exists → UPDATE
      await pool.query(
        `UPDATE antifungal_records
         SET drug_name = $1, dosage = $2, frequency = $3, administered_by = $4, notes = $5
         WHERE patient_id = $6`,
        [drug_name, dosage, frequency, administered_by, notes, id]
      );
    } else {
      // Record does not exist → INSERT
      await pool.query(
        `INSERT INTO antifungal_records (patient_id, drug_name, dosage, frequency, administered_by, notes)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [id, drug_name, dosage, frequency, administered_by, notes]
      );
    }

    res.json({ message: "Antifungal record saved" });
  } catch (err) {
    console.error("Error saving antifungal record:", err.message);
    res.status(500).json({ error: "Failed to save antifungal record" });
  }
};



export const getFullPatientInfo = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Basic Info
    const basic = await pool.query(`SELECT * FROM patients WHERE id = $1`, [id]);

    // 2. Antifungal Record
    const antifungal = await pool.query(
      `SELECT * FROM antifungal_records WHERE patient_id = $1`,
      [id]
    );

    // 3. Antimicrobial Record
    const antimicrobial = await pool.query(
      `SELECT * FROM antimicrobial_records WHERE patient_id = $1`,
      [id]
    );

    // 4. Surgical Record
    const surgical = await pool.query(
      `SELECT * FROM surgical_records WHERE patient_id = $1`,
      [id]
    );

    // 5. Lab Record
    const lab = await pool.query(
      `SELECT * FROM lab_records WHERE patient_id = $1`,
      [id]
    );

    if (basic.rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json({
      basicInfo: basic.rows[0] || null,
      antifungal: antifungal.rows[0] || null,
      antimicrobial: antimicrobial.rows[0] || null,
      surgical: surgical.rows[0] || null,
      lab: lab.rows[0] || null,
    });
  } catch (err) {
    console.error("Error fetching full patient info:", err.message);
    res.status(500).json({ error: "Failed to fetch patient data" });
  }
};


export const updateBasicInfo = async (req, res) => {
  const { id } = req.params;
  const { name, age, gender, admission_date, doctor_id, icu_id } = req.body;

  try {
    const result = await pool.query(`SELECT * FROM patients WHERE id = $1`, [id]);

    if (result.rows.length > 0) {
      // Record exists → UPDATE
      await pool.query(
        `UPDATE patients
         SET name = $1, age = $2, gender = $3, admission_date = $4, doctor_id = $5, icu_id = $6
         WHERE id = $7`,
        [name, age, gender, admission_date, doctor_id, icu_id, id]
      );
    } else {
      // No record → INSERT
      await pool.query(
        `INSERT INTO patients (id, name, age, gender, admission_date, doctor_id, icu_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [id, name, age, gender, admission_date, doctor_id, icu_id]
      );
    }

    res.json({ message: "Basic patient info saved" });
  } catch (err) {
    console.error("Error saving basic info:", err.message);
    res.status(500).json({ error: "Failed to save basic patient info" });
  }
};


// 3. Update Antifungal Record
// export const updateAntifungalRecord = async (req, res) => {
//   const { id } = req.params;
//   const { drug_name, dosage, frequency, administered_by, notes } = req.body;

//   try {
//     await pool.query(
//       `UPDATE antifungal_records SET drug_name=$1, dosage=$2, frequency=$3,
//        administered_by=$4, notes=$5 WHERE patient_id=$6`,
//       [drug_name, dosage, frequency, administered_by, notes, id]
//     );
//     res.json({ message: "Antifungal record updated" });
//   } catch (err) {
//     console.error("Error updating antifungal record:", err.message);
//     res.status(500).json({ error: "Failed to update antifungal record" });
//   }
// };

// 4. Update Antimicrobial Record
export const updateAntimicrobialRecord = async (req, res) => {
  const { id } = req.params;
  const { drug_name, dosage, frequency, administered_by, notes } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM antimicrobial_records WHERE patient_id = $1`,
      [id]
    );

    if (result.rows.length > 0) {
      await pool.query(
        `UPDATE antimicrobial_records
         SET drug_name = $1, dosage = $2, frequency = $3, administered_by = $4, notes = $5
         WHERE patient_id = $6`,
        [drug_name, dosage, frequency, administered_by, notes, id]
      );
    } else {
      await pool.query(
        `INSERT INTO antimicrobial_records (patient_id, drug_name, dosage, frequency, administered_by, notes)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [id, drug_name, dosage, frequency, administered_by, notes]
      );
    }

    res.json({ message: "Antimicrobial record saved" });
  } catch (err) {
    console.error("Error saving antimicrobial record:", err.message);
    res.status(500).json({ error: "Failed to save antimicrobial record" });
  }
};


// 5. Update Surgical Record
export const updateSurgicalRecord = async (req, res) => {
  const { id } = req.params;
  const { surgery_type, date, surgeon, notes } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM surgical_records WHERE patient_id = $1`,
      [id]
    );

    if (result.rows.length > 0) {
      await pool.query(
        `UPDATE surgical_records
         SET surgery_type = $1, date = $2, surgeon = $3, notes = $4
         WHERE patient_id = $5`,
        [surgery_type, date, surgeon, notes, id]
      );
    } else {
      await pool.query(
        `INSERT INTO surgical_records (patient_id, surgery_type, date, surgeon, notes)
         VALUES ($1, $2, $3, $4, $5)`,
        [id, surgery_type, date, surgeon, notes]
      );
    }

    res.json({ message: "Surgical record saved" });
  } catch (err) {
    console.error("Error saving surgical record:", err.message);
    res.status(500).json({ error: "Failed to save surgical record" });
  }
};


// 6. Update Lab Record
export const updateLabRecord = async (req, res) => {
  const { id } = req.params;
  const { test_name, result, date, technician, notes } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM lab_records WHERE patient_id = $1`,
      [id]
    );

    if (result.rows.length > 0) {
      await pool.query(
        `UPDATE lab_records
         SET test_name = $1, result = $2, date = $3, technician = $4, notes = $5
         WHERE patient_id = $6`,
        [test_name, result, date, technician, notes, id]
      );
    } else {
      await pool.query(
        `INSERT INTO lab_records (patient_id, test_name, result, date, technician, notes)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [id, test_name, result, date, technician, notes]
      );
    }

    res.json({ message: "Lab record saved" });
  } catch (err) {
    console.error("Error saving lab record:", err.message);
    res.status(500).json({ error: "Failed to save lab record" });
  }
};






export default router;
