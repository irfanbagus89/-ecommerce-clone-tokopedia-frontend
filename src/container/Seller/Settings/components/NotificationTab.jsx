import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EditableSwitch } from "./EditableField";

const NotificationTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifikasi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Pesanan Baru</span>
          <EditableSwitch defaultChecked={true} />
        </div>

        <div className="flex items-center justify-between">
          <span>Chat Masuk</span>
          <EditableSwitch defaultChecked={true} />
        </div>

        <div className="flex items-center justify-between">
          <span>Pesanan Dibatalkan</span>
          <EditableSwitch defaultChecked={false} />
        </div>

        <Button className="bg-[#03AC0E] hover:bg-green-700">
          Simpan Preferensi
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationTab;
