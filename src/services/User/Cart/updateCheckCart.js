import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const USE_MOCK = false;

const mockAPIResult = {
  data: {
    Metadata: {
      message: "Cart item berhasil diperbarui",
      code: 200,
    },
    Data: null,
  },
};

export const updateCheckCart = async (url, { arg }) => {
  if (USE_MOCK) {
    await new Promise((res) => setTimeout(res, 500));
    return mockAPIResult;
  }
  const { id } = arg;
  const result = await fetcher.patch(`${url}/${id}`);

  return result.data;
};

export const useUpdateCheckCart = () =>
  useSWRMutation("/v1/carts/update-is-checked", updateCheckCart);
