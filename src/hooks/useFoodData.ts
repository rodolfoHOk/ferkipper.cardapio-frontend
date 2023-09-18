import { AxiosPromise } from 'axios';
import { api } from '../lib/api';
import { FoodData } from '../interfaces/FoodData';
import { useQuery } from '@tanstack/react-query';

const fetchData = async (): AxiosPromise<FoodData[]> => {
  const response = api.get('/foods');
  return response;
};

export function useFoodData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['food-data'],
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
