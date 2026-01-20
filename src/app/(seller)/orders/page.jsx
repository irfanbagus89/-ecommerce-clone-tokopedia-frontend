import OrdersPage from "@/container/Seller/Orders";
import SellerLayout from "@/layout/SellerLayout/SellerLayout";

const page = () => {
  return (
    <SellerLayout>
        <OrdersPage/>
    </SellerLayout>
  );
};

export default page;
