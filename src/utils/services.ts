import { api } from "./api";
import apiUtils from "./apiUtils";

const services = {
  getTag: async () => {
    return await apiUtils.getRequest(`${api.TAG}`);
  },
  createTag: async (payload: any) => {
    return await apiUtils.postRequest(`${api.TAG}`, payload);
  },
};

export default services;
