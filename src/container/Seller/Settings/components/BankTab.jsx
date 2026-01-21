const { Button } = require("@/components/ui/button");
const { Card, CardHeader, CardTitle, CardContent } = require("@/components/ui/card");
const { Input } = require("@/components/ui/input");

const BankTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rekening Bank</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Nama Bank" />
        <Input placeholder="Nomor Rekening" />
        <Input placeholder="Nama Pemilik Rekening" />

        <Button className="bg-[#03AC0E] hover:bg-green-700">
          Simpan Rekening
        </Button>
      </CardContent>
    </Card>
  );
};

export default BankTab