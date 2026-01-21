import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const HeaderSection = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Ringkasan performa tokomu hari ini
        </p>
      </div>

      <Button
        className="bg-[#03AC0E] hover:bg-green-700"
        onClick={() => router.push("/products/create")}
      >
        <Plus className="h-4 w-4" />
        Tambah Produk
      </Button>
    </div>
  );
};

export default HeaderSection;
