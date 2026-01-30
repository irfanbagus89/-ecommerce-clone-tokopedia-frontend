"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ProductStatusBadge from "@/container/Seller/Products/components/ProductStatusBadge";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { CustomPagination } from "@/components/ui/pagination";
import { useMyProducts } from "@/store/Seller/Products/getMyProducts";
import formatRupiah from "@/lib/currencyHelper";
import { CustomTable } from "@/components/ui/table";
import useDeleteVariant from "@/services/Seller/Products/deleteVariant";
import { mutate } from "swr";
import { toast } from "@/lib/toast";

const ProductPage = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);

  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");

  const { data, mutate } = useMyProducts({
    page,
    limit: 10,
    search,
    sort,
    order,
  });
  const { trigger: deleteTrigger, isMutating: isDeleting } = useDeleteVariant();

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
          <div className="max-w-[200px] whitespace-normal wrap-break-word">
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-gray-500">{row.variant_name}</p>
          </div>
        ),
      },
      {
        key: "original_price",
        label: "Harga Asli",
        sortable: true,
        render: (row) => formatRupiah(row.original_price),
      },
      {
        key: "price",
        label: "Harga Sekarang",
        sortable: true,
        render: (row) =>
          row.price != null
            ? formatRupiah(row.price)
            : formatRupiah(row.original_price),
      },
      {
        key: "stock",
        label: "Stock",
        sortable: true,
        render: (row) => <span>{row.stock}</span>,
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
        render: (row) => (
          <div className="flex justify-start gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push(`/products/${row.id}`)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={async () => {
                await deleteTrigger({ id: row.variant_id });
                toast.success("Varian dihapus");
                mutate();
              }}
            >
              Hapus
            </Button>
          </div>
        ),
      },
    ],
    [products.length, selected, toggleSelect, toggleSelectAll, router, deleteTrigger, mutate]
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

      <CustomTable
        columns={columns}
        data={products}
        sortKey={sort}
        sortOrder={order}
        onSortChange={(key, direction) => {
          setSort(key);
          setOrder(direction);
          setPage(1);
        }}
      />

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
