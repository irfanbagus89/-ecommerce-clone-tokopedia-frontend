import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const updateProductFn = async (url, { arg }) => {
  // arg: { id, data }
  const { id, data } = arg;
  const formData = new FormData();

  if (data.category_id) formData.append("category_id", data.category_id);
  if (data.name) formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.price) formData.append("price", data.price);

  if (data.images) {
    if (data.images?.[0] && data.images[0] instanceof File) formData.append("image", data.images[0]);
    if (data.images?.[1] && data.images[1] instanceof File) formData.append("image2", data.images[1]);
    if (data.images?.[2] && data.images[2] instanceof File) formData.append("image3", data.images[2]);
    if (data.images?.[3] && data.images[3] instanceof File) formData.append("image4", data.images[3]);
    if (data.images?.[4] && data.images[4] instanceof File) formData.append("image5", data.images[4]);
  }

  if (Array.isArray(data.variants)) {
    data.variants.forEach((v, i) => {
      if (v.id) formData.append(`variants[${i}][id]`, v.id);
      formData.append(`variants[${i}][name]`, v.name);
      formData.append(`variants[${i}][price]`, v.price);
      formData.append(`variants[${i}][stock]`, v.stock);
    });
  }

  const res = await fetcher.put(`${url}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const useUpdateProduct = () => useSWRMutation("/v1/seller/products", updateProductFn);

export default useUpdateProduct;
