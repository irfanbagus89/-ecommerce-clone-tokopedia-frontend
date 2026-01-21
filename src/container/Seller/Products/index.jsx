"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ProductStatusBadge from "@/container/Seller/Products/components/ProductStatusBadge";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const productsDummy = [
  {
    id: "PRD-001",
    name: "Kaos Polos Hitam",
    price: 75000,
    stock: 120,
    status: "active",
  },
  {
    id: "PRD-002",
    name: "Hoodie Oversize",
    price: 185000,
    stock: 0,
    status: "inactive",
  },
  {
    id: "PRD-003",
    name: "Topi Casual",
    price: 45000,
    stock: 24,
    status: "active",
  },
  {
    id: "PRD-004",
    name: "Sepatu Sneakers",
    price: 450000,
    stock: 10,
    status: "active",
  },
];
const ProductPage = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const router = useRouter();
  const filteredProducts = productsDummy.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === filteredProducts.length) {
      setSelected([]);
    } else {
      setSelected(filteredProducts.map((p) => p.id));
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Kelola Produk</h1>
          <p className="text-sm text-gray-500">
            Kelola semua produk tokomu di sini
          </p>
        </div>

        <Button className="bg-[#03AC0E] hover:bg-green-700" onClick={(() => router.push('/products/create'))}>
          <Plus className="h-4 w-4" />
          Tambah Produk
        </Button>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Input
          placeholder="Cari nama produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* BULK ACTION */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 mb-4 text-sm">
          <span>{selected.length} produk dipilih</span>
          <Button size="sm" variant="outline">
            Nonaktifkan
          </Button>
          <Button size="sm" variant="destructive">
            Hapus
          </Button>
        </div>
      )}

      {/* TABLE */}
      <Card className="p-0">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 text-left">
                  <Checkbox
                    checked={
                      selected.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="p-3 text-left">Nama Produk</th>
                <th className="p-3 text-left">Harga</th>
                <th className="p-3 text-left">Stok</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    Produk tidak ditemukan
                  </td>
                </tr>
              )}

              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="p-3">
                    <Checkbox
                      checked={selected.includes(product.id)}
                      onCheckedChange={() => toggleSelect(product.id)}
                    />
                  </td>

                  <td className="p-3">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.id}</p>
                  </td>

                  <td className="p-3">
                    Rp {product.price.toLocaleString("id-ID")}
                  </td>

                  <td className="p-3">
                    {product.stock > 0 ? (
                      <span>{product.stock}</span>
                    ) : (
                      <span className="text-red-500">Habis</span>
                    )}
                  </td>

                  <td className="p-3">
                    <ProductStatusBadge status={product.status} />
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Arsip
                      </Button>
                      <Button size="sm" variant="destructive">
                        Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;
