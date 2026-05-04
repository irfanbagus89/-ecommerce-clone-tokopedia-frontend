"use client";

import MyOrdersContainer from "@/container/User/Orders";
import AppLayout from "@/layout/UserLayout/AppLayout";

const OrdersPage = () => {
  return (
    <AppLayout>
      <MyOrdersContainer />
    </AppLayout>
  );
};

export default OrdersPage;
