import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EditableInput } from "./EditableField";

const BankTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rekening Bank</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <EditableInput
          placeholder="Nama Bank"
          defaultValue="Bank Central Asia (BCA)"
        />
        <EditableInput placeholder="Nomor Rekening" defaultValue="1234567890" />
        <EditableInput
          placeholder="Nama Pemilik Rekening"
          defaultValue="Budi Santoso"
        />

        <Button className="bg-[#03AC0E] hover:bg-green-700">
          Simpan Rekening
        </Button>
      </CardContent>
    </Card>
  );
};

export default BankTab;
