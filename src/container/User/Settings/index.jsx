"use client";

import { useState, useRef } from "react";
import { useAuthContext } from "@/contexts/AuthProvider";
import {
  useUpdateProfile,
  useChangePassword,
} from "@/services/User/Auth/profileActions";
import {
  useAddresses,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
  useSetDefaultAddress,
} from "@/services/User/Addresses/addressActions";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/lib/toast";
import { mutate } from "swr";
import {
  User,
  Lock,
  MapPin,
  Camera,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
  Star,
} from "lucide-react";
import Image from "next/image";
import AddressForm from "./components/AddressForm";

const ProfileTab = () => {
  const { user, refetch } = useAuthContext();
  const { trigger: updateProfile, isMutating } = useUpdateProfile();
  const [name, setName] = useState(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const displayName = name ?? user?.name ?? "";
  const avatarPreview = preview || user?.avatar || null;

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", displayName);
    if (file) formData.append("avatar", file);

    try {
      await updateProfile(formData);
      toast.success("Profil berhasil diperbarui");
      setName(null);
      setPreview(null);
      setFile(null);
      refetch();
    } catch {
      toast.error("Gagal memperbarui profil");
    }
  };

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-200">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="avatar"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User size={32} className="text-gray-400" />
              </div>
            )}
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-0 right-0 w-7 h-7 bg-[#03AC0E] rounded-full flex items-center justify-center shadow-md hover:bg-[#028a0b] transition-colors"
          >
            <Camera size={13} className="text-white" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
          <p className="text-xs text-[#03AC0E] mt-0.5 capitalize">
            {user?.role}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Nama Lengkap
          </label>
          <input
            value={displayName}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#03AC0E] focus:ring-2 focus:ring-[#03AC0E]/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Email
          </label>
          <input
            value={user?.email || ""}
            disabled
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
          />
        </div>
        <Button
          className="bg-[#03AC0E] hover:bg-[#028a0b] text-white"
          onClick={handleSave}
          disabled={isMutating}
        >
          {isMutating ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </div>
  );
};

// ✅ Dipindahkan ke luar PasswordTab agar tidak dibuat ulang setiap render
const PasswordInput = ({
  label,
  value,
  onChange,
  showKey,
  showPass,
  setShowPass,
}) => (
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1.5">
      {label}
    </label>
    <div className="relative">
      <input
        type={showPass[showKey] ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm pr-10 focus:outline-none focus:border-[#03AC0E] focus:ring-2 focus:ring-[#03AC0E]/20"
      />
      <button
        type="button"
        onClick={() =>
          setShowPass((prev) => ({ ...prev, [showKey]: !prev[showKey] }))
        }
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {showPass[showKey] ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  </div>
);

const PasswordTab = () => {
  const { trigger: changePassword, isMutating } = useChangePassword();
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showPass, setShowPass] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleChange = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async () => {
    if (form.new_password !== form.confirm_password) {
      toast.error("Konfirmasi password tidak sesuai");
      return;
    }
    if (form.new_password.length < 8) {
      toast.error("Password minimal 8 karakter");
      return;
    }
    try {
      await changePassword({
        old_password: form.old_password,
        new_password: form.new_password,
      });
      toast.success("Password berhasil diubah");
      setForm({ old_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal mengubah password");
    }
  };

  return (
    <div className="space-y-4 max-w-md">
      <PasswordInput
        label="Password Lama"
        value={form.old_password}
        onChange={(v) => handleChange("old_password", v)}
        showKey="old"
        showPass={showPass}
        setShowPass={setShowPass}
      />
      <PasswordInput
        label="Password Baru"
        value={form.new_password}
        onChange={(v) => handleChange("new_password", v)}
        showKey="new"
        showPass={showPass}
        setShowPass={setShowPass}
      />
      <PasswordInput
        label="Konfirmasi Password Baru"
        value={form.confirm_password}
        onChange={(v) => handleChange("confirm_password", v)}
        showKey="confirm"
        showPass={showPass}
        setShowPass={setShowPass}
      />
      <Button
        className="bg-[#03AC0E] hover:bg-[#028a0b] text-white"
        onClick={handleSubmit}
        disabled={isMutating || !form.old_password || !form.new_password}
      >
        {isMutating ? "Menyimpan..." : "Ubah Password"}
      </Button>
    </div>
  );
};

const AddressesTab = () => {
  const { data: addresses, mutate: revalidate } = useAddresses();
  const { trigger: createAddress, isMutating: isCreating } = useCreateAddress();
  const { trigger: updateAddress, isMutating: isUpdating } = useUpdateAddress();
  const { trigger: deleteAddress } = useDeleteAddress();
  const { trigger: setDefault } = useSetDefaultAddress();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleEdit = (addr) => {
    setEditing(addr);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (payload, errMsg) => {
    if (errMsg) return toast.error(errMsg);
    try {
      if (editing?.id) {
        await updateAddress({ id: editing.id, ...payload });
        toast.success("Alamat berhasil diperbarui");
      } else {
        await createAddress(payload);
        toast.success("Alamat berhasil ditambahkan");
      }
      revalidate();
      closeForm();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal menyimpan alamat");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus alamat ini?")) return;
    try {
      await deleteAddress({ id });
      toast.success("Alamat dihapus");
      revalidate();
    } catch {
      toast.error("Gagal menghapus alamat");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefault({ id });
      toast.success("Alamat utama diperbarui");
      revalidate();
    } catch {
      toast.error("Gagal mengatur alamat utama");
    }
  };

  const list = addresses || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">{list.length} alamat tersimpan</p>
        <Button
          size="sm"
          className="bg-[#03AC0E] hover:bg-[#028a0b] text-white text-xs"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          <Plus size={13} className="mr-1" />
          Tambah Alamat
        </Button>
      </div>

      {showForm && (
        <AddressForm
          initial={editing}
          onCancel={closeForm}
          onSubmit={handleSubmit}
          isSubmitting={isCreating || isUpdating}
        />
      )}

      {list.length === 0 && !showForm ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <MapPin size={32} className="text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Belum ada alamat tersimpan</p>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((addr) => (
            <div
              key={addr.id}
              className={`p-4 rounded-2xl border transition-colors ${
                addr.is_default
                  ? "border-[#03AC0E] bg-green-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900">
                      {addr.label || "Alamat"}
                    </span>
                    {addr.is_default && (
                      <span className="text-[10px] font-bold bg-[#03AC0E] text-white px-2 py-0.5 rounded-full">
                        Utama
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">{addr.recipient_name}</p>
                  <p className="text-xs text-gray-500">
                    {addr.phone || addr.recipient_phone}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {addr.address}
                    {(addr.kelurahan || addr.kelurahan_name) &&
                      `, ${addr.kelurahan || addr.kelurahan_name}`}
                    {(addr.kecamatan || addr.kecamatan_name) &&
                      `, ${addr.kecamatan || addr.kecamatan_name}`}
                    {(addr.city || addr.city_name) &&
                      `, ${addr.city || addr.city_name}`}
                    {(addr.province || addr.province_name) &&
                      `, ${addr.province || addr.province_name}`}{" "}
                    {addr.postal_code}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  {!addr.is_default && (
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-[10px] text-[#03AC0E] hover:underline"
                    >
                      Jadikan Utama
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(addr)}
                    className="flex items-center gap-1 text-[10px] text-blue-600 hover:underline"
                  >
                    <Edit2 size={11} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="flex items-center gap-1 text-[10px] text-red-500 hover:underline"
                  >
                    <Trash2 size={11} />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProfileSettingsContainer = () => {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Akun</h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola informasi profil dan keamanan akunmu
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <Tabs defaultValue="profile">
          <TabsList className="bg-gray-100 rounded-xl p-1 mb-6">
            <TabsTrigger
              value="profile"
              className="text-xs rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <User size={13} className="mr-1.5" />
              Profil
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="text-xs rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Lock size={13} className="mr-1.5" />
              Password
            </TabsTrigger>
            <TabsTrigger
              value="addresses"
              className="text-xs rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <MapPin size={13} className="mr-1.5" />
              Alamat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
          <TabsContent value="password">
            <PasswordTab />
          </TabsContent>
          <TabsContent value="addresses">
            <AddressesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileSettingsContainer;
