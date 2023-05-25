import axios from "axios";
import { store } from "../store/store";

const axiosInstance = axios.create({
  baseURL: `http://localhost:5001/users`,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.auth.token;
  config.params = config.params || {};
  config.params["auth"] = token;
  return config;
});

export default axiosInstance;
