import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { Button } from "./button";
import Image from "next/image";

export function SellerAccessModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[360px] p-6 rounded-2xl flex flex-col items-center text-center gap-0 border-0">
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
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-11 font-semibold text-sm">
            Buka Toko Gratis
          </Button>
          <Button
            variant="outline"
            className="w-full border-green-600 text-green-600 hover:bg-green-50 rounded-xl h-11 font-semibold text-sm"
          >
            Pelajari Selengkapnya
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
