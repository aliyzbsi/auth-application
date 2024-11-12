import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002/api/auth",
  withCredentials: true,
});

export const register = (data) => api.post("/register", data);
export const login = (data) => api.post("/login", data);
