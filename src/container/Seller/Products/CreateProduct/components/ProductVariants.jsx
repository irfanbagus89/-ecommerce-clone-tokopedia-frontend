import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProductVariants = ({
  variants = [],
  addVariant,
  updateVariant,
  removeVariant,
  onlyInteger,
  onlyNumberDecimal,
}) => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Varian Produk</CardTitle>
        <Button size="sm" variant="outline" onClick={addVariant} type="button">
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
                updateVariant(i, "price", onlyNumberDecimal(e.target.value))
              }
            />
            <Button
              type="button"
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
  );
};

export default ProductVariants;
