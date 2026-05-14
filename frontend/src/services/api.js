import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URI}/tasks`,
});

export default API;
