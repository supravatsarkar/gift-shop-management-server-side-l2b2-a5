export type TResponseData<TData> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TData;
};

export type TErrorDetails = {
  message: string;
  path: string;
};
