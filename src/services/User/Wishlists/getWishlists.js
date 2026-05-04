import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const getWishlists = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

export const useWishlists = () =>
  useSWR("/v1/wishlists", getWishlists, { revalidateOnFocus: false });
