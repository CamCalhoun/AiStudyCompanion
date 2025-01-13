import axios from 'axios';

// Create an instance of axios with base URL
const api = axios.create({
  baseURL: "http://localhost:8000"
})

// Export axios instance

export default api;
