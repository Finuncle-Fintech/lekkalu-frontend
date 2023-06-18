import apiUtils from './apiUtils';
import { api } from './api';

const authService = {
  loginUser: async (payload: { username: string; password: string }) => {
    return await apiUtils.postRequest(api.TOKEN, payload);
  },
};

export default authService;
