const { Button } = require("@/components/ui/button");
const { Card, CardHeader, CardTitle, CardContent } = require("@/components/ui/card");
const { Switch } = require("@radix-ui/react-switch");

const NotificationTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifikasi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Pesanan Baru</span>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <span>Chat Masuk</span>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <span>Pesanan Dibatalkan</span>
          <Switch />
        </div>

        <Button className="bg-[#03AC0E] hover:bg-green-700">
          Simpan Preferensi
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationTab