import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const getMyOrders = async ([url, params]) => {
  const res = await fetcher.get(url, { params });
  return res.data.Data;
};

export const useMyOrders = ({ page = 1, limit = 10, status = "" } = {}) => {
  const params = { page, limit, ...(status && { status }) };
  return useSWR(["/v1/orders/my-orders", params], getMyOrders, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });
};
