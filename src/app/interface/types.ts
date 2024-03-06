export type TResponseData<TData> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TData;
};
