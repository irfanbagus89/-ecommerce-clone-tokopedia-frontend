import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const PaymentMethod = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Metode Pembayaran</CardTitle>
      </CardHeader>

      <CardContent>
        <RadioGroup defaultValue="gopay" className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gopay" id="gopay" />
            <Label htmlFor="gopay">GoPay</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bca" id="bca" />
            <Label htmlFor="bca">BCA Virtual Account</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mandiri" id="mandiri"/>
            <Label htmlFor="mandiri">Mandiri Virtual Account</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

export default PaymentMethod
