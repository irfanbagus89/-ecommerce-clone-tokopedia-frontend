import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const USE_MOCK = false;

const mockAPIResult = {
  data: {
    Message: {
      message: "Login Berhasil",
      statusCode: 200,
    },
    Data: {
      email: "irfanbagus@gmail.com",
      name: "Irfan Bagus",
      role: "user",
    },
  },
};

export const loginUser = async (url, { arg }) => {
  if (USE_MOCK) {
    await new Promise((res) => setTimeout(res, 500));
    return mockAPIResult;
  }
  const result = await fetcher.post(url, arg);

  return result.data;
};

export const useLoginUser = () =>
  useSWRMutation("/auth/login", loginUser);
