import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ProfileTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil Toko</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm">Nama Toko</label>
          <Input placeholder="Nama toko" />
        </div>

        <div>
          <label className="text-sm">Deskripsi</label>
          <Textarea placeholder="Deskripsi toko" />
        </div>

        <div>
          <label className="text-sm">Logo Toko</label>
          <Input type="file" />
        </div>

        <Button className="bg-[#03AC0E] hover:bg-green-700">
          Simpan Perubahan
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileTab