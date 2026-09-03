// import axios from "axios";

// // Dynamically points to your Ingress URL host
// export const baseURL = "http://98.92.245.161:8080"; 

// export const httpClient = axios.create({
//   baseURL: `${baseURL}/api`,
// });


import axios from "axios";

// Dynamically use the current host and protocol without hardcoding port 8080
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  const host = window.location.hostname;
  const protocol = window.location.protocol;
  
  // Connects via standard port 80/443 directly to Ingress
  return `${protocol}//${host}`;
};

export const baseURL = getBaseURL();

export const httpClient = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});