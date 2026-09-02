import axios from 'axios';

const baseURL = "/api";

export const httpClient = axios.create({
  baseURL: baseURL,
});
export { baseURL };