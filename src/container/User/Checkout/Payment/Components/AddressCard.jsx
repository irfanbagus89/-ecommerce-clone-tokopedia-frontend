import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const AddressCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Alamat Pengiriman</CardTitle>
        <Button variant="ghost" size="sm">
          Ubah
        </Button>
      </CardHeader>

      <CardContent className="text-sm space-y-1">
        <p className="font-medium">Rumah - Irfan Bagus</p>
        <p className="text-muted-foreground">
          Tambak Asri Gang 32, Kec. Krembangan
        </p>
      </CardContent>
    </Card>
  )
}

export default AddressCard
