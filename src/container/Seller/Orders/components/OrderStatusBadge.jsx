const OrderStatusBadge = ({ status }) => {
  const statusMap = {
    pending: "Menunggu Pembayaran",
    processing: "Diproses",
    shipped: "Dikirim",
    completed: "Selesai",
    cancelled: "Dibatalkan",
  };

  const colorMap = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded ${colorMap[status]}`}>
      {statusMap[status]}
    </span>
  );
};

export default OrderStatusBadge;
