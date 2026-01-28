import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

export const createProduct = async (url, { arg }) => {
  const formData = new FormData();

  formData.append("category_id", arg.category_id);
  formData.append("name", arg.name);
  formData.append("description", arg.description);
  formData.append("price", arg.price); 


  // IMAGES (image_url sampai image_url_5)
  if (arg.images?.[0]) formData.append("image", arg.images[0]);
  if (arg.images?.[1]) formData.append("image2", arg.images[1]);
  if (arg.images?.[2]) formData.append("image3", arg.images[2]);
  if (arg.images?.[3]) formData.append("image4", arg.images[3]);
  if (arg.images?.[4]) formData.append("image5", arg.images[4]);

  // VARIANTS
  arg.variants.forEach((v, i) => {
    formData.append(`variants[${i}][name]`, v.name);
    formData.append(`variants[${i}][price]`, v.price); // additional_price
    formData.append(`variants[${i}][stock]`, v.stock);
  });

  const result = await fetcher.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result.data;
};

export const useCreateProduct = () =>
  useSWRMutation("/products", createProduct);
