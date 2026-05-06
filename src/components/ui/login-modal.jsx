"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function LoginModal({ isOpen, onClose }) {
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[360px] w-[90vw] rounded-[1.25rem] p-6 pb-8 flex flex-col items-center text-center gap-0 border-0 shadow-2xl">
        <div className="w-full flex justify-center mt-2 mb-4">
          <Image
            src="https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/img/user/register_icon_new.png~tplv-zr7vqa5nfb-image.image"
            alt="Mascot Tokopedia"
            width={160}
            height={160}
            className="object-contain"
            priority
          />
        </div>
        <DialogTitle className="text-[21px] md:text-[23px] font-[800] text-gray-900 leading-[1.3] mb-3 tracking-tight">
          Wah, kamu belum login
        </DialogTitle>
        <DialogDescription className="text-[14.5px] md:text-[15px] text-gray-600 mb-8 max-w-[280px] leading-relaxed">
          Yuk, login dulu untuk menikmati fitur ini dan dapatkan promo menarik
          lainnya!
        </DialogDescription>
        <div className="w-full flex flex-col gap-3">
          <Button
            className="w-full bg-[#00AA5B] hover:bg-[#009b53] text-white font-bold h-12 text-[15px] rounded-full shadow-none"
            onClick={() => {
              onClose();
              router.push("/login");
            }}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="w-full border-2 border-[#00AA5B] text-[#00AA5B] hover:bg-green-50 font-bold h-12 text-[15px] rounded-full bg-transparent shadow-none"
            onClick={() => {
              onClose();
              router.push("/register");
            }}
          >
            Daftar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
