import { Badge } from "@/components/ui/badge";

const ProductStatusBadge = ({ status }) => {
  const labelMap = {
    active: "Aktif",
    inactive: "Nonaktif",
  };

  const classMap = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-200 text-gray-600",
  };

  return (
    <Badge className={`text-xs px-2 py-1 ${classMap[status]}`}>
      {labelMap[status]}
    </Badge>
  );
};

export default ProductStatusBadge;
