import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ticket, Gift, Percent, Calendar, ChevronRight, Check } from "lucide-react"
import { useState } from "react"

const VoucherCard = ({ selectedVoucher, onSelectVoucher, onApplyVoucher, onRemoveVoucher }) => {
  const [voucherCode, setVoucherCode] = useState("")

  const availableVouchers = [
    {
      id: 1,
      code: "HEMAT10",
      title: "Diskon 10%",
      description: "Minimal belanja Rp50.000",
      discount: -10000,
      maxDiscount: "Rp20.000",
      expiry: "28 Feb 2026",
      type: "percentage",
      color: "green"
    },
    {
      id: 2,
      code: "GRATISONGKIR",
      title: "Gratis Ongkir",
      description: "Maksimal potongan Rp10.000",
      discount: -10000,
      maxDiscount: "Rp10.000",
      expiry: "15 Feb 2026",
      type: "shipping",
      color: "blue"
    },
    {
      id: 3,
      code: "CASHBACK5",
      title: "Cashback 5%",
      description: "Maksimal cashback Rp15.000",
      discount: -5000,
      maxDiscount: "Rp15.000",
      expiry: "10 Mar 2026",
      type: "cashback",
      color: "orange"
    }
  ]

  const handleApplyVoucherClick = () => {
    if (voucherCode.trim()) {
      onApplyVoucher(voucherCode)
      setVoucherCode("")
    }
  }

  const handleSelectVoucher = (voucher) => {
    onSelectVoucher(voucher)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">Voucher & Promo</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {availableVouchers.length} Tersedia
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Input Voucher */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Masukkan kode voucher"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={handleApplyVoucherClick}
            className="bg-green-600 hover:bg-green-700"
          >
            Pakai
          </Button>
        </div>

        {/* Applied Voucher */}
        {selectedVoucher && (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <div>
                <p className="font-medium text-sm text-green-800">{selectedVoucher.code}</p>
                <p className="text-xs text-green-600">Berhasil digunakan</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemoveVoucher}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Hapus
            </Button>
          </div>
        )}

        {/* Available Vouchers */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Voucher Tersedia</p>
          {availableVouchers.map((voucher) => (
            <div
              key={voucher.id}
              className={`border rounded-lg p-3 hover:border-green-500 transition-colors cursor-pointer ${
                selectedVoucher?.code === voucher.code ? 'border-green-500 bg-green-50' : ''
              }`}
              onClick={() => handleSelectVoucher(voucher)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  voucher.color === 'green' ? 'bg-green-100' :
                  voucher.color === 'blue' ? 'bg-blue-100' :
                  'bg-orange-100'
                }`}>
                  {voucher.type === 'percentage' ? (
                    <Percent className={`w-5 h-5 ${
                      voucher.color === 'green' ? 'text-green-600' :
                      voucher.color === 'blue' ? 'text-blue-600' :
                      'text-orange-600'
                    }`} />
                  ) : voucher.type === 'shipping' ? (
                    <Gift className={`w-5 h-5 ${
                      voucher.color === 'green' ? 'text-green-600' :
                      voucher.color === 'blue' ? 'text-blue-600' :
                      'text-orange-600'
                    }`} />
                  ) : (
                    <Ticket className={`w-5 h-5 ${
                      voucher.color === 'green' ? 'text-green-600' :
                      voucher.color === 'blue' ? 'text-blue-600' :
                      'text-orange-600'
                    }`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{voucher.title}</p>
                    <span className="font-semibold text-sm text-green-600">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0
                      }).format(Math.abs(voucher.discount))}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{voucher.description}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>Berakhir {voucher.expiry}</span>
                    </div>
                    {selectedVoucher?.code === voucher.code && (
                      <Badge className="bg-green-600 text-xs">
                        <Check className="w-3 h-3 mr-1" />
                        Dipakai
                      </Badge>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full text-sm">
          Lihat Semua Voucher
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default VoucherCard
