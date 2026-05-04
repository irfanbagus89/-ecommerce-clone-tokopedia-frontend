import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const getNotifications = async ([url, params]) => {
  const res = await fetcher.get(url, { params });
  return res.data.Data;
};

const getUnreadCount = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

const markAsRead = async (url, { arg }) => {
  const res = await fetcher.patch(`/v1/notifications/${arg.id}/read`);
  return res.data;
};

const markAllAsRead = async (url) => {
  const res = await fetcher.patch(url);
  return res.data;
};

const deleteNotification = async (url, { arg }) => {
  const res = await fetcher.delete(`/v1/notifications/${arg.id}`);
  return res.data;
};

export const useNotifications = ({ unread_only = false } = {}) => {
  const params = { ...(unread_only && { unread_only: true }) };
  return useSWR(["/v1/notifications", params], getNotifications, {
    revalidateOnFocus: false,
    refreshInterval: 30000,
  });
};

export const useUnreadCount = () =>
  useSWR("/v1/notifications/count", getUnreadCount, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
  });

export const useMarkAsRead = () =>
  useSWRMutation("/v1/notifications/read", markAsRead);

export const useMarkAllAsRead = () =>
  useSWRMutation("/v1/notifications/read-all", markAllAsRead);

export const useDeleteNotification = () =>
  useSWRMutation("/v1/notifications/delete", deleteNotification);
