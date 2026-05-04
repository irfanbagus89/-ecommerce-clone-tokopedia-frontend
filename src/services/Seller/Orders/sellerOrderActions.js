import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const getSellerOrders = async ([url, params]) => {
  const res = await fetcher.get(url, { params });
  return res.data.Data;
};

const acceptOrder = async (url, { arg }) => {
  const res = await fetcher.post(`/v1/orders/seller/${arg.id}/accept`);
  return res.data;
};

const shipOrder = async (url, { arg }) => {
  const { id, ...data } = arg;
  const res = await fetcher.post(`/v1/orders/seller/${id}/ship`, data);
  return res.data;
};

const getOrderHistory = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

export const useSellerOrders = ({ page = 1, limit = 10, status = "" } = {}) => {
  const params = { page, limit, ...(status && { status }) };
  return useSWR(["/v1/orders/seller", params], getSellerOrders, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });
};

export const useAcceptOrder = () =>
  useSWRMutation("/v1/orders/accept", acceptOrder);

export const useShipOrder = () =>
  useSWRMutation("/v1/orders/ship", shipOrder);

export const useOrderHistory = (orderId) =>
  useSWR(
    orderId ? `/v1/orders/${orderId}/history` : null,
    getOrderHistory,
    { revalidateOnFocus: false }
  );
