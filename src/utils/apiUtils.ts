/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';

import useRefreshToken from '../hooks/useRefresh';

const refresh = useRefreshToken();

const axiosConfig: any = {
  headers: {
    'Content-Type': 'application/json',
  },
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  // handle error incase accessToken is expired
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;

      const newAccessToken = await refresh(); //get new access token using the useRefresh hook

      localStorage.setItem('TOKEN', newAccessToken);

      prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

      return axios(prevRequest);
    }

    return Promise.reject(error);
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
};

export default apiUtils;
