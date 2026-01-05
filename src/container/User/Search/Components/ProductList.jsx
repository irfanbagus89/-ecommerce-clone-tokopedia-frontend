import { CustomSelect } from "@/components/ui/select";
import ProductCardSkeleton from "@/components/ui/productCardSkeleton";
import Link from "next/link";
import ProductCard from "@/components/ui/productCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Handbag } from "lucide-react";

const productsDummy = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  name: "AMD Ryzen 5 8400F",
  price: "Rp1.999.000",
  store: "Enter Komputer",
  rating: 4.9,
  sold: 70,
  image: "/cpu.png",
}));

const ProductList = ({ sort, setSort, page, setPage, data, isLoading, activeTab, setActiveTab }) => {
  return (
    <div className="space-y-2">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="products">
            <div className="flex items-center gap-1">
              <span>Produk</span>
              <Handbag />
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          {isLoading ? (
            <div className="grid grid-cols-5 gap-4">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Menampilkan 1-60 barang
                </p>

                <CustomSelect
                  value={sort}
                  onValueChange={(val) => {
                    setPage(1);
                    setSort(val);
                  }}
                  options={[
                    { label: "Paling Sesuai", value: "relevan" },
                    { label: "Termurah", value: "termurah" },
                    { label: "Termahal", value: "termahal" },
                  ]}
                  className="w-[180px] h-9 text-sm"
                />
              </div>
              <div className="grid grid-cols-5 gap-4 mt-5">
                {data.products.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/product/${prod.category_id}/${prod.id}`}
                  >
                    <ProductCard data={prod} />
                  </Link>
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductList;
