import axios from "axios";
import { backEndURL } from "../../config.ts";

const axiosInstance = axios.create({
  baseURL: backEndURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
