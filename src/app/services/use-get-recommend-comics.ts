import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { BASE_API_HOSTNAME } from '../constants/api.constant';
import { ListResponse } from '../types/response.type';
import { RecommendComic } from '../types/comic.model';
import { axiosInstance } from '../instances/react-query-client';

export type ComicsResponse = ListResponse<RecommendComic>;

export function useGetRecommendComicsQuery(
  options: Partial<UseQueryOptions<AxiosResponse<ComicsResponse>>>
) {
  const getRecommendComicsQuery = useQuery<AxiosResponse<ComicsResponse>>({
    ...options,
    queryKey: ['recommend-comics'],
    queryFn: () => {
      return axiosInstance.get(`${BASE_API_HOSTNAME}/recommend-comics`);
    },
  });

  return getRecommendComicsQuery;
}
