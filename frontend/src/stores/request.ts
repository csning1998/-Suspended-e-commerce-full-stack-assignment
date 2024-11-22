import axios, { type AxiosInstance } from "axios";

axios.defaults.headers.common["CommerceAuthToken"] =
  localStorage.getItem("token");

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

console.log("baseURL", baseURL);

const request: AxiosInstance = axios.create({
  baseURL,
});
// request.interceptors.request.use()

export default request;
