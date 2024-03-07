import axios, { AxiosRequestConfig } from 'axios';

interface InternalAxiosRequestConfig extends AxiosRequestConfig {
  headers: any;
}

const api = axios.create({
  baseURL: "https://trobansvejfahukvcefd.supabase.co/",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json"
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
