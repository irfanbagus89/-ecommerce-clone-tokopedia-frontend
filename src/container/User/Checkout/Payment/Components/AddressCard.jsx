import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Phone, Edit2, ChevronRight, Shield } from "lucide-react";

const getFullAddress = (address) => {
  if (!address) return "";

  return [
    address.address,
    address.kelurahan || address.kelurahan_name,
    address.kecamatan || address.kecamatan_name,
    address.city || address.city_name,
    address.province || address.province_name,
    address.postal_code,
  ]
    .filter(Boolean)
    .join(", ");
};

const AddressOption = ({ address, isSelected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(address)}
    className={`w-full rounded-lg border p-3 text-left transition-colors ${
      isSelected
        ? "border-green-600 bg-green-50"
        : "border-gray-200 hover:border-green-300 hover:bg-green-50/40"
    }`}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-sm text-gray-900">
            {address.label || "Alamat"}
          </p>
          {address.is_default && (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded-full">
              Utama
            </span>
          )}
        </div>
        <p className="text-sm text-gray-700">{address.recipient_name}</p>
        <p className="text-xs text-muted-foreground">{address.phone || "-"}</p>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {getFullAddress(address)}
        </p>
      </div>
      <span
        className={`mt-1 h-4 w-4 rounded-full border ${
          isSelected ? "border-green-600 bg-green-600" : "border-gray-300"
        }`}
      />
    </div>
  </button>
);

const AddressCard = ({
  selectedAddress,
  addresses = [],
  isLoading,
  onSelectAddress,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const hasAddresses = addresses.length > 0;
  const fullAddress = getFullAddress(selectedAddress);
  const handleSelectAddress = (address) => {
    onSelectAddress(address);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">Alamat Pengiriman</CardTitle>
          {(selectedAddress?.is_default || selectedAddress?.isPrimary) && (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Utama
            </span>
          )}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
              disabled={isLoading || !hasAddresses}
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Ubah
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[560px]">
            <DialogHeader>
              <DialogTitle>Pilih Alamat Pengiriman</DialogTitle>
              <DialogDescription>
                Gunakan alamat yang sudah tersimpan di akunmu.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
              {addresses.map((address) => (
                <AddressOption
                  key={address.id}
                  address={address}
                  isSelected={address.id === selectedAddress?.id}
                  onSelect={handleSelectAddress}
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex gap-3">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
            <div className="w-full h-full bg-linear-to-br from-green-100 to-green-200 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{selectedAddress?.label || "Pilih Alamat"}</p>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {fullAddress || "Silakan pilih alamat pengiriman"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Phone className="w-3.5 h-3.5" />
            <span>{selectedAddress?.phone || "-"}</span>
          </div>
        </div>

        <div className="pt-2 border-t">
          {hasAddresses ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0 h-auto"
              onClick={() => setIsDialogOpen(true)}
            >
              Pilih Alamat Lain
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0 h-auto"
            >
              <Link href="/account">
                Tambah Alamat
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-blue-50 p-2 rounded-lg">
          <Shield className="w-3.5 h-3.5 text-blue-600" />
          <span>Alamat Anda aman & terenkripsi</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
