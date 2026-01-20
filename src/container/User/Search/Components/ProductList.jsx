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
          {isLoading && data.length === 0 ? (
            <div className="grid grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
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
                  className="w-[180px] h-9 text-sm"
                />
              </div>

              <div className="grid grid-cols-5 gap-4 mt-5">
                {data.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/product/${prod.category_id}/${prod.id}`}
                  >
                    <ProductCard data={prod} />
                  </Link>
                ))}
              </div>

              {isValidating && (
                <div className="grid grid-cols-5 gap-4 mt-4">
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
