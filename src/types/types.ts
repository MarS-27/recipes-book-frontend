export type TMessage = {
  message: string;
};

export type TToken = {
  token: string;
};

export type TError = {
  error: string;
  message: string;
  statusCode: number;
};

export type TPaginatedResult<TData> = {
  pagesCount?: number;
  error?: string;
  pageNum: number;
  results: TData[];
};

export type TPaginatedResponse<TData> = {
  total: number;
  limit: number;
  skip: number;
  results: TData[];
};
