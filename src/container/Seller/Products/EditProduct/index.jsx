"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { useSubCategories } from "@/services/Seller/Products/getSubCategory";
import useGetProduct from "@/services/Seller/Products/getProduct";
import { useUpdateProduct } from "@/services/Seller/Products/updateProduct";
import { useDeleteVariant } from "@/services/Seller/Products/deleteVariant";
import { useCreateProductStore } from "@/store/Seller/Products/createProductStore";
import { toast } from "@/lib/toast";
import { z } from "zod";

import ProductForm from "../CreateProduct/components/ProductForm";
import ProductImages from "../CreateProduct/components/ProductImages";
import ProductVariants from "../CreateProduct/components/ProductVariants";
import ProductStatus from "../CreateProduct/components/ProductStatus";
import ProductPreview from "../CreateProduct/components/ProductPreview";

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

const onlyNumberDecimal = (value) =>
  value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const { data: subCategories, isLoading } = useSubCategories();
  const { form, setField, setVariants, setImages, resetForm } =
    useCreateProductStore();

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

  const { trigger: updateTrigger, isMutating: isUpdating } = useUpdateProduct();
  const { trigger: deleteTrigger, isMutating: isDeleting } = useDeleteVariant();

  // use SWR hook to fetch product data
  const {
    data: res,
    error: fetchError,
    isLoading: swrLoading,
  } = useGetProduct(id);

  useEffect(() => {
    const apply = () => {
      if (!res) return;
      // map backend Data to form shape
      const mapped = {
        name: res.name || "",
        description: res.description || "",
        price: String(res.price || "0"),
        category_id: res.category?.id || res.category_id || "",
        active: !!res.active,
        images: Array.isArray(res.images) ? res.images : [],
        variants: (res.variants || []).map((v) => ({
          id: v.id,
          name: v.name || "",
          price: String(v.price || "0"),
          stock: String(v.stock || "0"),
        })),
      };

      reset(mapped);
      // sync store
      setField("name", mapped.name);
      setField("description", mapped.description);
      setField("price", mapped.price);
      setField("category_id", mapped.category_id);
      setField("active", mapped.active);
      setImages(mapped.images);
      setVariants(mapped.variants);
    };

    apply();
  }, [res, reset, setField, setImages, setVariants]);

  useEffect(() => {
    if (fetchError) {
      console.error(fetchError);
      toast.error("Gagal mengambil data produk");
    }
  }, [fetchError]);

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

  const removeVariant = async (index) => {
    const v = variants[index];
    if (v?.id) {
      try {
        await deleteTrigger({ id: v.id });
        toast.success("Varian dihapus");
        const newVariants = variants.filter((_, i) => i !== index);
        setValue("variants", newVariants);
        setVariants(newVariants);
      } catch (err) {
        console.error(err);
        toast.error("Gagal menghapus varian");
      }
    } else {
      if (variants.length === 1) return;
      const newVariants = variants.filter((_, i) => i !== index);
      setValue("variants", newVariants);
      setVariants(newVariants);
    }
  };

  const categoryOptions = (subCategories || []).map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const onSubmit = async (data) => {
    if (!id) return;
    try {
      await updateTrigger({ id, data });
      toast.success("Produk berhasil diperbarui");
      setTimeout(() => router.back(), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui produk");
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Produk</h1>
        <p className="text-sm text-gray-500">Ubah detail produk</p>
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
            onlyInteger={(v) => v.replace(/[^0-9]/g, "")}
            onlyNumberDecimal={(v) =>
              v.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")
            }
          />

          <ProductStatus
            active={active}
            setValue={setValue}
            setField={setField}
          />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                router.back();
              }}
            >
              Batal
            </Button>
            <Button type="submit" className="bg-[#03AC0E]">
              Simpan Perubahan
            </Button>
          </div>
        </form>

        <div className="lg:col-span-5 sticky top-6">
          <ProductPreview
            previewProduct={{
              title: name || "Nama Produk",
              description: description || "Deskripsi produk",
              price: Number(price || 0),
              original_price: Number(price || 0),
              stock: variants.reduce((a, b) => a + Number(b.stock || 0), 0),
              images:
                images.length > 0
                  ? images.map((img) =>
                      typeof img === "string" ? img : URL.createObjectURL(img)
                    )
                  : ["https://picsum.photos/seed/1/600/600"],
              variants: variants.map((v, i) => ({
                id: v.id || i,
                name: v.name || `Varian ${i + 1}`,
                price: Number(v.price || 0),
                stock: Number(v.stock || 0),
              })),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
