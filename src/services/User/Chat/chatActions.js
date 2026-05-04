import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const getConversations = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

const getMessages = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

const startConversation = async (url, { arg }) => {
  const res = await fetcher.post(url, arg);
  return res.data.Data;
};

const sendMessage = async (url, { arg }) => {
  const { conversationId, ...data } = arg;
  const res = await fetcher.post(`/v1/chat/conversations/${conversationId}/messages`, data);
  return res.data.Data;
};

const getUnreadChatCount = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

const deleteConversation = async (url, { arg }) => {
  const res = await fetcher.delete(`/v1/chat/conversations/${arg.id}`);
  return res.data;
};

export const useConversations = () =>
  useSWR("/v1/chat/conversations", getConversations, {
    revalidateOnFocus: true,
    refreshInterval: 10000,
  });

export const useMessages = (conversationId) =>
  useSWR(
    conversationId ? `/v1/chat/conversations/${conversationId}/messages` : null,
    getMessages,
    { revalidateOnFocus: true, refreshInterval: 5000 }
  );

export const useUnreadChatCount = () =>
  useSWR("/v1/chat/unread-count", getUnreadChatCount, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
  });

export const useStartConversation = () =>
  useSWRMutation("/v1/chat/conversations", startConversation);

export const useSendMessage = () =>
  useSWRMutation("/v1/chat/messages/send", sendMessage);

export const useDeleteConversation = () =>
  useSWRMutation("/v1/chat/conversations/delete", deleteConversation);
