import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ticket, Gift, Percent, Calendar, ChevronRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAvailableVouchers } from "@/services/User/Vouchers/getAvailableVouchers";
import formatRupiah from "@/lib/utils/formatters";

const typeIcon = (type) => {
  if (type === "percentage") return Percent;
  if (type === "free_shipping") return Gift;
  return Ticket;
};

const VoucherCard = ({ selectedVoucher, onApplyVoucher, onRemoveVoucher, subtotal }) => {
  const [voucherCode, setVoucherCode] = useState("");
  const [isApplying, setIsApplying] = useState(null);

  const { data: availableVouchers = [], isLoading } = useAvailableVouchers(subtotal);

  const handleApplyInput = async () => {
    const code = voucherCode.trim();
    if (!code) return;
    setIsApplying(code);
    await onApplyVoucher(code);
    setVoucherCode("");
    setIsApplying(null);
  };

  const handleApplyFromList = async (code) => {
    setIsApplying(code);
    await onApplyVoucher(code);
    setIsApplying(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">Voucher & Promo</CardTitle>
          {availableVouchers.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {availableVouchers.length} Tersedia
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Masukkan kode voucher"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApplyInput()}
              className="pl-10"
            />
          </div>
          <Button
            onClick={handleApplyInput}
            disabled={!voucherCode.trim() || isApplying !== null}
            className="bg-green-600 hover:bg-green-700"
          >
            {isApplying === voucherCode.trim() ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Pakai"
            )}
          </Button>
        </div>
        {selectedVoucher && (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <div>
                <p className="font-medium text-sm text-green-800">{selectedVoucher.code}</p>
                <p className="text-xs text-green-600">Voucher berhasil digunakan</p>
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
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Memuat voucher...</span>
          </div>
        ) : availableVouchers.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium">Voucher Tersedia</p>
            {availableVouchers.map((voucher) => {
              const Icon = typeIcon(voucher.type);
              const isSelected = selectedVoucher?.code === voucher.code;
              const isThisApplying = isApplying === voucher.code;

              return (
                <div
                  key={voucher.id}
                  className={`border rounded-lg p-3 transition-colors ${
                    !voucher.eligible
                      ? "opacity-50 cursor-not-allowed"
                      : isSelected
                      ? "border-green-500 bg-green-50"
                      : "hover:border-green-400 cursor-pointer"
                  }`}
                  onClick={() => voucher.eligible && !isSelected && handleApplyFromList(voucher.code)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{voucher.code}</p>
                        {voucher.estimated_discount > 0 && (
                          <span className="font-semibold text-sm text-green-600">
                            -{formatRupiah(voucher.estimated_discount)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {voucher.type === "percentage"
                          ? `Diskon ${voucher.value}%${voucher.max_discount ? `, maks. ${formatRupiah(voucher.max_discount)}` : ""}`
                          : voucher.type === "free_shipping"
                          ? `Gratis ongkir hingga ${formatRupiah(voucher.value)}`
                          : `Potongan ${formatRupiah(voucher.value)}`}
                        {voucher.min_purchase > 0 && ` · Min. ${formatRupiah(voucher.min_purchase)}`}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        {voucher.valid_until && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>
                              Berakhir{" "}
                              {new Date(voucher.valid_until).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                        {!voucher.eligible && (
                          <span className="text-xs text-red-500">
                            Min. belanja {formatRupiah(voucher.min_purchase)}
                          </span>
                        )}
                        {isSelected && (
                          <Badge className="bg-green-600 text-xs">
                            <Check className="w-3 h-3 mr-1" />
                            Dipakai
                          </Badge>
                        )}
                      </div>
                    </div>
                    {isThisApplying ? (
                      <Loader2 className="w-4 h-4 text-muted-foreground shrink-0 mt-1 animate-spin" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default VoucherCard;
