import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Truck, Clock, Shield, Info, Loader2, MapPin } from "lucide-react";
import formatRupiah from "@/lib/currencyHelper";
import { useShippingCouriers, useShippingCost } from "@/services/User/Shipping/shippingActions";

const ShippingOptions = ({ selectedShipping, onSelectShipping, sellerCityId, destinationCityId }) => {
  const [selectedCourier, setSelectedCourier] = useState(null);

  const { data: couriers = [], isLoading: loadingCouriers } = useShippingCouriers();
  const { data: costData = [], isLoading: loadingCost } = useShippingCost({
    originCityId: sellerCityId,
    destinationCityId,
    courier: selectedCourier,
  });

  // Reset selected shipping when courier changes
  useEffect(() => {
    onSelectShipping(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCourier]);

  const services = costData?.[0]?.services ?? [];

  const handleSelectService = (service) => {
    onSelectShipping({
      courier: selectedCourier,
      courierName: couriers.find((c) => c.code === selectedCourier)?.name ?? selectedCourier,
      service: service.service,
      name: `${couriers.find((c) => c.code === selectedCourier)?.name ?? selectedCourier} ${service.service}`,
      price: service.cost,
      estimated: service.etd ? `${service.etd} hari` : "-",
      description: service.description,
    });
  };

  const canFetchCost = Boolean(sellerCityId && destinationCityId);

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
        {/* Info jika alamat belum dipilih */}
        {!canFetchCost && (
          <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>Pilih alamat pengiriman terlebih dahulu untuk melihat opsi ongkos kirim.</span>
          </div>
        )}

        {/* Pilih kurir */}
        {canFetchCost && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Kurir</p>
            {loadingCouriers ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-1">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memuat daftar kurir...</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {couriers.map((courier) => (
                  <button
                    key={courier.code}
                    onClick={() =>
                      setSelectedCourier((prev) => (prev === courier.code ? null : courier.code))
                    }
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      selectedCourier === courier.code
                        ? "border-green-500 bg-green-50 text-green-700 font-medium"
                        : "border-gray-200 hover:border-green-300 text-gray-700"
                    }`}
                  >
                    {courier.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Layanan dari kurir terpilih */}
        {canFetchCost && selectedCourier && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Layanan</p>
            {loadingCost ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-1">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menghitung ongkos kirim...</span>
              </div>
            ) : services.length === 0 ? (
              <p className="text-sm text-muted-foreground bg-gray-50 rounded-lg p-3">
                Tidak ada layanan tersedia untuk rute ini.
              </p>
            ) : (
              <RadioGroup
                value={selectedShipping?.service ?? ""}
                onValueChange={(value) => {
                  const svc = services.find((s) => s.service === value);
                  if (svc) handleSelectService(svc);
                }}
                className="space-y-2"
              >
                {services.map((svc) => (
                  <Label
                    key={svc.service}
                    htmlFor={`${selectedCourier}-${svc.service}`}
                    className={`border rounded-lg p-3 hover:border-green-500 transition-colors cursor-pointer block ${
                      selectedShipping?.service === svc.service &&
                      selectedShipping?.courier === selectedCourier
                        ? "border-green-500 bg-green-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <RadioGroupItem
                        value={svc.service}
                        id={`${selectedCourier}-${svc.service}`}
                        className="mt-1"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{svc.service}</span>
                            <span className="text-xs text-muted-foreground">{svc.description}</span>
                          </div>
                          <span className="font-semibold text-sm">{formatRupiah(svc.cost)}</span>
                        </div>
                        {svc.etd && (
                          <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>Estimasi tiba {svc.etd} hari</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            )}
          </div>
        )}

        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-gray-50 p-2 rounded-lg">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <p>
            Estimasi pengiriman dihitung dari waktu penjual memproses pesanan. Waktu pengiriman dapat
            berubah tergantung kondisi lapangan.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingOptions;
