import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OrderStatusBadge from "@/container/Seller/Orders/components/OrderStatusBadge";
import { MapPin, Package, ChevronRight, Eye, CheckCircle, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OrderCard = ({ order }) => {
  return (
    <Card className='border-0 border-b border-gray-100 rounded-none shadow-none last:rounded-b-2xl first:rounded-t-2xl hover:bg-gray-50/50 transition-colors'>
      <CardContent className="p-5">
        {/* Order Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Package className="text-[#03AC0E]" size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">{order.id}</p>
                <ChevronRight className="text-gray-400" size={14} />
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {order.buyer} • {order.date}
              </p>
            </div>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Order Items */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-2">
            <Package className="text-gray-400 mt-0.5" size={16} />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 mb-2">Item Pesanan:</p>
              <div className="space-y-1">
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm text-gray-700">• {item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        {order.address && (
          <div className="flex items-start gap-2 mb-4">
            <MapPin className="text-gray-400 mt-0.5" size={16} />
            <p className="text-sm text-gray-600">{order.address}</p>
          </div>
        )}

        {/* Order Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Pembayaran</p>
            <p className="text-lg font-bold text-[#03AC0E]">
              Rp {order.total.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-9 px-4 text-sm font-medium border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            >
              <Eye size={14} className="mr-1.5" />
              Detail
            </Button>

            {order.status === "pending" && (
              <Button
                size="sm"
                className="h-9 px-4 bg-gradient-to-r from-[#03AC0E] to-[#028a0b] hover:from-[#028a0b] hover:to-[#027009] text-white font-medium shadow-md shadow-green-200"
              >
                <CheckCircle size={14} className="mr-1.5" />
                Proses Pesanan
              </Button>
            )}

            {order.status === "processing" && (
              <Button
                size="sm"
                className="h-9 px-4 bg-gradient-to-r from-[#03AC0E] to-[#028a0b] hover:from-[#028a0b] hover:to-[#027009] text-white font-medium shadow-md shadow-green-200"
              >
                <Truck size={14} className="mr-1.5" />
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
