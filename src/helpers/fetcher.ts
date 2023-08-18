import axios, { AxiosResponse } from "axios";
import { API_DOMAIN } from "../constants/environment";

const instance = axios.create({
  baseURL: API_DOMAIN,
});

export const fetcher = <T>(config: {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: object;
}): Promise<T> => {
  return instance(config).then((res: AxiosResponse<T>) => res.data);
};
