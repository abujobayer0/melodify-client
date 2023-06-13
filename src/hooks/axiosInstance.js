import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://melodify-server.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
