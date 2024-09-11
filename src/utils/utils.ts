import axios from "axios";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export const API = axios.create({
  baseURL: backendUrl,
  // proxy: false,
});
