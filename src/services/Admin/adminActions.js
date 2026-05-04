import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const getAdminDashboard = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

const getAdminOrders = async ([url, params]) => {
  const res = await fetcher.get(url, { params });
  return res.data.Data;
};

const getAdminUsers = async ([url, params]) => {
  const res = await fetcher.get(url, { params });
  return res.data.Data;
};

const getAdminSellers = async ([url, params]) => {
  const res = await fetcher.get(url, { params });
  return res.data.Data;
};

const getAdminWithdrawals = async ([url, params]) => {
  const res = await fetcher.get(url, { params });
  return res.data.Data;
};

const verifySeller = async (url, { arg }) => {
  const res = await fetcher.patch(`/v1/admin/sellers/${arg.id}/verify`, { verified: arg.verified });
  return res.data;
};

const processWithdrawal = async (url, { arg }) => {
  const { id, ...data } = arg;
  const res = await fetcher.patch(`/v1/admin/withdrawals/${id}`, data);
  return res.data;
};

const refundOrder = async (url, { arg }) => {
  const res = await fetcher.patch(`/v1/admin/orders/${arg.id}/refund`);
  return res.data;
};

const getSellerBalance = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

export const useAdminDashboard = () =>
  useSWR("/v1/admin/dashboard", getAdminDashboard, { revalidateOnFocus: false });

export const useAdminOrders = ({ page = 1, limit = 10, search = "", status = "" } = {}) => {
  const params = { page, limit, ...(search && { search }), ...(status && { status }) };
  return useSWR(["/v1/admin/orders", params], getAdminOrders, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });
};

export const useAdminUsers = ({ page = 1, limit = 10, search = "" } = {}) => {
  const params = { page, limit, ...(search && { search }) };
  return useSWR(["/v1/admin/users", params], getAdminUsers, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });
};

export const useAdminSellers = ({ page = 1, limit = 10, search = "" } = {}) => {
  const params = { page, limit, ...(search && { search }) };
  return useSWR(["/v1/admin/sellers", params], getAdminSellers, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });
};

export const useAdminWithdrawals = ({ page = 1, limit = 10, status = "" } = {}) => {
  const params = { page, limit, ...(status && { status }) };
  return useSWR(["/v1/admin/withdrawals", params], getAdminWithdrawals, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });
};

export const useVerifySeller = () =>
  useSWRMutation("/v1/admin/sellers/verify", verifySeller);

export const useProcessWithdrawal = () =>
  useSWRMutation("/v1/admin/withdrawals/process", processWithdrawal);

export const useRefundOrder = () =>
  useSWRMutation("/v1/admin/orders/refund", refundOrder);

export const useAdminSellerBalance = (sellerId) =>
  useSWR(
    sellerId ? `/v1/admin/seller-balance/${sellerId}` : null,
    getSellerBalance,
    { revalidateOnFocus: false },
  );
