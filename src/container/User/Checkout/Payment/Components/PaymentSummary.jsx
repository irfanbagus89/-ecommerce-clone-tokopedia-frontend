import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const SummaryRow = ({ label, value, minus, bold }) => {
  return (
    <div
      className={`flex justify-between ${
        bold ? "font-semibold text-base" : "text-sm"
      }`}
    >
      <span>{label}</span>
      <span className={minus ? "text-red-500" : ""}>
        {value}
      </span>
    </div>
  )
}

const PaymentSummary = () => {
  return (
    <Card className="lg:sticky lg:top-6">
      <CardHeader>
        <CardTitle>Ringkasan Pembayaran</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <SummaryRow label="Total Harga" value="Rp899.000" />
        <SummaryRow label="Diskon Barang" value="-Rp410.000" minus />
        <SummaryRow label="Promo" value="-Rp10.000" minus />
        <SummaryRow label="Ongkir" value="Rp42.000" />
        <SummaryRow label="Asuransi" value="Rp3.200" />

        <Separator className="my-3" />

        <SummaryRow
          label="Total Tagihan"
          value="Rp525.200"
          bold
        />

        <Button
          size="lg"
          className="w-full mt-4 bg-green-600 hover:bg-green-700"
        >
          Bayar Sekarang
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-2">
          Dengan melanjutkan, kamu menyetujui syarat & ketentuan
        </p>
      </CardContent>
    </Card>
  )
}

export default PaymentSummary
