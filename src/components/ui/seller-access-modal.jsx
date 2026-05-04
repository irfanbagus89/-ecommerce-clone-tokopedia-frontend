import * as React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { Button } from "./button";
import Image from "next/image";
import { useRegisterSeller } from "@/services/Seller/Auth/registerSeller";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { useAuthContext } from "@/contexts/AuthProvider";
import { Store, ArrowLeft } from "lucide-react";

export function SellerAccessModal({ isOpen, onClose }) {
  const router = useRouter();
  const { refetch } = useAuthContext();
  const [step, setStep] = useState("intro");
  const [form, setForm] = useState({
    store_name: "",
    store_description: "",
  });
  const { trigger, isMutating } = useRegisterSeller();

  const handleClose = () => {
    setStep("intro");
    setForm({ store_name: "", store_description: "" });
    onClose(false);
  };

  const handleSubmit = async () => {
    if (!form.store_name.trim()) {
      toast.error("Nama toko wajib diisi");
      return;
    }
    try {
      await trigger(form);
      toast.success("Selamat! Toko berhasil dibuat");
      await refetch?.();
      mutate("/v1/auth/me");
      handleClose();
      router.push("/dashboard");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Gagal membuat toko, coba lagi",
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[420px] p-6 rounded-2xl flex flex-col items-center text-center gap-0 border-0">
        {step === "intro" && (
          <>
            <DialogTitle className="sr-only">
              Belum Terdaftar sebagai Seller
            </DialogTitle>
            <div className="relative w-[180px] h-[180px] mb-4">
              <Image
                src="https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/img/user/register_icon_new.png~tplv-zr7vqa5nfb-image.image"
                alt="Seller Mascot"
                fill
                className="object-contain"
                sizes="(max-width: 180px) 100vw, 180px"
              />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
              Wah, Kamu Belum Terdaftar sebagai Seller
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Ayo buka toko gratis di Tokopedia dan mulai berjualan hari ini.
              Nikmati berbagai kemudahan dan fitur menarik!
            </p>

            <div className="flex flex-col gap-3 w-full">
              <Button
                onClick={() => setStep("form")}
                className="w-full bg-[#03AC0E] hover:bg-[#028a0b] text-white rounded-xl h-11 font-semibold text-sm"
              >
                Buka Toko Gratis
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full border-[#03AC0E] text-[#03AC0E] hover:bg-green-50 rounded-xl h-11 font-semibold text-sm"
              >
                Nanti Saja
              </Button>
            </div>
          </>
        )}

        {step === "form" && (
          <>
            <DialogTitle className="sr-only">Daftar Toko Baru</DialogTitle>
            <div className="w-full text-left">
              <button
                onClick={() => setStep("intro")}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3"
              >
                <ArrowLeft size={14} />
                Kembali
              </button>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <Store size={22} className="text-[#03AC0E]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Buka Toko Gratis
                  </h2>
                  <p className="text-xs text-gray-500">
                    Lengkapi info dasar tokomu
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Nama Toko<span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.store_name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, store_name: e.target.value }))
                    }
                    placeholder="Toko Demo"
                    maxLength={50}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#03AC0E] focus:ring-2 focus:ring-[#03AC0E]/20"
                  />
                  <p className="text-[10px] text-gray-400 text-right mt-0.5">
                    {form.store_name.length}/50
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Deskripsi Toko
                  </label>
                  <textarea
                    value={form.store_description}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        store_description: e.target.value,
                      }))
                    }
                    placeholder="Ceritakan tentang tokomu..."
                    rows={3}
                    maxLength={200}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#03AC0E] focus:ring-2 focus:ring-[#03AC0E]/20 resize-none"
                  />
                  <p className="text-[10px] text-gray-400 text-right mt-0.5">
                    {form.store_description.length}/200
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isMutating}
                className="w-full bg-[#03AC0E] hover:bg-[#028a0b] text-white rounded-xl h-11 font-semibold text-sm mt-5"
              >
                {isMutating ? "Mendaftarkan..." : "Daftar Sekarang"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
