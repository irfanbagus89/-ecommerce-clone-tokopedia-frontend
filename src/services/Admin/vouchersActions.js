import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const getAdminVouchers = async ([url, params]) => {
  const res = await fetcher.get(url, { params });
  return res.data.Data;
};

const createVoucher = async (url, { arg }) => {
  const res = await fetcher.post(url, arg);
  return res.data;
};

const toggleVoucher = async (url, { arg }) => {
  const { id, ...data } = arg;
  const res = await fetcher.patch(`/v1/vouchers/${id}`, data);
  return res.data;
};

export const useAdminVouchers = ({ page = 1, limit = 10, active } = {}) => {
  const params = { page, limit, ...(active !== undefined && { active }) };
  return useSWR(["/v1/vouchers", params], getAdminVouchers, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });
};

export const useCreateVoucher = () =>
  useSWRMutation("/v1/vouchers", createVoucher);

export const useToggleVoucher = () =>
  useSWRMutation("/v1/vouchers/toggle", toggleVoucher);
