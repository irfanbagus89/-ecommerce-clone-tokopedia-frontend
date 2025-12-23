import { fetcher } from "@/lib/fetcher/fetcherApi"
import useSWR from "swr"

const getMe = async (url ) => {
  const res = await fetcher.get(url, {
    withCredentials: true
  })
  return res.data
}

export const useMe = () =>
  useSWR("/auth/me", getMe, {
    revalidateOnFocus: false,
    shouldRetryOnError: false
  })
