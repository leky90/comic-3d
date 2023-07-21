export type BaseResponse<T> = T;

export type ListResponse<T> = T[];

export type PaginationResponse<T> = {
  comics: T[];
  current_page: number;
  total_pages: number;
};
