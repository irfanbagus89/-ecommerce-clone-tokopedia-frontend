import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OrderStatusBadge from "@/container/Seller/Orders/components/OrderStatusBadge";

const OrderCard = ({ order }) => {
  return (
    <Card className='p-0'>
      <CardContent className="p-4 space-y-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <div>
            <p className="font-semibold">{order.id}</p>
            <p className="text-sm text-gray-500">
              {order.buyer} • {order.date}
            </p>
          </div>

          <OrderStatusBadge status={order.status} />
        </div>

        {/* ITEMS */}
        <div className="text-sm text-gray-700">
          {order.items.map((item, i) => (
            <p key={i}>• {item}</p>
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="font-semibold">
            Total: Rp {order.total.toLocaleString("id-ID")}
          </p>

          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Detail
            </Button>

            {order.status === "pending" && (
              <Button
                size="sm"
                className="bg-[#03AC0E] hover:bg-green-700"
              >
                Proses Pesanan
              </Button>
            )}

            {order.status === "processing" && (
              <Button
                size="sm"
                className="bg-[#03AC0E] hover:bg-green-700"
              >
                Kirim Pesanan
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
