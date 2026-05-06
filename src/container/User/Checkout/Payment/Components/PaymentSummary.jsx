import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Shield,
  Lock,
  CheckCircle,
  Info,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { usePaymentMethods } from "@/services/User/Payments/paymentActions";
import { CustomSelect } from "@/components/ui/select";
import formatRupiah from "@/lib/utils/formatters";

const SummaryRow = ({ label, value, minus, bold, loading }) => (
  <div className={`flex justify-between ${bold ? "font-semibold text-base" : "text-sm"}`}>
    <span>{label}</span>
    {loading ? (
      <span className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
    ) : (
      <span className={minus ? "text-red-500" : ""}>{value}</span>
    )}
  </div>
);

const PaymentSummary = ({
  summary,
  isLoadingPreview,
  selectedPayment,
  onSelectPayment,
  agreeTerms,
  onAgreeTermsChange,
  onPayment,
  isProcessing,
}) => {
  const { data: methods } = usePaymentMethods();


  const totalSavings = (summary?.item_discount ?? 0) + (summary?.voucher_discount ?? 0);

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
        <div className="space-y-2">
          <SummaryRow
            label={`Harga Produk (${summary?.items_count ?? 0} barang)`}
            value={formatRupiah(summary?.original_price ?? 0)}
            loading={isLoadingPreview}
          />
          {(summary?.item_discount ?? 0) > 0 && (
            <>
              <SummaryRow
                label="Diskon Produk"
                value={formatRupiah(-(summary.item_discount))}
                minus
                loading={isLoadingPreview}
              />
              <SummaryRow
                label="Harga Produk Diskon"
                value={formatRupiah(summary.subtotal ?? 0)}
                loading={isLoadingPreview}
              />
            </>
          )}
          {(summary?.voucher_discount ?? 0) > 0 && (
            <SummaryRow
              label="Diskon Voucher"
              value={formatRupiah(-(summary.voucher_discount))}
              minus
              loading={isLoadingPreview}
            />
          )}
          <SummaryRow
            label="Ongkos Kirim"
            value={formatRupiah(summary?.shipping_cost ?? 0)}
            loading={isLoadingPreview}
          />
          {(summary?.service_fee ?? 0) > 0 && (
            <SummaryRow
              label="Biaya Layanan"
              value={formatRupiah(summary.service_fee)}
              loading={isLoadingPreview}
            />
          )}
          {(summary?.insurance_fee ?? 0) > 0 && (
            <SummaryRow
              label="Asuransi Pengiriman"
              value={formatRupiah(summary.insurance_fee)}
              loading={isLoadingPreview}
            />
          )}
        </div>

        <Separator className="my-3" />
        <div className="bg-green-50 rounded-lg p-3 space-y-2">
          <SummaryRow
            label="Total Tagihan"
            value={formatRupiah(summary?.total ?? 0)}
            bold
            loading={isLoadingPreview}
          />
          {totalSavings > 0 && (
            <div className="flex items-center gap-2 text-xs text-green-700">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Hemat {formatRupiah(totalSavings)} dari pembelian ini</span>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Metode Pembayaran</span>
          </div>
          <CustomSelect
            placeholder="Pilih metode pembayaran..."
            value={selectedPayment ?? ""}
            onValueChange={onSelectPayment}
            options={methods?.map((m) => ({ value: m.code, label: m.name })) || []}
            className="w-full bg-gray-50"
          />
        </div>
        <div className="flex items-start gap-3 space-x-0">
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={onAgreeTermsChange}
            className="mt-0.5"
          />
          <div className="flex-1 space-y-1">
            <Label
              htmlFor="terms"
              className="text-sm font-normal cursor-pointer leading-snug"
            >
              Saya menyetujui Syarat & Ketentuan serta Kebijakan Privasi
            </Label>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Informasi Anda aman & terenkripsi</span>
            </div>
          </div>
        </div>
        <Button
          size="lg"
          className="w-full mt-2 bg-green-600 hover:bg-green-700 font-semibold"
          disabled={!agreeTerms || isProcessing || isLoadingPreview}
          onClick={onPayment}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Memproses...
            </>
          ) : (
            "Buat Pesanan"
          )}
        </Button>
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

        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-blue-50 p-2 rounded-lg">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-600" />
          <p>
            Pesanan akan diproses setelah pembayaran berhasil. Estimasi
            pengiriman 2-3 hari kerja.
          </p>
        </div>

        <Button
          variant="ghost"
          className="w-full text-sm text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          Butuh Bantuan?
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;
