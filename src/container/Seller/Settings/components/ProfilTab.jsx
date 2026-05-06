"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateSellerProfile } from "@/services/Seller/Dashboard/dashboardActions";
import { toast } from "@/lib/toast";
import { Camera, Store } from "lucide-react";
import Image from "next/image";

const ProfileTab = () => {
  const { trigger: updateProfile, isMutating } = useUpdateSellerProfile();
  const [form, setForm] = useState({
    store_name: "",
    description: "",
    city: "",
    province: "",
    address: "",
    phone: "",
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const fileRef = useRef(null);

  const handleChange = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleLogoChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setLogoFile(f);
      setLogoPreview(URL.createObjectURL(f));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v.trim()) formData.append(k, v);
    });
    if (logoFile) formData.append("logo", logoFile);

    try {
      await updateProfile(formData);
      toast.success("Profil toko berhasil diperbarui");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal menyimpan profil");
    }
  };

  const fields = [
    { key: "store_name", label: "Nama Toko", placeholder: "Nama tokomu" },
    { key: "city", label: "Kota", placeholder: "Jakarta" },
    { key: "province", label: "Provinsi", placeholder: "DKI Jakarta" },
    { key: "phone", label: "Nomor Telepon", placeholder: "+62xxx" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil Toko</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Logo Toko
          </label>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="logo"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Store size={28} className="text-gray-400" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-0 right-0 w-6 h-6 bg-[#03AC0E] rounded-full flex items-center justify-center shadow-md hover:bg-[#028a0b]"
              >
                <Camera size={11} className="text-white" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </div>
            <p className="text-xs text-gray-500">
              Upload logo toko kamu. Format JPG, PNG, max 2MB.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                {f.label}
              </label>
              <input
                value={form[f.key]}
                onChange={(e) => handleChange(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#03AC0E] focus:ring-2 focus:ring-[#03AC0E]/20"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Alamat Toko
          </label>
          <input
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Alamat lengkap toko"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#03AC0E] focus:ring-2 focus:ring-[#03AC0E]/20"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Deskripsi Toko
          </label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Ceritakan tentang tokomu..."
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#03AC0E] focus:ring-2 focus:ring-[#03AC0E]/20 resize-none"
          />
        </div>

        <Button
          className="bg-[#03AC0E] hover:bg-[#028a0b] text-white"
          onClick={handleSave}
          disabled={isMutating}
        >
          {isMutating ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;
