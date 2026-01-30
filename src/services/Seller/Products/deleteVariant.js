import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const deleteVariantFn = async (url, { arg }) => {
  // arg: { id }
  const { id } = arg || {};
  const res = await fetcher.delete(`/seller/products-variants/${id}`);
  return res.data;
};

export const useDeleteVariant = () => useSWRMutation("/seller/products-variants", deleteVariantFn);

export default useDeleteVariant;
