import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const validateVoucher = async (url, { arg }) => {
  const { code, total } = arg;
  const res = await fetcher.get(`${url}?code=${code}&total=${total}`);
  return res.data; // Ensure backend returns the correct payload format
};

export const useValidateVoucher = () => {
  return useSWRMutation("/v1/vouchers/validate", validateVoucher);
};
