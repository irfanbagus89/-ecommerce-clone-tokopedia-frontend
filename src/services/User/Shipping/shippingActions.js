import useSWR from "swr";
import { basicAuthFetcher, fetcher } from "@/lib/fetcher/fetcherApi";

const getCouriers = async (url) => {
  const res = await basicAuthFetcher.get(url);
  return res.data?.Data || [];
};

export const useShippingCouriers = () =>
  useSWR("/v1/shipping/couriers", getCouriers, { revalidateOnFocus: false });

const getShippingCost = async ([, originCityId, destinationCityId, weight, courier]) => {
  const res = await fetcher.post("/v1/shipping/cost", {
    origin_city_id: originCityId,
    destination_city_id: destinationCityId,
    weight,
    courier,
  });
  return res.data?.Data || [];
};

export const useShippingCost = ({ originCityId, destinationCityId, weight = 1000, courier }) => {
  const key =
    originCityId && destinationCityId && courier
      ? ["shipping-cost", originCityId, destinationCityId, weight, courier]
      : null;
  return useSWR(key, getShippingCost, { revalidateOnFocus: false });
};
