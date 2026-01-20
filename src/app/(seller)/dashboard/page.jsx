import SellerDashboardPage from "@/container/Seller/Dashboard";
import SellerLayout from "@/layout/SellerLayout/SellerLayout";

const page = () => {
  return (
    <SellerLayout>
      <SellerDashboardPage />
    </SellerLayout>
  );
};

export default page;
