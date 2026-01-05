import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const USE_MOCK = false;

const mockAPIResult = {
  data: {
    Message: {
      message: "Product berhasil diperbarui",
      statusCode: 201,
    },
    Data: {
      cart_id: "3ea9506a-b6cb-4df2-8a73-793cabf3330e",
    },
  },
};

export const createCart = async (url, { arg }) => {
  if (USE_MOCK) {
    await new Promise((res) => setTimeout(res, 500));
    return mockAPIResult;
  }
  const result = await fetcher.post(url, arg);

  return result.data;
};

export const useCreateCart = () => useSWRMutation("/carts", createCart);
