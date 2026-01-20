import { Card, CardContent } from "@/components/ui/card";

const dummyData = [
  { title: "Saldo Saya", value: "Rp 2.450.000" },
  { title: "Pesanan Baru", value: "12" },
  { title: "Perlu Dikirim", value: "5" },
  { title: "Rating Toko", value: "4.8 ⭐" },
  { title: "Total Produk", value: "128" },
];

const SummarySection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
      {dummyData.map((item, index) => (
        <Card key={index}>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-500">{item.title}</p>
            <p className="text-xl font-semibold mt-1">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummarySection;
