import { useEffect, useRef, useState } from "react";
import ProductFilter from "./Components/ProductFilter";
import ProductList from "./Components/ProductList";
import { useSearchProduct } from "@/services/User/SearchProducts/getSearchProducts";
import { useSearchParams } from "next/navigation";

const ProductSearchPage = () => {
  const [sort, setSort] = useState("relevan");
  const [activeTab, setActiveTab] = useState("products");
  const [showFilter, setShowFilter] = useState(false);
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    storeTypes: [],
    locations: [],
    minPrice: "",
    maxPrice: "",
  });

  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);

  const { data, setSize, isLoading, isValidating } = useSearchProduct({
    limit: 10,
    search: searchParams.get("s"),
    storeTypes: filters.storeTypes,
    locations: filters.locations,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    sort,
  });
  const products = data?.flatMap((page) => page?.products || []) || [];
  const meta = data?.[0] || null;

  const loadMoreRef = useRef(null);

  // Infinite Scroll Observer
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && !isValidating) {
          setSize((prev) => prev + 1);
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isLoading, isValidating, setSize]);

  // Debounce price filter
  useEffect(() => {
    const timer = setTimeout(() => {
      setSize(1);
      setFilters((prev) => ({
        ...prev,
        minPrice: minPrice,
        maxPrice: maxPrice,
      }));
    }, 800);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, setSize]);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="lg:hidden w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg mb-4"
      >
        <span className="font-medium">Filter</span>
        <svg
          className={`w-5 h-5 transition-transform ${
            showFilter ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:gap-6">
        {/* Filter Sidebar */}
        <div className={`${showFilter ? "block" : "hidden"} lg:block`}>
          <ProductFilter
            filters={filters}
            setFilters={setFilters}
            productsMeta={meta}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            setMinPrice={setMinPrice}
            setSize={setSize}
          />
        </div>

        {/* Product List */}
        <div>
          <ProductList
            sort={sort}
            setSort={setSort}
            data={products}
            isLoading={isLoading}
            isValidating={isValidating}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div ref={loadMoreRef} className="h-10" />
        </div>
      </div>
    </div>
  );
};

export default ProductSearchPage;
