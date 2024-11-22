import axios, { type AxiosInstance } from "axios";

axios.defaults.headers.common["CommerceAuthToken"] = localStorage.getItem("token");

<<<<<<< HEAD
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
=======
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

console.log('baseURL', baseURL)

const request: AxiosInstance = axios.create({
  baseURL,
>>>>>>> 7db443e8a2e2d9ef8df40b962a91ca05b5264cf0
  timeout: 0,
});

// request.interceptors.request.use()




export default request;
