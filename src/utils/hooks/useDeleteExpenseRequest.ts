import { useMutation } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import services from '../services';

export const useDeleteExpenseRequest = () => {
  const deleteRequestMutate = useMutation(services.deleteExpenseRequest, {
    onSuccess: async (res: AxiosResponse<any>) => {
      console.log('resource successfully deleted', res);
    },
    onError: (error: AxiosError<any>) => {
      console.log('error occurred trying to delete response', error);
    },
  });

  const handleDelete = (id: string | number) => {
    deleteRequestMutate.mutate(id);
  };

  return {
    handleDelete,
    loading: deleteRequestMutate.isLoading,
    error: deleteRequestMutate.error,
  };
};
