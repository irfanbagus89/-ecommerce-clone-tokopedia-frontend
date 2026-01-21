const { Button } = require("@/components/ui/button");
const { Card, CardHeader, CardTitle, CardContent } = require("@/components/ui/card");
const { Switch } = require("@radix-ui/react-switch");

const ShippingTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Pengiriman</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>JNE</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span>J&T</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span>SiCepat</span>
          <Switch />
        </div>

        <Button className="bg-[#03AC0E] hover:bg-green-700">
          Simpan Pengaturan
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShippingTab