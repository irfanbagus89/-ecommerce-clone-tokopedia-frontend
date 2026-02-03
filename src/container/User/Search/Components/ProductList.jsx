import { CustomSelect } from "@/components/ui/select";
import ProductCardSkeleton from "@/components/ui/productCardSkeleton";
import Link from "next/link";
import ProductCard from "@/components/ui/productCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Handbag } from "lucide-react";

const ProductList = ({
  sort,
  setSort,
  data,
  isLoading,
  isValidating,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="products" className="flex-1 sm:flex-none">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-sm sm:text-base">Produk</span>
              <Handbag className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          {isLoading && data.length === 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {/* Sort Dropdown */}
              <div className="flex items-center justify-end">
                <CustomSelect
                  value={sort}
                  onValueChange={(val) => {
                    setSort(val);
                  }}
                  options={[
                    { label: "Paling Sesuai", value: "relevan" },
                    { label: "Termurah", value: "termurah" },
                    { label: "Termahal", value: "termahal" },
                  ]}
                  className="w-full sm:w-[180px] h-9 text-sm"
                />
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
                {data.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/product/${prod.category_id}/${prod.id}`}
                  >
                    <ProductCard data={prod} />
                  </Link>
                ))}
              </div>

              {/* Loading Skeleton */}
              {isValidating && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 mt-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductList;
