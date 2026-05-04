"use client";

import OrderDetailContainer from "@/container/User/Orders/OrderDetailContainer";
import AppLayout from "@/layout/UserLayout/AppLayout";
import { use } from "react";

const OrderDetailPage = ({ params }) => {
  const { id } = use(params);
  return (
    <AppLayout>
      <OrderDetailContainer orderId={id} />
    </AppLayout>
  );
};

export default OrderDetailPage;
