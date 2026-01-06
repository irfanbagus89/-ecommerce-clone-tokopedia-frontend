import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ui/productCard";
import ProductCardSkeleton from "@/components/ui/productCardSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthContext } from "@/contexts/AuthProvider";
import { useProductForYou } from "@/services/User/Home/getProductForYou";
import { useOfficialProducts } from "@/services/User/Home/getProductOfficial";

const ProductSection = () => {
  const { isLoggedIn, isLoading } = useAuthContext();
  const [activeTab, setActiveTab] = useState("foryou");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(isLoggedIn ? "foryou" : "mall");
    }
  }, [isLoggedIn, isLoading]);

  const {
    data: forYouData,
    setSize: setForYouSize,
    isLoading: forYouLoading,
    isValidating: forYouValidating,
  } = useProductForYou(10, activeTab === "foryou");

  const forYouProducts =
    forYouData?.flatMap((page) => page?.Data?.products || []) || [];

  const forYouLoadMoreRef = useRef(null);

  useEffect(() => {
    if (!isReady) return;
    if (activeTab !== "foryou") return;
    if (!forYouLoadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !forYouLoading && !forYouValidating) {
          setForYouSize((prev) => prev + 1);
        }
      },
      { rootMargin: "300px", threshold: 0 }
    );

    observer.observe(forYouLoadMoreRef.current);
    return () => observer.disconnect();
  }, [
    isReady,
    activeTab,
    forYouProducts.length,
    forYouLoading,
    forYouValidating,
    setForYouSize,
  ]);

  const {
    data: mallData,
    setSize: setMallSize,
    isLoading: mallLoading,
    isValidating: mallValidating,
  } = useOfficialProducts(5, activeTab === "mall");

  const mallProducts =
    mallData?.flatMap((page) => page?.Data?.products || []) || [];

  const mallLoadMoreRef = useRef(null);

  useEffect(() => {
    if (!isReady) return;
    if (activeTab !== "mall") return;
    if (!mallLoadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !mallLoading && !mallValidating) {
          setMallSize((prev) => prev + 1);
        }
      },
      { rootMargin: "300px", threshold: 0 }
    );

    observer.observe(mallLoadMoreRef.current);
    return () => observer.disconnect();
  }, [
    isReady,
    activeTab,
    mallProducts.length,
    mallLoading,
    mallValidating,
    setMallSize,
  ]);

  useEffect(() => {
    if (activeTab === "foryou") setForYouSize(1);
    if (activeTab === "mall") setMallSize(1);
  }, [activeTab, setForYouSize, setMallSize]);

  useEffect(() => {
    if (activeTab !== "mall") return;
    if (mallLoading || mallValidating) return;

    const scrollable =
      document.documentElement.scrollHeight > window.innerHeight;

    if (!scrollable) {
      setMallSize((prev) => prev + 1);
    }
  }, [activeTab, mallProducts.length, mallLoading, mallValidating, setMallSize]);

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {isLoggedIn && <TabsTrigger value="foryou">For You</TabsTrigger>}
          <TabsTrigger value="mall">Mall</TabsTrigger>
        </TabsList>

        {isLoggedIn && (
          <TabsContent value="foryou" className="py-4">
            <div className="grid grid-cols-5 gap-4">
              {forYouProducts.map((prod) => (
                <Link
                  key={prod.id}
                  href={`/product/${prod.category_id}/${prod.id}`}
                >
                  <ProductCard data={prod} />
                </Link>
              ))}
              {(forYouLoading || forYouValidating) &&
                Array.from({ length: 5 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
            </div>
            <div ref={forYouLoadMoreRef} className="h-10" />
          </TabsContent>
        )}

        <TabsContent value="mall" className="py-4">
          <div className="grid grid-cols-5 gap-4">
            {mallProducts.map((prod) => (
              <Link
                key={prod.id}
                href={`/product/${prod.category_id}/${prod.id}`}
              >
                <ProductCard data={prod} />
              </Link>
            ))}
            {(mallLoading || mallValidating) &&
              Array.from({ length: 5 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
          </div>
          <div ref={mallLoadMoreRef} className="h-10" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductSection;
