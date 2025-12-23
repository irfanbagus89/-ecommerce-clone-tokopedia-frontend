import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const USE_MOCK = false;

const mockAPIResult = {
  Message: {
    message: "Logout berhasil",
    statusCode: 200,
  },
  Data: null,
};

const logoutFetcher = async (url) => {
  if (USE_MOCK) {
    await new Promise((res) => setTimeout(res, 500));
    return mockAPIResult;
  }

  const result = await fetcher.post(url);
  return result.data;
};

export const useLogoutUser = () =>
  useSWRMutation("/auth/logout", logoutFetcher);
