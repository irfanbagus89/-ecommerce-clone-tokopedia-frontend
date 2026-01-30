import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const ProductStatus = ({ active, setValue, setField }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Produk</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <span>{active ? "Aktif" : "Nonaktif"}</span>
        <Switch
          checked={active}
          onCheckedChange={(val) => {
            setValue("active", val);
            setField("active", val);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ProductStatus;
