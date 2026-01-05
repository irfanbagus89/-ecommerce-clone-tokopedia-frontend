import { useState } from "react";
import ProductFilter from "./Components/ProductFilter";
import ProductList from "./Components/ProductList";
import { useSearchProduct } from "@/services/User/SearchProducts/getSearchProducts";

const ProductSearchPage = () => {
  const [sort, setSort] = useState("relevan");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("products");

  const { data: products, isLoading: productsLoading } =
    useSearchProduct(page, 10, 'lenovo');
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <ProductFilter />
        <ProductList
          sort={sort}
          setSort={setSort}
          page={page}
          setPage={setPage}
          data={products}
          isLoading={productsLoading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default ProductSearchPage;
