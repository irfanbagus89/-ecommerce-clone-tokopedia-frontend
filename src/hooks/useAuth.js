import { useLogoutUser } from "@/services/User/Auth/logout";
import { useMe } from "@/services/User/Auth/me"

import { mutate } from "swr"

export function useAuth() {
  const { data, error, isLoading } = useMe()
  const { trigger: logoutUser, isMutating } = useLogoutUser();

  const logout = async () => {
    await logoutUser()
    
    mutate("/auth/me", null, false)
  }

  return {
    user: data?.Data ?? null,
    isLoggedIn: !!data?.Data,
    loading: isLoading,
    error,
    refetch: () => mutate("/auth/me"),
    logout:logout
  }
}
