import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const TERMINAL = ["paid", "expired", "cancelled", "failed"];

const fetchOrder = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

/**
 * Poll status pembayaran order setiap 3 detik.
 * Polling berhenti otomatis saat status sudah final (paid/expired/cancelled/failed).
 */
export const usePaymentStatus = (orderId) => {
  return useSWR(
    orderId ? `/v1/orders/my-orders/${orderId}` : null,
    fetchOrder,
    {
      refreshInterval: (data) => {
        if (!data) return 3000;
        return TERMINAL.includes(data?.payment_status) ? 0 : 3000;
      },
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    }
  );
};
