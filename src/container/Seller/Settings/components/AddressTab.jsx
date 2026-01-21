const { Button } = require("@/components/ui/button");
const { Card, CardHeader, CardTitle, CardContent } = require("@/components/ui/card");
const { Input } = require("@/components/ui/input");

const AddressTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alamat Toko</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Alamat lengkap" />
        <Input placeholder="Kota" />
        <Input placeholder="Kode pos" />

        <Button className="bg-[#03AC0E] hover:bg-green-700">
          Simpan Alamat
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddressTab