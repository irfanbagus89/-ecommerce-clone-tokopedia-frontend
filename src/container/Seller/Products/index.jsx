"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ProductStatusBadge from "@/container/Seller/Products/components/ProductStatusBadge";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { CustomTable } from "@/components/ui/table";
import { CustomPagination } from "@/components/ui/pagination";
import { useMyProducts } from "@/store/Seller/Products/getMyProducts";

const ProductPage = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);

  const { data } = useMyProducts({
    page,
    limit: 10,
    search,
    sort: "name",
    order: "asc",
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const toggleSelect = useCallback((id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selected.length === products.length) {
      setSelected([]);
    } else {
      setSelected(products.map((p) => p.variant_id));
    }
  }, [selected, products]);

  const columns = useMemo(
    () => [
      {
        key: "checkbox",
        label: (
          <Checkbox
            checked={selected.length === products.length && products.length > 0}
            onCheckedChange={toggleSelectAll}
          />
        ),
        sortable: false,
        render: (row) => (
          <Checkbox
            checked={selected.includes(row.variant_id)}
            onCheckedChange={() => toggleSelect(row.variant_id)}
          />
        ),
      },
      {
        key: "name",
        label: "Produk",
        sortable: true,
        render: (row) => (
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-gray-500">{row.variant_name}</p>
          </div>
        ),
      },
      {
        key: "price",
        label: "Harga",
        sortable: true,
        render: (row) => `Rp ${row.price.toLocaleString("id-ID")}`,
      },
      {
        key: "active",
        label: "Status",
        sortable: true,
        render: (row) => (
          <ProductStatusBadge status={row.active ? "active" : "inactive"} />
        ),
      },
      {
        key: "action",
        label: "Aksi",
        sortable: false,
        render: () => (
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
        ),
      },
    ],
    [products.length, selected, toggleSelect, toggleSelectAll]
  );

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Kelola Produk</h1>
          <p className="text-sm text-gray-500">
            Kelola semua produk tokomu di sini
          </p>
        </div>

        <Button
          className="bg-[#03AC0E] hover:bg-green-700"
          onClick={() => router.push("/products/create")}
        >
          <Plus className="h-4 w-4" />
          Tambah Produk
        </Button>
      </div>
      {/* SEARCH */}
      <Input
        placeholder="Cari produk..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mb-4"
      />
      {/* BULK */}
      {selected.length > 0 && (
        <div className="flex gap-3 mb-4 text-sm">
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
      <CustomTable columns={columns} data={products} />
      {/* PAGINATION */}
      <div className="mt-6">
        <CustomPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          siblingCount={1}
          className="justify-start!"
        />
      </div>
    </div>
  );
};

export default ProductPage;
