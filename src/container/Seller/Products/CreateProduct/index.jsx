"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const CreateProductPage = () => {
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([
    { name: "", stock: "", price: "" },
  ]);
  const [active, setActive] = useState(true);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previews]);
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { name: "", stock: "", price: "" },
    ]);
  };

  const updateVariant = (index, key, value) => {
    const newVariants = [...variants];
    newVariants[index][key] = value;
    setVariants(newVariants);
  };

  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-5xl">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tambah Produk</h1>
        <p className="text-sm text-gray-500">
          Lengkapi detail produk dengan benar
        </p>
      </div>

      <div className="space-y-6">
        {/* BASIC INFO */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Produk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Nama Produk" />
            <Textarea placeholder="Deskripsi Produk" />
            <Input placeholder="Kategori" />
          </CardContent>
        </Card>

        {/* IMAGES */}
        <Card>
          <CardHeader>
            <CardTitle>Foto Produk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="border rounded overflow-hidden"
                  >
                    <img
                      src={img}
                      alt="preview"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* PRICE & STOCK */}
        <Card>
          <CardHeader>
            <CardTitle>Harga & Stok</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Harga" type="number" />
            <Input placeholder="Harga Coret (opsional)" type="number" />
            <Input placeholder="Stok" type="number" />
          </CardContent>
        </Card>

        {/* VARIANTS */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Varian Produk</CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={addVariant}
            >
              + Tambah Varian
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {variants.map((variant, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center"
              >
                <Input
                  placeholder="Nama Varian"
                  value={variant.name}
                  onChange={(e) =>
                    updateVariant(i, "name", e.target.value)
                  }
                />
                <Input
                  placeholder="Stok"
                  type="number"
                  value={variant.stock}
                  onChange={(e) =>
                    updateVariant(i, "stock", e.target.value)
                  }
                />
                <Input
                  placeholder="Harga"
                  type="number"
                  value={variant.price}
                  onChange={(e) =>
                    updateVariant(i, "price", e.target.value)
                  }
                />

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeVariant(i)}
                >
                  Hapus
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* SHIPPING */}
        <Card>
          <CardHeader>
            <CardTitle>Pengiriman</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Berat (gram)" type="number" />
            <Input placeholder="Panjang (cm)" type="number" />
            <Input placeholder="Lebar (cm)" type="number" />
          </CardContent>
        </Card>

        {/* STATUS */}
        <Card>
          <CardHeader>
            <CardTitle>Status Produk</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span>{active ? "Aktif" : "Nonaktif"}</span>
            <Switch checked={active} onCheckedChange={setActive} />
          </CardContent>
        </Card>

        {/* ACTION */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Batal</Button>
          <Button className="bg-[#03AC0E] hover:bg-green-700">
            Simpan Produk
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
