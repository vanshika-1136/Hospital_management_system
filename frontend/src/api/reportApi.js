import axios from "axios";


const API=axios.create({

baseURL: import.meta.env.VITE_API_URL,

});



API.interceptors.request.use(config=>{

const token=localStorage.getItem("token");

config.headers.Authorization=
`Bearer ${token}`;


return config;

});



export const addReport=(data)=>{

return API.post(
"/doctor/reports",
data
);

};



export const getReports=()=>{

return API.get(
"/doctor/reports"
);

};