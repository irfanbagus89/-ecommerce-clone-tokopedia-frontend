// ProductDetailPage.jsx (SERVER)
import { CustomBreadcrumb } from "@/components/ui/breadcrumb";
import ProductRekomendasiSection from "./Components/ProductRekomendasiSection";
import ProductReviews from "./Components/ProductReview";
import ProductDetail from "./Components/ProductDetail";

const ProductDetailPage = ({ data }) => {
  const product = {
    id: data.id,
    title: data.name,
    description: data.description,
    price: data.price,
    original_price: data.original_price,
    discount: data.discount_percent,
    rating: data.rating.average,
    ratingCount: data.rating.count,
    soldCount: data.sold_count,
    stock: data.stock,
    images: data.images,
    variants: data.variants,
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: data.category.name, href: `/category/${data.category.id}` },
    { label: product.title },
  ];

  return (
    <>
      <CustomBreadcrumb items={breadcrumbItems} />

      <ProductDetail product={product} data={data} />

      <ProductReviews productId={product.id} />
      <ProductRekomendasiSection
        sellerId={data.seller.id}
        categoryId={data.category.id}
        id={data.id}
      />
    </>
  );
};

export default ProductDetailPage;
