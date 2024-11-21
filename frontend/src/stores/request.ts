import axios from "axios";

axios.defaults.headers.common["CommerceAuthToken"] = localStorage.getItem("token");

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 0,
});


console.log('import.meta.env.VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL)

export default request;
