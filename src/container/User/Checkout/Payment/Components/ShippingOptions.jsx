import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Truck, Clock, Shield, Info } from "lucide-react"

const ShippingOptions = ({ selectedShipping, onSelectShipping }) => {
  const shippingOptions = [
    {
      value: "jne_reg",
      name: "JNE Regular",
      price: 9000,
      estimated: "2-3 Hari",
      type: "Reguler",
      typeColor: "bg-orange-100 text-orange-700",
      available: true,
    },
    {
      value: "jne_yes",
      name: "JNE YES",
      price: 18000,
      estimated: "Besok",
      type: "Cepat",
      typeColor: "bg-red-100 text-red-700",
      available: true,
    },
    {
      value: "jnt_reg",
      name: "J&T Express",
      price: 8000,
      estimated: "2-3 Hari",
      type: "Reguler",
      typeColor: "bg-orange-100 text-orange-700",
      available: true,
    },
    {
      value: "sicepat_best",
      name: "SiCepat BEST",
      price: 12000,
      estimated: "1-2 Hari",
      type: "Best",
      typeColor: "bg-purple-100 text-purple-700",
      available: true,
    },
    {
      value: "gosend_instant",
      name: "GoSend Instant",
      price: 25000,
      estimated: "Hari ini",
      type: "Instant",
      typeColor: "bg-green-100 text-green-700",
      available: true,
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base">Pilih Pengiriman</CardTitle>
        <div className="flex items-center gap-1 text-xs text-green-600">
          <Shield className="w-3.5 h-3.5" />
          <span>Garansi Pengiriman</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <RadioGroup value={selectedShipping?.courier} onValueChange={(value) => {
          const selected = shippingOptions.find(opt => opt.value === value);
          if (selected) {
            onSelectShipping({
              courier: selected.value,
              name: selected.name,
              price: selected.price,
              estimated: selected.estimated,
              type: selected.type,
            });
          }
        }} className="space-y-2">
          {shippingOptions.map((option) => (
            <Label
              key={option.value}
              htmlFor={option.value}
              className={`border rounded-lg p-3 hover:border-green-500 transition-colors cursor-pointer block ${
                selectedShipping?.courier === option.value ? "border-green-500 bg-green-50" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className="mt-1"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {option.name}
                      </span>
                      <span className={`px-1.5 py-0.5 text-xs rounded ${option.typeColor}`}>
                        {option.type}
                      </span>
                    </div>
                    <span className="font-semibold text-sm">{formatPrice(option.price)}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Estimasi tiba {option.estimated}</span>
                    </div>
                    {option.available && (
                      <span className="text-green-600 font-medium">Tersedia</span>
                    )}
                  </div>
                </div>
              </div>
            </Label>
          ))}
        </RadioGroup>

        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-gray-50 p-2 rounded-lg">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <p>
            Estimasi pengiriman dihitung dari waktu penjual memproses pesanan. Waktu pengiriman dapat berubah tergantung kondisi lapangan.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ShippingOptions
