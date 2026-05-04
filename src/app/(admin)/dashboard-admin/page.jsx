import AdminDashboardPage from "@/container/Admin/Dashboard";
import AdminLayout from "@/layout/AdminLayout/AdminLayout";

const page = () => {
  return (
    <AdminLayout>
      <AdminDashboardPage />
    </AdminLayout>
  );
};

export default page;
