import axios, { InternalAxiosRequestConfig } from "axios";

const backendUrl = "http://localhost:8080";

const isServer = typeof window === "undefined";

// Create an instance of axios
const API = axios.create({
  baseURL: backendUrl,
});

class ClientSessionToken {
  private token: string = "";
  set value(token: string) {
    if (isServer) {
      throw new Error("Cannot set token");
    }
    this.token = token;
  }

  get value() {
    return this.token;
  }
}

export const clientSessionToken = new ClientSessionToken();
// Request interceptor
API.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  try {
    if (!isServer) {
      if (clientSessionToken.value) {
        config.headers.Authorization = `Bearer ${clientSessionToken.value}`;
      } else {
        config.headers.Authorization = ``;
      }
    }

    const baseUrl = config.baseURL;

    if (!baseUrl) {
      config.baseURL = "http://localhost:3000";
    }

    return config;
  } catch (error) {
    if (!isServer) {
      console.error("Request interceptor error:", error);
    }
    return Promise.reject(error);
  }
});

// // Response interceptor
// API.interceptors.response.use(
//   async (response) => {
//     if (!isServer) {
//       console.log("Response interceptor:", response);
//     }
//     return response;
//   },
//   async (error: AxiosError) => {
//     if (!isServer) {
//       console.error("Response interceptor error:", error);
//     }
//
//     if (error.response) {
//       if (error.response.status === 401 && !isServer) {
//         // Handle unauthorized error on client-side
//         console.log("Unauthorized access, redirecting to login...");
//         // Use Next.js router for navigation
//       }
//     } else if (error.request && !isServer) {
//       console.error("No response received:", error.request);
//     } else if (!isServer) {
//       console.error("Error setting up the request:", error.message);
//     }
//
//     return Promise.reject(error);
//   },
// );

export default API;
