"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useSubCategories } from "@/services/Seller/Products/getSubCategory";
import { CustomSelect } from "@/components/ui/select";

/** allow number + single dot */
const onlyNumberDecimal = (value) => {
  return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
};

const onlyInteger = (value) => value.replace(/[^0-9]/g, "");

const CreateProductPage = () => {
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([
    { name: "", stock: "0", price: "0" },
  ]);
  const [active, setActive] = useState(true);

  const { data: subCategories, isLoading } = useSubCategories();
  const [category, setCategory] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("0");
  const [weight, setWeight] = useState("0");
  const [length, setLength] = useState("0");
  const [width, setWidth] = useState("0");

  const categoryOptions =
    subCategories?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previews]);
  };

  const addVariant = () => {
    setVariants((prev) => [...prev, { name: "", stock: "0", price: "0" }]);
  };

  const updateVariant = (index, key, value) => {
    const newVariants = [...variants];
    newVariants[index][key] = value; // biarkan ""
    setVariants(newVariants);
  };

  const removeVariant = (index) => {
    setVariants((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
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
            {/* Nama */}
            <Input
              floating
              label="Nama Produk"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Textarea placeholder="Deskripsi Produk" />

            {/* Harga */}
            <div className="relative">
              {price !== "" && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none">
                  Rp
                </span>
              )}
              <Input
                floating
                placeholder="Harga Produk"
                inputMode="decimal"
                value={price}
                onChange={(e) => setPrice(onlyNumberDecimal(e.target.value))}
                className="pl-10"
              />
            </div>

            <CustomSelect
              value={category}
              onValueChange={setCategory}
              placeholder={isLoading ? "Loading..." : "Pilih Kategori"}
              options={categoryOptions}
              disabled={isLoading}
              className="w-full"
            />
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
                  <div key={i} className="border rounded overflow-hidden">
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

        {/* VARIANTS */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Varian Produk</CardTitle>
            <Button size="sm" variant="outline" onClick={addVariant}>
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
                  floating
                  label="Nama Varian"
                  value={variant.name}
                  onChange={(e) => updateVariant(i, "name", e.target.value)}
                />

                <Input
                  floating
                  label="Stok"
                  inputMode="numeric"
                  value={variant.stock}
                  onChange={(e) =>
                    updateVariant(i, "stock", onlyInteger(e.target.value))
                  }
                />

                <div className="relative">
                  {variant.price !== "" && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none">
                      Rp
                    </span>
                  )}
                  <Input
                    floating
                    label="Harga Varian"
                    inputMode="decimal"
                    value={variant.price}
                    onChange={(e) =>
                      updateVariant(
                        i,
                        "price",
                        onlyNumberDecimal(e.target.value)
                      )
                    }
                    className="pl-10"
                  />
                </div>

                <Button
                  size="sm"
                  variant="destructive"
                   disabled={variants.length === 1}
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
            {/* Berat */}
            <div className="relative">
              <Input
                floating
                label="Berat"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(onlyNumberDecimal(e.target.value))}
                className="pr-14"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                gram
              </span>
            </div>

            {/* Panjang */}
            <div className="relative">
              <Input
                floating
                label="Panjang"
                inputMode="decimal"
                value={length}
                onChange={(e) => setLength(onlyNumberDecimal(e.target.value))}
                className="pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                cm
              </span>
            </div>

            {/* Lebar */}
            <div className="relative">
              <Input
                floating
                label="Lebar"
                inputMode="decimal"
                value={width}
                onChange={(e) => setWidth(onlyNumberDecimal(e.target.value))}
                className="pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                cm
              </span>
            </div>
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
