import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import jwt from 'jsonwebtoken';
// import AdminDasboard from "./components/Roles/Admindashboard"

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return alert('Please fill in all fields');
    }

    try {
      const res = await axios.post('http://https://hospital-management-backend-mqyh.onrender.com/login', form);
      
      console.log("Login response:", res.data);

      // const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });


      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('userId', res.data.user.id);
      // localStorage.setItem('user', JSON.stringify(res.data.user));
      if (res.data.user.role === 'admin') navigate('/admin-dashboard');
else if (res.data.user.role === 'doctor') navigate('/doctor-dashboard');
else if (res.data.user.role === 'icu_head') navigate('/icuhead-dashboard');
else if (res.data.user.role === 'patient') navigate('/userDashboard');
      alert(`Welcome ${res.data.user.name}! Role: ${res.data.user.role}`);
      // const role = res.data.user.role;


      // Optional: Redirect based on role
      // if (res.data.user.role === 'admin') {
      //   window.location.href = '/admin-dashboard';
      // }

    } catch (err) {
      if (err.response && err.response.data?.message) {
        alert(err.response.data.message);
      } else {
        alert('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button onClick={handleLogin}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
      >Login</button>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Signup here</a>
      </p>
      </div>
    </div>
  );
}

export default Login;

