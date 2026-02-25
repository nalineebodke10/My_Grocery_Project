import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8083",
  withCredentials: true 
});

export default instance;