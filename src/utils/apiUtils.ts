import axios from "axios";

const axiosConfig: any = {
  auth: {
    username: process.env.REACT_APP_USER,
    password: process.env.REACT_APP_PASSWORD,
  },
};

const apiUtils = {
  getRequest: async (url: string) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}${url}`,
      axiosConfig
    );
    return res;
  },
  postRequest: async (url: string, payload: any) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}${url}`,
      payload,
      axiosConfig
    );
    return res;
  },
};

export default apiUtils;
