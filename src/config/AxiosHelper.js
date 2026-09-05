// import axios from "axios";

// // Corrected URL (removed the trailing slash before :8080)
// export const baseURL = "http://3.92.146.31:8080"; 

// export const httpClient = axios.create({
//   baseURL: `${baseURL}/api`,
// });

import axios from "axios";

export const baseURL = "http://localhost:8083"; 

export const httpClient = axios.create({
  baseURL: `${baseURL}/api`,
});