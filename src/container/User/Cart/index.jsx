import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const CartPage = () => {
  const [checked, setChecked] = useState(true);
  const price = 2584000;

  return (
    <div className="container mx-auto py-2">
      <h1 className="text-xl font-bold mb-4">Keranjang</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="flex items-center gap-2 py-4">
              <Checkbox
                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                checked={checked}
                onCheckedChange={() => setChecked(!checked)}
              />
              <span className="text-sm font-medium">Pilih Semua (1)</span>
              <Button variant="ghost" className="ml-auto text-green-600">
                Hapus
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  checked={checked}
                />
                <span className="font-semibold">COC Komputer</span>
              </div>

              <Separator />

              <div className="flex items-center gap-4">
                <Checkbox
                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  checked={checked}
                />

                <Image
                  src="/cpu.png"
                  alt="Ryzen 5"
                  width={64}
                  height={64}
                  className="rounded"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">AMD Ryzen 5 8500G</p>
                  <p className="font-semibold mt-1">Rp2.584.000</p>
                </div>

                <div className="flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-muted-foreground" />

                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none text-gray-500 hover:text-green-600"
                      onClick
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="h-8 w-12 border-0 text-center focus-visible:ring-0 p-0 text-sm font-bold leading-8">
                      {1}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none text-green-600 hover:text-green-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader className="font-semibold">Ringkasan belanja</CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Total</span>
              <span className="font-semibold">
                {checked ? `Rp${price.toLocaleString("id-ID")}` : "-"}
              </span>
            </div>

            <Button variant="outline" className="w-full justify-between">
              {checked
                ? "Lagi belum ada promo, nih"
                : "Pilih barang dulu sebelum pakai promo"}
              <span>›</span>
            </Button>

            <Button className="w-full" disabled={!checked}>
              Beli {checked && "(1)"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;
