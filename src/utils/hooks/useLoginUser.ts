import { useMutation } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import authService from '../authService';

export const useLogin = () => {
  const loginMutate = useMutation(authService.loginUser, {
    onSuccess: async (res: AxiosResponse<any>) => {
      console.log('login mutate response', res);
      localStorage.setItem('TOKEN', res?.data?.access);
    },
    onError: (error: AxiosError<any>) => {
      console.log('login errror response', error);
    },
  });

  const handleSubmit = (payload: { username: string; password: string }) => {
    loginMutate.mutate(payload);
  };

  return {
    handleSubmit,
    loading: loginMutate.isLoading,
  };
};
