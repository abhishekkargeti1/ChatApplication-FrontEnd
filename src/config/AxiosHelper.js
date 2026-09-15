import axios from "axios";

// Dynamically points to the current host
export const baseURL = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}`;

console.log("Base URL:", baseURL);

export const httpClient = axios.create({
  baseURL: `${baseURL}/chatapi`,
});