import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const registerSeller = async (url, { arg }) => {
  const res = await fetcher.post(url, arg);
  return res.data;
};

export const useRegisterSeller = () =>
  useSWRMutation("/v1/seller", registerSeller);
