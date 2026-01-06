import ProductDetailPage from "@/container/User/Product/ProductDetail";
import AppLayout from "@/layout/UserLayout/AppLayout";
import { getDetailProduct } from "@/services/User/DetailProduct/getDetailProduct";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const data = await getDetailProduct(id);

  return {
    title: `${data.name} - Harga & Promo Terbaru`,
    description: data.description.slice(0, 150),
  };
}

const Page = async ({ params }) => {
  const { id } = await params;

  const data = await getDetailProduct(id);

  return (
    <AppLayout>
      <ProductDetailPage data={data} />
    </AppLayout>
  );
};
export default Page;
