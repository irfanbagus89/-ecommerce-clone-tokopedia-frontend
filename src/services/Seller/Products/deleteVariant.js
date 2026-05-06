import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const deleteVariantFn = async (url, { arg }) => {
  const { id } = arg || {};
  const res = await fetcher.delete(`${url}/${id}`);
  return res.data;
};

export const useDeleteVariant = () => useSWRMutation("/v1/seller/products-variants", deleteVariantFn);

export default useDeleteVariant;
