import axios from "axios";

// Dynamically points to your Ingress URL host
export const baseURL = "http://98.92.245.161:8080"; 

export const httpClient = axios.create({
  baseURL: `${baseURL}/api`,
});