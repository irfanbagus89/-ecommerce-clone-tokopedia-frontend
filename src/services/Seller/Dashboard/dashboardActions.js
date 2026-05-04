import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const getSellerDashboard = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

const getSellerBalance = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

const getWithdrawals = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

const requestWithdrawal = async (url, { arg }) => {
  const res = await fetcher.post(url, arg);
  return res.data;
};

const updateSellerProfile = async (url, { arg }) => {
  let res;
  if (arg instanceof FormData) {
    res = await fetcher.patch(url, arg, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    res = await fetcher.patch(url, arg);
  }
  return res.data;
};

const updateProductStock = async (url, { arg }) => {
  const { id, ...data } = arg;
  const res = await fetcher.patch(`/v1/seller/products/${id}/stock`, data);
  return res.data;
};

export const useSellerDashboard = () =>
  useSWR("/v1/seller/dashboard", getSellerDashboard, {
    revalidateOnFocus: false,
    refreshInterval: 60000,
  });

export const useSellerBalance = () =>
  useSWR("/v1/seller/dashboard/balance", getSellerBalance, {
    revalidateOnFocus: true,
  });

export const useSellerWithdrawals = () =>
  useSWR("/v1/seller/dashboard/withdrawals", getWithdrawals, {
    revalidateOnFocus: false,
  });

export const useRequestWithdrawal = () =>
  useSWRMutation("/v1/seller/dashboard/withdrawals", requestWithdrawal);

export const useUpdateSellerProfile = () =>
  useSWRMutation("/v1/seller/profile", updateSellerProfile);

export const useUpdateProductStock = () =>
  useSWRMutation("/v1/seller/products/stock", updateProductStock);
