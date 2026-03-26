import { basicAuthFetcher } from "@/lib/fetcher/fetcherApi";

export const getDetailProduct = async (productId) => {
  const res = await basicAuthFetcher.get(`/v1/products/${productId}`);
  return res.data.Data;
};
