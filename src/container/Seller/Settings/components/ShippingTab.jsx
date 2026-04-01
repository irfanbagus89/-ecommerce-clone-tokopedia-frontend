import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EditableSwitch } from "./EditableField";

const ShippingTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Pengiriman</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>JNE</span>
          <EditableSwitch defaultChecked={true} />
        </div>
        <div className="flex items-center justify-between">
          <span>J&T</span>
          <EditableSwitch defaultChecked={true} />
        </div>
        <div className="flex items-center justify-between">
          <span>SiCepat</span>
          <EditableSwitch defaultChecked={false} />
        </div>

        <Button className="bg-[#03AC0E] hover:bg-green-700">
          Simpan Pengaturan
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShippingTab;
