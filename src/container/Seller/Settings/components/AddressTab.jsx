import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EditableInput } from "./EditableField";

const AddressTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alamat Toko</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <EditableInput
          placeholder="Alamat lengkap"
          defaultValue="Jl. Kebon Jeruk No. 123"
        />
        <EditableInput placeholder="Kota" defaultValue="Jakarta Barat" />
        <EditableInput placeholder="Kode pos" defaultValue="11530" />

        <Button className="bg-[#03AC0E] hover:bg-green-700">
          Simpan Alamat
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddressTab;
