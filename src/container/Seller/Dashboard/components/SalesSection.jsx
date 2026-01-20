import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SalesChart from "./SalesChart";

const SalesSection = ({ period, setPeriod, chartData }) => {
  return (
    <div className="grid grid-cols-1">
      <Card className="xl:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Grafik Penjualan</CardTitle>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant={period === "7days" ? "default" : "outline"}
              className={
                period === "7days"
                  ? "bg-[#03AC0E] hover:bg-green-700"
                  : ""
              }
              onClick={() => setPeriod("7days")}
            >
              7 Hari
            </Button>

            <Button
              size="sm"
              variant={period === "30days" ? "default" : "outline"}
              className={
                period === "30days"
                  ? "bg-[#03AC0E] hover:bg-green-700"
                  : ""
              }
              onClick={() => setPeriod("30days")}
            >
              30 Hari
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <SalesChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesSection;