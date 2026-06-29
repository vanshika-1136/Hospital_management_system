import dotenv from 'dotenv';
dotenv.config();
import { sendOTPEmail, generateOTP } from '../utils/otpMailer.js';
import bcrypt from 'bcrypt';
import pool from '../db.js'; // if exported as default

import jwt from 'jsonwebtoken';
const  JWT_SECRET = process.env.JWT_SECRET || 'secret123'; 

const OTPStore = {}; // { email: { otp, expiresAt, name?, password? } }
// Improved OTP storage function
function saveOTP(email, otp,name, password, role) {
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  OTPStore[email] = { 
    otp: String(otp), 
    expiresAt,
    ...(name && { name }), // only store if not null
    ...(password && { password }),
    ...(role && { role }),
  };
}

// Generate and send OTP
export const sendOTP= async (req, res) => {
  const { email, name, password, role } = req.body;

  try {

    const existUser = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
    if(existUser.rows.length>0){
      return res.status(400).json ({ message:'User already exists. Please login.'});
    }
    const otp = generateOTP();
    saveOTP(email, otp, name, password, role);

    await sendOTPEmail(email, otp, 'Use this OTP to complete your signup.');

    res.json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

//import {hashPassword} from './middlewares/hashPassword.js';
export const verifyOTP =async (req, res,next) => {
  const { email, otp } = req.body;
  const data = OTPStore[email];

  if (!data || data.otp !== String(otp) || data.expiresAt < Date.now()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  req.body.name = data.name;
  req.body.email = email; //tere saveOTP me to email hehi ni agr hoti to data.email aata pr email to tune pehle hi req.body s leli
  req.body.password = data.password;
  req.body.role = data.role;
  next();
};

export const registerUser= async (req,res)=>{
//   const { email, otp } = data;


  const { name, email, password, role } = req.body;//--




  try {
   const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id',
      [name, email, password, role]
    );

    // create icu
    const userId = result.rows[0].id;
        if (role === 'icu_head') {
      await pool.query(
        'INSERT INTO icus (name, head_user_id) VALUES ($1, $2)',
        [`${name}'s ICU`, userId]
      );
    }


    delete OTPStore[email]; // OTP used, remove it
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving user to database' });
  }
};

export const login= async (req, res) => {
  const { email, password } = req.body;
  try{
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (user.rowCount === 0) {
    return res.status(400).json({ message: 'User not found' });
  }

  const match = await bcrypt.compare(password, user.rows[0].password);

  if (!match) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

      // 1. Create JWT
    const token = jwt.sign(
      { id: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

  res.json({
    token,
    message: 'Login successful',
    token,
    user: {
      id: user.rows[0].id,
      name: user.rows[0].name,
      role: user.rows[0].role
    }
  });


} catch (err){
  console.error(err);
  res.status(500).json({ message: 'Login failed' });
}
};