import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CustomSelect } from "@/components/ui/select";

const ProductForm = ({
  name,
  description,
  price,
  category_id,
  errors,
  setValue,
  setField,
  categoryOptions,
  isLoading,
  onlyNumberDecimal,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Produk</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          floating
          label="Nama Produk"
          error={errors.name?.message}
          value={name}
          onChange={(e) => {
            setValue("name", e.target.value);
            setField("name", e.target.value);
          }}
        />

        <Textarea
          placeholder="Deskripsi Produk"
          error={errors.description?.message}
          value={description}
          onChange={(e) => {
            setValue("description", e.target.value);
            setField("description", e.target.value);
          }}
        />

        <Input
          floating
          label="Harga Produk"
          error={errors.price?.message}
          value={price}
          onChange={(e) => {
            const v = onlyNumberDecimal(e.target.value);
            setValue("price", v);
            setField("price", v);
          }}
        />

        <CustomSelect
          value={category_id}
          className="w-full"
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
  );
};

export default ProductForm;
