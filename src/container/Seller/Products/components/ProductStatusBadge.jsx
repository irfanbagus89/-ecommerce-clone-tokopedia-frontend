const ProductStatusBadge = ({ status }) => {
  const labelMap = {
    active: "Aktif",
    inactive: "Nonaktif",
  };

  const colorMap = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-200 text-gray-600",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded ${colorMap[status]}`}>
      {labelMap[status]}
    </span>
  );
};

export default ProductStatusBadge;
