import { fetcher } from "@/lib/fetcher/fetcherApi"
import useSWR from "swr"

const getMe = async (url ) => {
  const res = await fetcher.get(url)

  return res.data
}

export const useMe = () =>
  useSWR("/v1/auth/me", getMe, {
    revalidateOnFocus: false,
    shouldRetryOnError: false
  })
