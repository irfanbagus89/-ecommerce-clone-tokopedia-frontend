import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Wallet, CreditCard, Building2, Truck, Info, ChevronRight, Percent, Shield } from "lucide-react"

const PaymentMethod = ({ selectedPayment, onSelectPayment, showInstallment, onToggleInstallment, selectedInstallment, onSelectInstallment }) => {
  const ewalletOptions = [
    {
      value: "gopay",
      name: "GoPay",
      badge: "Cashback 2%",
      badgeColor: "bg-green-600",
      balance: "Rp500.000",
    },
    {
      value: "ovo",
      name: "OVO",
      badge: "Diskon 5rb",
      badgeColor: "bg-purple-600",
      balance: "Rp250.000",
    },
    {
      value: "dana",
      name: "DANA",
      badge: null,
      badgeColor: null,
      balance: "Rp100.000",
    },
    {
      value: "shopeepay",
      name: "ShopeePay",
      badge: "Gratis Ongkir",
      badgeColor: "bg-orange-500",
      balance: "Rp75.000",
    },
  ];

  const bankOptions = [
    {
      value: "bca_va",
      name: "BCA Virtual Account",
      description: "Bayar lewat ATM, m-BCA, atau internet banking",
    },
    {
      value: "mandiri_va",
      name: "Mandiri Virtual Account",
      description: "Bayar lewat ATM, Mandiri Online, atau Livin by Mandiri",
    },
    {
      value: "bri_va",
      name: "BRI Virtual Account",
      description: "Bayar lewat ATM, BRI Mobile, atau internet banking",
    },
    {
      value: "bni_va",
      name: "BNI Virtual Account",
      description: "Bayar lewat ATM, BNI Mobile, atau internet banking",
    },
  ];

  const installmentOptions = [
    {
      value: "installment_3",
      label: "Cicilan 3 Bulan",
      interest: "0% Bunga",
      interestColor: "text-green-600",
    },
    {
      value: "installment_6",
      label: "Cicilan 6 Bulan",
      interest: "0% Bunga",
      interestColor: "text-green-600",
    },
    {
      value: "installment_12",
      label: "Cicilan 12 Bulan",
      interest: "0.95% / bulan",
      interestColor: "text-orange-600",
    },
  ];

  return (
    <Card className="lg:sticky lg:top-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base">Metode Pembayaran</CardTitle>
        <div className="flex items-center gap-1 text-xs text-green-600">
          <Shield className="w-3.5 h-3.5" />
          <span>Pembayaran Aman</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <RadioGroup value={selectedPayment} onValueChange={onSelectPayment} className="space-y-3">

          {/* E-Wallet Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Wallet className="w-4 h-4" />
              <span>Dompet Digital</span>
            </div>

            {ewalletOptions.map((option) => (
              <Label
                key={option.value}
                htmlFor={option.value}
                className={`border rounded-lg p-3 hover:border-green-500 transition-colors cursor-pointer block ${
                  selectedPayment === option.value ? "border-green-500 bg-green-50" : ""
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
                        {option.badge && (
                          <Badge className={`${option.badgeColor} text-xs`}>{option.badge}</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Saldo: {option.balance}
                    </p>
                  </div>
                </div>
              </Label>
            ))}
          </div>

          <Separator />

          {/* Bank Transfer Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Building2 className="w-4 h-4" />
              <span>Transfer Bank & Virtual Account</span>
            </div>

            {bankOptions.map((option) => (
              <Label
                key={option.value}
                htmlFor={option.value}
                className={`border rounded-lg p-3 hover:border-green-500 transition-colors cursor-pointer block ${
                  selectedPayment === option.value ? "border-green-500 bg-green-50" : ""
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
                    <span className="font-semibold text-sm">
                      {option.name}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              </Label>
            ))}
          </div>

          <Separator />

          {/* Credit Card Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                <span>Kartu Kredit / Debit</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleInstallment(!showInstallment)}
                className="text-green-600 hover:text-green-700 p-0 h-auto text-xs"
              >
                {showInstallment ? 'Sembunyikan' : 'Cicilan'}
                <ChevronRight className={`w-3 h-3 ml-0.5 transition-transform ${showInstallment ? 'rotate-90' : ''}`} />
              </Button>
            </div>

            {/* Credit Card Input */}
            <div className={`border rounded-lg p-3 hover:border-green-500 transition-colors ${
              selectedPayment === "credit_card" ? "border-green-500 bg-green-50" : ""
            }`}>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="credit_card" id="credit_card" className="mt-1" />
                  <Label htmlFor="credit_card" className="font-semibold text-sm cursor-pointer">
                    Kartu Kredit / Debit
                  </Label>
                </div>

                <div className="pl-6 space-y-2">
                  <Input
                    placeholder="Nomor Kartu"
                    className="text-sm"
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="MM/YY"
                      className="text-sm flex-1"
                    />
                    <Input
                      placeholder="CVV"
                      className="text-sm flex-1"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-6">
                  <Percent className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">Dapatkan cashback hingga 5%</span>
                </div>
              </div>
            </div>

            {/* Installment Options */}
            {showInstallment && (
              <div className="space-y-2 pl-2">
                <div className="text-xs text-muted-foreground mb-2">Pilih tenor cicilan:</div>

                {installmentOptions.map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className={`border rounded-lg p-2 hover:border-green-500 transition-colors cursor-pointer block ${
                      selectedInstallment === option.value ? "border-green-500 bg-green-50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span>{option.label}</span>
                      </div>
                      <span className={`font-medium ${option.interestColor}`}>{option.interest}</span>
                    </div>
                  </Label>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* COD Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Truck className="w-4 h-4" />
              <span>Bayar di Tempat (COD)</span>
            </div>

            <Label
              htmlFor="cod"
              className={`border rounded-lg p-3 hover:border-green-500 transition-colors cursor-pointer block ${
                selectedPayment === "cod" ? "border-green-500 bg-green-50" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <RadioGroupItem
                  value="cod"
                  id="cod"
                  className="mt-1"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <span className="font-semibold text-sm">
                    Cash on Delivery
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Bayar tunai saat pesanan sampai di lokasi Anda
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-blue-100 text-blue-700 text-xs">Tersedia</Badge>
                    <span className="text-xs text-muted-foreground">Biaya layanan: Rp2.000</span>
                  </div>
                </div>
              </div>
            </Label>
          </div>

        </RadioGroup>

        {/* Payment Info */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-gray-50 p-2 rounded-lg">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <p>
            Pembayaran Anda aman dan terenkripsi. Kami tidak menyimpan informasi kartu kredit Anda.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentMethod
