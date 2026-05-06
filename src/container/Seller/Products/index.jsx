"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ProductStatusBadge from "@/container/Seller/Products/components/ProductStatusBadge";
import { Plus, Search, Filter, Grid3x3, List, MoreVertical, Edit, Trash2, Package } from "lucide-react";
import { useRouter } from "next/navigation";

import { CustomPagination } from "@/components/ui/pagination";
import { useMyProducts } from "@/services/Seller/Products/getMyProducts";
import formatRupiah from "@/lib/utils/formatters";
import { CustomTable } from "@/components/ui/table";
import useDeleteVariant from "@/services/Seller/Products/deleteVariant";
import { toast } from "@/lib/toast";

const ProductPage = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'

  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");

  const { data, mutate } = useMyProducts({
    page,
    limit: 10,
    search: debouncedSearch,
    sort,
    order,
  });

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);
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
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Package className="text-gray-400" size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-900">{row.name}</p>
              <p className="text-xs text-gray-500">{row.variant_name}</p>
            </div>
          </div>
        ),
      },
      {
        key: "original_price",
        label: "Harga Asli",
        sortable: true,
        render: (row) => (
          <span className="text-gray-500 line-through text-sm">
            {formatRupiah(row.original_price)}
          </span>
        ),
      },
      {
        key: "price",
        label: "Harga Sekarang",
        sortable: true,
        render: (row) => (
          <span className="font-semibold text-[#03AC0E]">
            {row.price != null
              ? formatRupiah(row.price)
              : formatRupiah(row.original_price)}
          </span>
        ),
      },
      {
        key: "stock",
        label: "Stock",
        sortable: true,
        render: (row) => (
          <span className={`font-medium ${row.stock > 0 ? "text-gray-900" : "text-red-500"}`}>
            {row.stock > 0 ? `${row.stock} pcs` : "Habis"}
          </span>
        ),
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
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-3 text-xs font-medium border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => router.push(`/products/${row.id}`)}
            >
              <Edit size={14} className="mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300"
              onClick={async () => {
                await deleteTrigger({ id: row.variant_id });
                toast.success("Varian dihapus");
                mutate();
              }}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ),
      },
    ],
    [products.length, selected, toggleSelect, toggleSelectAll, router, deleteTrigger, mutate]
  );

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kelola Produk</h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola semua produk tokomu di sini
            </p>
          </div>

          <Button
            className="bg-linear-to-r from-[#03AC0E] to-[#028a0b] hover:from-[#028a0b] hover:to-[#027009] text-white font-semibold shadow-lg shadow-green-200"
            onClick={() => router.push("/products/create")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Produk
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Cari produk berdasarkan nama atau SKU..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="h-11 bg-gray-50 border-gray-200 focus:border-[#03AC0E] focus:ring-[#03AC0E]/20"
              leftIcon={<Search className="text-gray-400" size={18}/>}
            />
          </div>
        
        </div>

        {/* Selected Products Actions */}
        {selected.length > 0 && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">
                {selected.length} produk dipilih
              </span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-gray-300 hover:bg-white">
                Nonaktifkan
              </Button>
              <Button size="sm" variant="destructive" className="bg-red-500 hover:bg-red-600">
                Hapus
              </Button>
            </div>
          </div>
        )}
      </div>
        
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

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100">
          <CustomPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            siblingCount={1}
            className="justify-start"
          />
        </div>
    </div>
  );
};

export default ProductPage;
