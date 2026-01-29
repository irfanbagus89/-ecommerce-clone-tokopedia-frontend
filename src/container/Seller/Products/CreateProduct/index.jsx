"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CustomSelect } from "@/components/ui/select";

import ProductGallery from "@/container/User/Product/ProductDetail/Components/ProductGallery";
import ProductInfo from "@/container/User/Product/ProductDetail/Components/ProductInfo";

import { useSubCategories } from "@/services/Seller/Products/getSubCategory";
import { useCreateProduct } from "@/services/Seller/Products/createProduct";
import { useCreateProductStore } from "@/store/Seller/Products/createProductStore";

import { toast } from "@/lib/toast";
import { set, z } from "zod";

/** allow number + single dot */
const onlyNumberDecimal = (value) =>
  value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
const onlyInteger = (value) => value.replace(/[^0-9]/g, "");

const createProductSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  price: z.string().min(1, "Harga wajib diisi"),
  category_id: z.string().min(1, "Kategori wajib dipilih"),
  active: z.boolean(),
  variants: z.array(
    z.object({
      name: z.string().min(1, "Nama varian wajib"),
      stock: z.string().min(1, "Stok wajib"),
      price: z.string().min(1, "Harga varian wajib"),
    })
  ),
  images: z
    .array(z.any())
    .min(1, "Minimal 1 foto produk")
    .max(5, "Maksimal 5 foto"),
});

const CreateProductPage = () => {
  const router = useRouter();
  const { data: subCategories, isLoading } = useSubCategories();
  const { trigger: createProduct, isMutating } = useCreateProduct();

  const { form, setField, setVariants, setImages, resetForm } =
    useCreateProductStore();

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: form,
    mode: "onChange",
  });

  const images = watch("images");
  const variants = watch("variants");

  useEffect(() => {
    reset(form);
  }, [form]);

  const categoryOptions =
    subCategories?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const remainingSlots = 5 - images.length;
    if (remainingSlots <= 0) return;

    const selected = files.slice(0, remainingSlots);
    const newImages = [...images, ...selected];

    setValue("images", newImages);
    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setValue("images", newImages);
    setImages(newImages);
  };

  const addVariant = () => {
    const newVariants = [...variants, { name: "", stock: "0", price: "0" }];
    setValue("variants", newVariants);
    setVariants(newVariants);
  };

  const updateVariant = (index, key, value) => {
    const newVariants = [...variants];
    newVariants[index][key] = value;
    setValue("variants", newVariants);
    setVariants(newVariants);
  };

  const removeVariant = (index) => {
    if (variants.length === 1) return;
    const newVariants = variants.filter((_, i) => i !== index);
    setValue("variants", newVariants);
    setVariants(newVariants);
  };

  /** PREVIEW */
  const previewProduct = {
    title: watch("name") || "Nama Produk",
    description: watch("description") || "Deskripsi produk",
    price: Number(watch("price") || 0),
    original_price: Number(watch("price") || 0),
    stock: variants.reduce((a, b) => a + Number(b.stock || 0), 0),
    images:
      images.length > 0
        ? images.map((file) => URL.createObjectURL(file))
        : ["https://picsum.photos/seed/1/600/600"],
    variants: variants.map((v, i) => ({
      id: i,
      name: v.name || `Varian ${i + 1}`,
      price: Number(v.price || 0),
      stock: Number(v.stock || 0),
    })),
  };

  const onSubmit = async (data) => {
    try {
      await createProduct(data);
      toast.success("Produk berhasil dibuat");
      resetForm();
      setTimeout(() => {
        router.back();
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan produk");
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tambah Produk</h1>
        <p className="text-sm text-gray-500">
          Lengkapi detail produk dengan benar
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* FORM */}
          <div className="lg:col-span-7 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Produk</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  floating
                  label="Nama Produk"
                  error={errors.name?.message}
                  value={watch("name")}
                  onChange={(e) => {
                    setValue("name", e.target.value);
                    setField("name", e.target.value);
                  }}
                />

                <Textarea
                  placeholder="Deskripsi Produk"
                  error={errors.description?.message}
                  value={watch("description")}
                  onChange={(e) => {
                    setValue("description", e.target.value);
                    setField("description", e.target.value);
                  }}
                />

                <Input
                  floating
                  label="Harga Produk"
                  error={errors.price?.message}
                  value={watch("price")}
                  onChange={(e) => {
                    const v = onlyNumberDecimal(e.target.value);
                    setValue("price", v);
                    setField("price", v);
                  }}
                />

                <CustomSelect
                  value={watch("category_id")}
                  className={'w-full'}
                  onValueChange={(val) => {
                    setValue("category_id", val);
                    setField("category_id", val);
                  }}
                  placeholder={isLoading ? "Loading..." : "Pilih Kategori"}
                  options={categoryOptions}
                  disabled={isLoading}
                  error={errors.category_id?.message}
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
                  disabled={images.length >= 5}
                />
                {errors.images && (
                  <p className="text-sm text-red-500">
                    {errors.images.message}
                  </p>
                )}

                {images.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {images.map((file, i) => (
                      <div key={i} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          className="w-full h-full object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* VARIANTS */}
            <Card>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>Varian Produk</CardTitle>
                <Button size="sm" variant="outline" onClick={addVariant}>
                  + Tambah Varian
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {variants.map((variant, i) => (
                  <div key={i} className="grid grid-cols-4 gap-2">
                    <Input
                      floating
                      label="Nama Varian"
                      value={variant.name}
                      onChange={(e) => updateVariant(i, "name", e.target.value)}
                    />
                    <Input
                      floating
                      label="Stok"
                      value={variant.stock}
                      onChange={(e) =>
                        updateVariant(i, "stock", onlyInteger(e.target.value))
                      }
                    />
                    <Input
                      floating
                      label="Harga Tambahan"
                      value={variant.price}
                      onChange={(e) =>
                        updateVariant(
                          i,
                          "price",
                          onlyNumberDecimal(e.target.value)
                        )
                      }
                    />
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

            {/* STATUS */}
            <Card>
              <CardHeader>
                <CardTitle>Status Produk</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between">
                <span>{watch("active") ? "Aktif" : "Nonaktif"}</span>
                <Switch
                  checked={watch("active")}
                  onCheckedChange={(val) => {
                    setValue("active", val);
                    setField("active", val);
                  }}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  router.back();
                }}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isMutating}
                className="bg-[#03AC0E]"
              >
                {isMutating ? "Menyimpan..." : "Simpan Produk"}
              </Button>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="lg:col-span-5 sticky top-6">
            <div className="border rounded-xl p-4 bg-white">
              <h2 className="font-bold mb-3">Preview Produk</h2>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <ProductGallery images={previewProduct.images} />
                </div>
                <div className="col-span-7">
                  <ProductInfo product={previewProduct} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
