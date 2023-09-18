import { AxiosPromise } from 'axios';
import { api } from '../lib/api';
import { FoodData } from '../interfaces/FoodData';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postData = async (data: FoodData): AxiosPromise<any> => {
  const response = api.post('/foods', data);
  return response;
};

export function useFoodDataMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries(['food-data']);
    },
  });

  return mutate;
}
