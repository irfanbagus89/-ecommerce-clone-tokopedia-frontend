import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Truck, Clock, Shield, Info } from "lucide-react"

const ShippingOptions = () => {
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
        <RadioGroup defaultValue="jne_reg" className="space-y-2">
          {/* JNE Regular */}
          <Label htmlFor="jne_reg" className="border rounded-lg p-3 hover:border-green-500 transition-colors cursor-pointer block">
            <div className="flex items-start gap-3">
              <RadioGroupItem value="jne_reg" id="jne_reg" className="mt-1" onClick={(e) => e.stopPropagation()} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      JNE Regular
                    </span>
                    <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                      Reguler
                    </span>
                  </div>
                  <span className="font-semibold text-sm">Rp9.000</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Estimasi tiba 2-3 Hari</span>
                  </div>
                  <span className="text-green-600 font-medium">Tersedia</span>
                </div>
              </div>
            </div>
          </Label>

          {/* JNE YES */}
          <Label htmlFor="jne_yes" className="border rounded-lg p-3 hover:border-green-500 transition-colors cursor-pointer block">
            <div className="flex items-start gap-3">
              <RadioGroupItem value="jne_yes" id="jne_yes" className="mt-1" onClick={(e) => e.stopPropagation()} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      JNE YES
                    </span>
                    <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                      Cepat
                    </span>
                  </div>
                  <span className="font-semibold text-sm">Rp18.000</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Estimasi tiba Besok</span>
                  </div>
                  <span className="text-green-600 font-medium">Tersedia</span>
                </div>
              </div>
            </div>
          </Label>

          {/* J&T Express */}
          <Label htmlFor="jnt_reg" className="border rounded-lg p-3 hover:border-green-500 transition-colors cursor-pointer block">
            <div className="flex items-start gap-3">
              <RadioGroupItem value="jnt_reg" id="jnt_reg" className="mt-1" onClick={(e) => e.stopPropagation()} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      J&T Express
                    </span>
                    <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                      Reguler
                    </span>
                  </div>
                  <span className="font-semibold text-sm">Rp8.000</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Estimasi tiba 2-3 Hari</span>
                  </div>
                  <span className="text-green-600 font-medium">Tersedia</span>
                </div>
              </div>
            </div>
          </Label>

          {/* SiCepat */}
          <Label htmlFor="sicepat_best" className="border rounded-lg p-3 hover:border-green-500 transition-colors cursor-pointer block">
            <div className="flex items-start gap-3">
              <RadioGroupItem value="sicepat_best" id="sicepat_best" className="mt-1" onClick={(e) => e.stopPropagation()} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      SiCepat BEST
                    </span>
                    <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                      Best
                    </span>
                  </div>
                  <span className="font-semibold text-sm">Rp12.000</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Estimasi tiba 1-2 Hari</span>
                  </div>
                  <span className="text-green-600 font-medium">Tersedia</span>
                </div>
              </div>
            </div>
          </Label>

          {/* GoSend Instant */}
          <Label htmlFor="gosend_instant" className="border rounded-lg p-3 hover:border-green-500 transition-colors cursor-pointer block">
            <div className="flex items-start gap-3">
              <RadioGroupItem value="gosend_instant" id="gosend_instant" className="mt-1" onClick={(e) => e.stopPropagation()} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      GoSend Instant
                    </span>
                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                      Instant
                    </span>
                  </div>
                  <span className="font-semibold text-sm">Rp25.000</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Estimasi tiba Hari ini</span>
                  </div>
                  <span className="text-green-600 font-medium">Tersedia</span>
                </div>
              </div>
            </div>
          </Label>
        </RadioGroup>

        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-gray-50 p-2 rounded-lg">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <p>
            Estimasi pengiriman dihitung dari waktu penjual memproses pesanan. Waktu pengiriman dapat berubah tergantung kondisi lapangan.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ShippingOptions
