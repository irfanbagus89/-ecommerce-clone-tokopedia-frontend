import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const getSearchProduct = async ([url, params]) => {
  const res = await fetcher.get(url, { params });
  return res.data.Data;
};

export const useSearchProduct = (
  {
    limit = 10,
    search = "",
    storeTypes,
    locations,
    minPrice,
    maxPrice,
    smart = false,
  } = {},
  enabled = true
) => {
  const getKey = (pageIndex, previousPageData) => {
    if (!enabled) return null;

    if (previousPageData && previousPageData?.products?.length === 0) {
      return null;
    }

    const params = {
      page: pageIndex + 1,
      limit,
      search,
      smart,
      ...(storeTypes?.length && {
        storeTypes: `{${storeTypes.join(",")}}`,
      }),
      ...(locations?.length && {
        locations: `{${locations.join(",")}}`,
      }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
    };

    return ["/products", params];
  };

  return useSWRInfinite(getKey, getSearchProduct, {
    refreshInterval: 20000,
    revalidateFirstPage: false,
  });
};
