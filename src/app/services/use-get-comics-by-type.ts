import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { BASE_API_HOSTNAME } from '../constants/api.constant';
import { PaginationResponse } from '../types/response.type';
import { Comic } from '../types/comic.model';
import { axiosInstance } from '../instances/react-query-client';

export type ComicsResponse = PaginationResponse<Comic>;

export function useGetComicsByTypeQuery(
  {
    comicType,
    page = 1,
  }: {
    comicType: 'trending-comics' | 'completed-comic' | 'recent-update-comics';
    page?: number;
  },
  options: Partial<UseQueryOptions<AxiosResponse<ComicsResponse>>>
) {
  const getComicsByTypeQuery = useQuery<AxiosResponse<ComicsResponse>>({
    ...options,
    queryKey: [comicType, page],
    queryFn: () => {
      return axiosInstance.get(
        `${BASE_API_HOSTNAME}/${comicType}?page=${page}`
      );
    },
  });

  return getComicsByTypeQuery;
}
