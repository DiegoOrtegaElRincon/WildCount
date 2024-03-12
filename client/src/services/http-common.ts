import axios, { AxiosRequestConfig } from 'axios';
const APIKEY = import.meta.env.VITE_API_KEY;

interface InternalAxiosRequestConfig extends AxiosRequestConfig {
  headers: any;
}

const api = axios.create({
  baseURL: "https://trobansvejfahukvcefd.supabase.co/",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    apikey: APIKEY,
  }
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {};
    
    if (config.data && !(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
