import { QueryClient } from '@tanstack/react-query';
import { BASE_API_HOSTNAME } from '../constants/api.constant';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export const axiosInstance = axios.create({
  baseURL: BASE_API_HOSTNAME,
  timeout: 5000,
  // headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError<unknown, AxiosRequestConfig>) {
    if (error.config) error.config.baseURL = 'http://localhost:8080';
    // Do something with request error
    return Promise.reject(error);
  }
);
