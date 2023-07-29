/* eslint-disable react-hooks/rules-of-hooks */
// import useRefreshToken from '../hooks/useRefresh';
import storageUtils from './storageUtils';

import axios from 'axios';

const axiosConfig: any = {
  headers: {
    'Content-Type': 'application/json',
  },
};

axios.interceptors.request.use(
  (config) => {
    const token = storageUtils.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  },
);

const apiUtils = {
  getRequest: async (url: string) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}${url}`,
        axiosConfig,
      );
      return res;
    } catch (error) {
      throw error;
    }
  },
  postRequest: async (url: string, payload: any) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}${url}`,
        payload,
        axiosConfig,
      );
      return res;
    } catch (error) {
      throw error;
    }
  },
  putRequest: async (url: string, payload: any) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}${url}`,
        payload,
        axiosConfig,
      );
      return res;
    } catch (error) {
      throw error;
    }
  },
  deleteRequest: async (url: string) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}${url}`,
        axiosConfig,
      );
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default apiUtils;
