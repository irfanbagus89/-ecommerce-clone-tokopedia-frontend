import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Edit2, ChevronRight, Shield } from "lucide-react"

const AddressCard = ({ selectedAddress, onSelectAddress }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">Alamat Pengiriman</CardTitle>
          {selectedAddress?.isPrimary && (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Utama
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
          <Edit2 className="w-4 h-4 mr-1" />
          Ubah
        </Button>
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
              {selectedAddress?.address || "Silakan pilih alamat pengiriman"}
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
          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0 h-auto">
            Pilih Alamat Lain
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-blue-50 p-2 rounded-lg">
          <Shield className="w-3.5 h-3.5 text-blue-600" />
          <span>Alamat Anda aman & terenkripsi</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default AddressCard
