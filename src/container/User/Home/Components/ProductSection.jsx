import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ui/productCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthContext } from "@/contexts/AuthProvider";

import { useProductForYou } from "@/services/User/Home/getProductForYou";
import { useOfficialProducts } from "@/services/User/Home/getProductOfficial";
import ProductCardSkeleton from "@/components/ui/productCardSkeleton";

const ProductSection = () => {
  const { isLoggedIn, isLoading } = useAuthContext();

  const [activeTab, setActiveTab] = useState("foryou");
  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveTab("foryou");
      } else {
        setActiveTab("mall");
      }
    }
  }, [isLoggedIn, isLoading]);

  const { data: forYouData, isLoading: forYouLoading } = useProductForYou(
    1,
    10,
    activeTab === "foryou"
  );

  const { data: mallData, isLoading: mallLoading } = useOfficialProducts(
    1,
    5,
    activeTab === "mall"
  );

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          {isLoggedIn && (
            <TabsTrigger value="foryou" className="text-base">
              For You
            </TabsTrigger>
          )}

          <TabsTrigger value="mall">
            <div className="flex items-center gap-1">
              <div className="bg-purple-600 text-white p-0.5 rounded-sm flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 01.208-1.04z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Mall</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {isLoggedIn && (
          <TabsContent value="foryou" className="py-4">
            {forYouLoading ? (
              <div className="grid grid-cols-5 gap-4">
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-4">
                {forYouData?.Data?.products?.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/product/${prod.category_id}/${prod.id}`}
                  >
                    <ProductCard data={prod} />
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        )}
        <TabsContent value="mall" className="py-4">
          {mallLoading ? (
            <div className="grid grid-cols-5 gap-4">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {mallData?.Data?.products?.map((prod) => (
                <Link
                  key={prod.id}
                  href={`/product/${prod.category_id}/${prod.id}`}
                >
                  <ProductCard data={prod} />
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductSection;
