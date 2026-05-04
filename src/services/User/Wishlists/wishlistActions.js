import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

const addToWishlist = async (url) => {
  const res = await fetcher.post(url);
  return res.data;
};

const removeFromWishlist = async (url) => {
  const res = await fetcher.delete(url);
  return res.data;
};

const checkWishlist = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

export const useAddToWishlist = (productId) =>
  useSWRMutation(`/v1/wishlists/${productId}`, addToWishlist);

export const useRemoveFromWishlist = (productId) =>
  useSWRMutation(`/v1/wishlists/${productId}`, removeFromWishlist);

export const useCheckWishlist = (productId) =>
  useSWR(productId ? `/v1/wishlists/check/${productId}` : null, checkWishlist, {
    revalidateOnFocus: false,
  });
