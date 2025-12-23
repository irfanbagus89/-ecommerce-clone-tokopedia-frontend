import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Files, Handbag, Laptop, Phone, Plane, Store } from "lucide-react";

const categories = [
  { name: "Official Store", icon: <Store /> },
  { name: "Top-Up", icon: <Phone /> },
  { name: "Travel", icon: <Plane /> },
  { name: "Fashion", icon: <Handbag /> },
  { name: "Electronics", icon: <Laptop /> },
  { name: "All Categories", icon: <Files /> },
];

const CategorySection = () => {
  return (
    <Card className={"grid grid-cols-6 gap-4 p-4 text-gray-500 my-4"}>
      {categories.map((cat) => (
        <CardContent
          key={cat.name}
          className="flex flex-col items-center justify-center p-4"
        >
          <div className="">{cat.icon}</div>

          <CardTitle className={"mt-2 text-sm font-medium"}>
            {cat.name}
          </CardTitle>
        </CardContent>
      ))}
    </Card>
  );
};

export default CategorySection;
