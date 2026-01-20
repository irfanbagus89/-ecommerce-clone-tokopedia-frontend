import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RecentOrders = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Pesanan Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Invoice</th>
              <th className="text-left">Pembeli</th>
              <th className="text-left">Total</th>
              <th className="text-left">Status</th>
              <th className="text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} className="border-b last:border-b-0">
                <td className="py-3">INV-00{i}</td>
                <td>Budi</td>
                <td>Rp 150.000</td>
                <td>
                  <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700">
                    Pending
                  </span>
                </td>
                <td className="text-right">
                  <Button size="sm" variant="outline">
                    Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
