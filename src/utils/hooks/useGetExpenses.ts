import { AxiosResponse, AxiosError } from 'axios';
import { useQuery } from 'react-query';
import services from '../services';

export const useGetExpenses = (paramString?: string) => {
  const { data, isLoading, isError, error } = useQuery<
    AxiosResponse<any>,
    AxiosError<any>
  >(['fetch expenses', paramString], () =>
    services.getExpenses(paramString || ''),
  );

  return {
    expenses: data,
    loading: isLoading,
    error: isError,
    errorMessage: error,
  };
};
