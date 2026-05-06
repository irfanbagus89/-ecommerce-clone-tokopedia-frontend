"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import ProductForm from "./components/ProductForm";
import ProductImages from "./components/ProductImages";
import ProductVariants from "./components/ProductVariants";
import ProductStatus from "./components/ProductStatus";
import ProductPreview from "./components/ProductPreview";

import { useSubCategories } from "@/services/Seller/Products/getSubCategory";
import { useCreateProduct } from "@/services/Seller/Products/createProduct";
import { useCreateProductStore } from "@/store/Seller/Products/createProductStore";

import { toast } from "@/lib/toast";
import { z } from "zod";
import { onlyInteger, onlyNumberDecimal } from "@/lib/utils/inputSanitizers";

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

  // When entering the Create page, ensure stored form is reset (start fresh)
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const {
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: form,
    mode: "onChange",
  });

  const name = useWatch({ control, name: "name" });
  const description = useWatch({ control, name: "description" });
  const price = useWatch({ control, name: "price" });
  const category_id = useWatch({ control, name: "category_id" });
  const active = useWatch({ control, name: "active" });
  const images = useWatch({ control, name: "images" }) || [];
  const variants = useWatch({ control, name: "variants" }) || [];

  useEffect(() => {
    reset(form);
  }, [form, reset]);

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
  const previewImages = useMemo(() => {
    if (!images || images.length === 0) return ["https://picsum.photos/seed/1/600/600"];
    return images.map((file) =>
      typeof file === "string" ? file : URL.createObjectURL(file)
    );
  }, [images]);

  const previewProduct = useMemo(() => ({
    title: name || "Nama Produk",
    description: description || "Deskripsi produk",
    price: Number(price || 0),
    original_price: Number(price || 0),
    stock: variants.reduce((a, b) => a + Number(b.stock || 0), 0),
    images: previewImages,
    variants: variants.map((v, i) => ({
      id: i,
      name: v.name || `Varian ${i + 1}`,
      price: Number(v.price || 0),
      stock: Number(v.stock || 0),
    })),
  }), [name, description, price, variants, previewImages]);

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-7 space-y-6"
        >
          <ProductForm
            name={name}
            description={description}
            price={price}
            category_id={category_id}
            errors={errors}
            setValue={setValue}
            setField={setField}
            categoryOptions={categoryOptions}
            isLoading={isLoading}
            onlyNumberDecimal={onlyNumberDecimal}
          />

          <ProductImages
            images={images}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
            error={errors.images?.message}
          />

          <ProductVariants
            variants={variants}
            addVariant={addVariant}
            updateVariant={updateVariant}
            removeVariant={removeVariant}
            onlyInteger={onlyInteger}
            onlyNumberDecimal={onlyNumberDecimal}
          />

          <ProductStatus
            active={active}
            setValue={setValue}
            setField={setField}
          />

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
        </form>

        <div className="lg:col-span-5 sticky top-6">
          <ProductPreview previewProduct={previewProduct} />
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
