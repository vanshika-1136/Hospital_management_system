import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,  // Your Gmail address
    pass: process.env.SMTP_PASS   // Your Gmail App Password (not account password!)
  }
});

// OTP generator
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// Send email with OTP
export async function sendOTPEmail(recipientEmail, otp, message = '') {
  const mailOptions = {
    from: `"My App" <${process.env.SMTP_USER}>`,
    to: recipientEmail,
    subject: 'Your One-Time Password (OTP)',
    text: `***Your OTP is***\n${otp}\n\n${message}`,
    html: `
      <h2 style="color: #2e6c80;">Your OTP Code</h2>
      <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
      <p>${message}</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${recipientEmail}: ${info.response}`);
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    throw error;
  }
}

// module.exports = { sendOTPEmail, generateOTP }; // -->FOR COMMON JS
