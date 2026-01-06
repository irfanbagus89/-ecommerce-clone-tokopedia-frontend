import { fetcher } from "@/lib/fetcher/fetcherApi";

export const getDetailProduct = async (productId) => {
  const res = await fetcher.get(`/products/${productId}`);
  return res.data.Data;
};
