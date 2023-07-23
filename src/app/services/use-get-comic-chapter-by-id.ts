import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { BASE_API_HOSTNAME } from '../constants/api.constant';
import { BaseResponse } from '../types/response.type';
import { DetailComicChapter } from '../types/comic.model';
import { axiosInstance } from '../instances/react-query-client';

export type DetailComicChapterResponse = BaseResponse<DetailComicChapter>;

export function useGetComicChapterByIdQuery(
  {
    comicId,
    chapterId,
  }: {
    comicId: string;
    chapterId: number;
  },
  options: Partial<UseQueryOptions<AxiosResponse<DetailComicChapterResponse>>>
) {
  const getComicChapterByIdQuery = useQuery<
    AxiosResponse<DetailComicChapterResponse>
  >({
    ...options,
    queryKey: ['comic-chapter', comicId, chapterId],
    queryFn: () => {
      return axiosInstance.get(
        `${BASE_API_HOSTNAME}/comics/${comicId}/chapters/${chapterId}`
      );
    },
  });

  return getComicChapterByIdQuery;
}
