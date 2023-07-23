import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { BASE_API_HOSTNAME } from '../constants/api.constant';
import { BaseResponse } from '../types/response.type';
import { DetailComic } from '../types/comic.model';
import { axiosInstance } from '../instances/react-query-client';

export type ComicResponse = BaseResponse<DetailComic>;

export function useGetComicByIdQuery(
  {
    comicId,
  }: {
    comicId: string;
  },
  options: Partial<UseQueryOptions<AxiosResponse<ComicResponse>>>
) {
  const getComicByIdQuery = useQuery<AxiosResponse<ComicResponse>>({
    ...options,
    queryKey: ['comic', comicId],
    queryFn: () => {
      return axiosInstance.get(`${BASE_API_HOSTNAME}/comics/${comicId}`);
    },
  });

  return getComicByIdQuery;
}
