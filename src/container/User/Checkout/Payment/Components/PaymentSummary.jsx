import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Shield, Lock, CheckCircle, Info, ChevronRight } from "lucide-react"
import { useState } from "react"

const SummaryRow = ({ label, value, minus, bold, subLabel }) => {
  return (
    <div className="space-y-0.5">
      <div className={`flex justify-between ${bold ? "font-semibold text-base" : "text-sm"}`}>
        <span>{label}</span>
        <span className={minus ? "text-red-500" : ""}>
          {value}
        </span>
      </div>
      {subLabel && (
        <p className="text-xs text-muted-foreground">{subLabel}</p>
      )}
    </div>
  )
}

const PaymentSummary = () => {
  const [agreeTerms, setAgreeTerms] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <Card className="lg:sticky lg:top-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base">Ringkasan Pembayaran</CardTitle>
        <div className="flex items-center gap-1 text-xs text-green-600">
          <Shield className="w-3.5 h-3.5" />
          <span>Transaksi Aman</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Price Breakdown */}
        <div className="space-y-2">
          <SummaryRow
            label="Total Harga (3 barang)"
            value={formatPrice(1378000)}
            subLabel="Rp899.000 + Rp479.000"
          />
          <SummaryRow
            label="Diskon Barang"
            value={formatPrice(-410000)}
            minus
            subLabel="Hemat 47% & 28%"
          />
          <SummaryRow
            label="Voucher"
            value={formatPrice(-10000)}
            minus
            subLabel="HEMAT10"
          />
          <SummaryRow
            label="Ongkos Kirim"
            value={formatPrice(17000)}
            subLabel="JNE Regular + J&T Express"
          />
          <SummaryRow
            label="Biaya Layanan"
            value={formatPrice(2000)}
            subLabel="Biaya penanganan"
          />
          <SummaryRow
            label="Asuransi Pengiriman"
            value={formatPrice(3200)}
            subLabel="Proteksi barang"
          />
        </div>

        <Separator className="my-3" />

        {/* Total */}
        <div className="bg-green-50 rounded-lg p-3 space-y-2">
          <SummaryRow
            label="Total Tagihan"
            value={formatPrice(979200)}
            bold
          />
          <div className="flex items-center gap-2 text-xs text-green-700">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Hemat Rp410.000 dari pembelian ini</span>
          </div>
        </div>

        {/* Payment Method Info */}
        <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="font-medium">GoPay</span>
          </div>
          <div className="flex items-center gap-1 text-green-600 text-xs">
            <Badge className="bg-green-100 text-green-700">Cashback 2%</Badge>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 space-x-0">
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={setAgreeTerms}
            className="mt-0.5"
          />
          <div className="flex-1 space-y-1">
            <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-snug">
              Saya menyetujui Syarat & Ketentuan serta Kebijakan Privasi
            </Label>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Informasi Anda aman & terenkripsi</span>
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <Button
          size="lg"
          className="w-full mt-2 bg-green-600 hover:bg-green-700 font-semibold"
          disabled={!agreeTerms}
        >
          Bayar Sekarang
        </Button>

        {/* Secure Payment Info */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5 text-green-600" />
            <span>Garansi Uang Kembali</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5 text-green-600" />
            <span>Pembayaran Aman</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-blue-50 p-2 rounded-lg">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-600" />
          <p>
            Pesanan akan diproses setelah pembayaran berhasil. Estimasi pengiriman 2-3 hari kerja.
          </p>
        </div>

        {/* Help Link */}
        <Button variant="ghost" className="w-full text-sm text-green-600 hover:text-green-700 hover:bg-green-50">
          Butuh Bantuan?
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default PaymentSummary
