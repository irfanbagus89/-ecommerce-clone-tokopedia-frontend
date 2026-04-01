import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditableInput, EditableTextarea } from "./EditableField";

const ProfileTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil Toko</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm">Nama Toko</label>
          <EditableInput
            placeholder="Nama toko"
            defaultValue="Toko Serba Ada"
          />
        </div>

        <div>
          <label className="text-sm">Deskripsi</label>
          <EditableTextarea
            placeholder="Deskripsi toko"
            defaultValue="Menjual berbagai macam kebutuhan"
          />
        </div>

        <div>
          <label className="text-sm">Logo Toko</label>
          <EditableInput type="file" />
        </div>

        <Button className="bg-[#03AC0E] hover:bg-green-700">
          Simpan Perubahan
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;
