import axios from 'axios';

const baseURL = "http://chat-app-backend-service:8080";

export const httpClient = axios.create({
  baseURL: baseURL,
});
export { baseURL };