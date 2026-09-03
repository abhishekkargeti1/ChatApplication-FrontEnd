 import axios from "axios";

// Dynamically points to your Ingress URL host
//export const baseURL = "http://98.92.245.161:8080"; 
export const baseURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
console.log(baseURL)
export const httpClient = axios.create({
  baseURL: `${baseURL}/api`,
});


