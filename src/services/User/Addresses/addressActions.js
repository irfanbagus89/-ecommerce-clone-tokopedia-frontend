import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const getAddresses = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

const getDefaultAddress = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

const getRegions = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

const createAddress = async (url, { arg }) => {
  const res = await fetcher.post(url, arg);
  return res.data;
};

const updateAddress = async (url, { arg }) => {
  const { id, ...data } = arg;
  const res = await fetcher.patch(`/v1/addresses/${id}`, data);
  return res.data;
};

const deleteAddress = async (url, { arg }) => {
  const res = await fetcher.delete(`/v1/addresses/${arg.id}`);
  return res.data;
};

const setDefaultAddress = async (url, { arg }) => {
  const res = await fetcher.patch(`/v1/addresses/${arg.id}/set-default`);
  return res.data;
};

export const useAddresses = () =>
  useSWR("/v1/addresses", getAddresses, { revalidateOnFocus: false });

export const useDefaultAddress = () =>
  useSWR("/v1/addresses/default", getDefaultAddress, {
    revalidateOnFocus: false,
  });

export const useProvinces = () =>
  useSWR("/v1/addresses/province", getRegions, { revalidateOnFocus: false });

export const useCities = (provinceId) =>
  useSWR(
    provinceId ? `/v1/addresses/city/${provinceId}` : null,
    getRegions,
    { revalidateOnFocus: false },
  );

export const useKecamatan = (cityId) =>
  useSWR(
    cityId ? `/v1/addresses/kecamatan/${cityId}` : null,
    getRegions,
    { revalidateOnFocus: false },
  );

export const useKelurahan = (kecamatanId) =>
  useSWR(
    kecamatanId ? `/v1/addresses/kelurahan/${kecamatanId}` : null,
    getRegions,
    { revalidateOnFocus: false },
  );

export const useCreateAddress = () =>
  useSWRMutation("/v1/addresses", createAddress);

export const useUpdateAddress = () =>
  useSWRMutation("/v1/addresses/update", updateAddress);

export const useDeleteAddress = () =>
  useSWRMutation("/v1/addresses/delete", deleteAddress);

export const useSetDefaultAddress = () =>
  useSWRMutation("/v1/addresses/set-default", setDefaultAddress);
