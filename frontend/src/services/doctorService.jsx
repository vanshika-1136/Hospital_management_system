import axios from "axios";


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/doctors",
});


// attach token automatically
API.interceptors.request.use((config)=>{

  const token = localStorage.getItem("token");

  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});



// Get all doctors
export const getDoctors = async()=>{

  const res = await API.get("/");

  return res.data;

};



// Add doctor
export const addDoctor = async(data)=>{

  const res = await API.post("/",data);

  return res.data;

};



// Update doctor
export const updateDoctor = async(id,data)=>{

  const res = await API.put(`/${id}`,data);

  return res.data;

};



// Delete doctor
export const deleteDoctor = async(id)=>{

  const res = await API.delete(`/${id}`);

  return res.data;

};