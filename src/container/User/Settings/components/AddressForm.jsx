"use client";

import { useState } from "react";
import {
  useProvinces,
  useCities,
  useKecamatan,
  useKelurahan,
} from "@/services/User/Addresses/addressActions";
import { Button } from "@/components/ui/button";

const toSelectValue = (value) =>
  value === null || value === undefined ? "" : String(value);

const getOptionLabel = (option) =>
  option?.name ||
  option?.province ||
  option?.city ||
  option?.kecamatan ||
  option?.kelurahan ||
  option?.label ||
  "";

const mergeSelectedOption = (options = [], selectedOption) => {
  if (!selectedOption?.id) return options;

  const selectedId = toSelectValue(selectedOption.id);
  const exists = options.some(
    (option) => toSelectValue(option.id) === selectedId,
  );

  return exists ? options : [selectedOption, ...options];
};

const SelectField = ({
  label,
  value,
  onChange,
  options,
  disabled,
  isLoading,
  selectedOption,
}) => (
  <div>
    <label className="text-xs font-medium text-gray-600 block mb-1">
      {label}
    </label>
    <select
      value={toSelectValue(value)}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled || isLoading}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#03AC0E] disabled:bg-gray-50 disabled:text-gray-400"
    >
      <option value="">
        {isLoading
          ? "Memuat..."
          : disabled
            ? "Pilih sebelumnya dulu"
            : "-- Pilih --"}
      </option>
      {mergeSelectedOption(options, selectedOption).map((opt) => (
        <option key={opt.id} value={opt.id}>
          {getOptionLabel(opt)}
        </option>
      ))}
    </select>
  </div>
);

const AddressForm = ({ initial, onCancel, onSubmit, isSubmitting }) => {
  const [form, setForm] = useState({
    label: initial?.label || "",
    recipient_name: initial?.recipient_name || "",
    phone: initial?.phone || "",
    address: initial?.address || "",
    province_id: toSelectValue(initial?.province_id),
    city_id: toSelectValue(initial?.city_id),
    kecamatan_id: toSelectValue(initial?.kecamatan_id),
    kelurahan_id: toSelectValue(initial?.kelurahan_id),
    postal_code: initial?.postal_code || "",
    is_default: initial?.is_default || false,
  });

  const selectedProvince = initial?.province_id
    ? {
        id: initial.province_id,
        name: initial.province || initial.province_name,
      }
    : null;
  const selectedCity = initial?.city_id
    ? { id: initial.city_id, name: initial.city || initial.city_name }
    : null;
  const selectedKecamatan = initial?.kecamatan_id
    ? {
        id: initial.kecamatan_id,
        name: initial.kecamatan || initial.kecamatan_name,
      }
    : null;
  const selectedKelurahan = initial?.kelurahan_id
    ? {
        id: initial.kelurahan_id,
        name: initial.kelurahan || initial.kelurahan_name,
      }
    : null;

  const { data: provinces, isLoading: loadingProv } = useProvinces();
  const { data: cities, isLoading: loadingCity } = useCities(form.province_id);
  const { data: kecamatans, isLoading: loadingKec } = useKecamatan(
    form.city_id,
  );
  const { data: kelurahans, isLoading: loadingKel } = useKelurahan(
    form.kecamatan_id,
  );

  const handleChange = (k, v) =>
    setForm((prev) => {
      const next = { ...prev, [k]: v };
      if (k === "province_id") {
        next.city_id = "";
        next.kecamatan_id = "";
        next.kelurahan_id = "";
      } else if (k === "city_id") {
        next.kecamatan_id = "";
        next.kelurahan_id = "";
      } else if (k === "kecamatan_id") {
        next.kelurahan_id = "";
      }
      return next;
    });

  const handleSubmit = () => {
    if (
      !form.label ||
      !form.recipient_name ||
      !form.phone ||
      !form.address ||
      !form.province_id ||
      !form.city_id ||
      !form.kecamatan_id ||
      !form.kelurahan_id ||
      !form.postal_code
    ) {
      return onSubmit(null, "Lengkapi semua field alamat");
    }

    const payload = {
      ...form,
      province_id: Number(form.province_id),
      city_id: Number(form.city_id),
      kecamatan_id: Number(form.kecamatan_id),
      kelurahan_id: Number(form.kelurahan_id),
    };
    onSubmit(payload);
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-3">
      <h3 className="text-sm font-bold text-gray-900">
        {initial?.id ? "Edit Alamat" : "Tambah Alamat Baru"}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">
            Label (Rumah/Kantor)
          </label>
          <input
            value={form.label}
            onChange={(e) => handleChange("label", e.target.value)}
            placeholder="Rumah"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#03AC0E]"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">
            Nama Penerima
          </label>
          <input
            value={form.recipient_name}
            onChange={(e) => handleChange("recipient_name", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#03AC0E]"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">
            No. Telepon
          </label>
          <input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="08xxx"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#03AC0E]"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">
            Kode Pos
          </label>
          <input
            value={form.postal_code}
            onChange={(e) => handleChange("postal_code", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#03AC0E]"
          />
        </div>
        <SelectField
          label="Provinsi"
          value={form.province_id}
          onChange={(v) => handleChange("province_id", v)}
          options={provinces}
          selectedOption={selectedProvince}
          isLoading={loadingProv}
        />
        <SelectField
          label="Kota/Kabupaten"
          value={form.city_id}
          onChange={(v) => handleChange("city_id", v)}
          options={cities}
          selectedOption={selectedCity}
          disabled={!form.province_id}
          isLoading={loadingCity}
        />
        <SelectField
          label="Kecamatan"
          value={form.kecamatan_id}
          onChange={(v) => handleChange("kecamatan_id", v)}
          options={kecamatans}
          selectedOption={selectedKecamatan}
          disabled={!form.city_id}
          isLoading={loadingKec}
        />
        <SelectField
          label="Kelurahan"
          value={form.kelurahan_id}
          onChange={(v) => handleChange("kelurahan_id", v)}
          options={kelurahans}
          selectedOption={selectedKelurahan}
          disabled={!form.kecamatan_id}
          isLoading={loadingKel}
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600 block mb-1">
          Alamat Lengkap (Jalan, RT/RW, No.)
        </label>
        <textarea
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
          rows={2}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#03AC0E] resize-none"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.is_default}
          onChange={(e) => handleChange("is_default", e.target.checked)}
          className="rounded border-gray-300 text-[#03AC0E] focus:ring-[#03AC0E]"
        />
        <span className="text-xs text-gray-600">Jadikan alamat utama</span>
      </label>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="text-xs"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Batal
        </Button>
        <Button
          size="sm"
          className="bg-[#03AC0E] hover:bg-[#028a0b] text-white text-xs"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </div>
  );
};

export default AddressForm;
