import { useMutation } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import swal from 'sweetalert';

import authService from '../authService';
import storageUtils from '../storageUtils';

export const useLogin = () => {
  const loginMutate = useMutation(authService.loginUser, {
    onSuccess: async (res: AxiosResponse<any>) => {
      storageUtils.setAuthToken(res?.data?.access);
      swal({
        title: 'success alert',
        text: 'logged in successfully',
        icon: 'success',
      });
      window.location.href = '/';
    },
    onError: (error: AxiosError<any>) => {
      swal({
        title: 'error alert',
        text: 'An error ocurred , confirm sign in credentials',
        icon: 'error',
      });
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
