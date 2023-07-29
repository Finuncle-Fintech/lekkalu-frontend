import { useMutation } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import services from '../services';

export const useChangeExpenseRequest = () => {
  const changeExpenseMutate = useMutation(services.changeExpenseRequest, {
    onSuccess: async (res: AxiosResponse<any>) => {
      console.log('resource successfully changed', res);
    },
    onError: (error: AxiosError<any>) => {
      console.log('error occurred trying to change expense', error);
    },
  });

  const handleChangeRequest = (expense: any) => {
    changeExpenseMutate.mutate(expense);
  };

  return {
    handleChangeRequest,
    loading: changeExpenseMutate.isLoading,
    error: changeExpenseMutate.error,
  };
};
