import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const updateProfile = async (url, { arg }) => {
  let res;
  if (arg instanceof FormData) {
    res = await fetcher.patch(url, arg, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    res = await fetcher.patch(url, arg);
  }
  return res.data;
};

const changePassword = async (url, { arg }) => {
  const res = await fetcher.patch(url, arg);
  return res.data;
};

export const useUpdateProfile = () =>
  useSWRMutation("/v1/auth/profile", updateProfile);

export const useChangePassword = () =>
  useSWRMutation("/v1/auth/change-password", changePassword);
