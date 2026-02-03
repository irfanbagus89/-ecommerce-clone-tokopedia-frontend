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
    <Card className={"grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-4 p-2 sm:p-4 text-gray-500 my-2 sm:my-4"}>
      {categories.map((cat) => (
        <CardContent
          key={cat.name}
          className="flex flex-col items-center justify-center p-2 sm:p-4 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div className="text-xl sm:text-2xl">{cat.icon}</div>

          <CardTitle className={"mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-center"}>
            {cat.name}
          </CardTitle>
        </CardContent>
      ))}
    </Card>
  );
};

export default CategorySection;
