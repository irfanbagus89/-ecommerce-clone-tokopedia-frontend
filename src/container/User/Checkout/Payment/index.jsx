import AddressCard from "./Components/AddressCard";
import PaymentMethod from "./Components/PaymentMethod";
import PaymentSummary from "./Components/PaymentSummary";
import ProductCard from "./Components/ProductCard";

const PaymentPage = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <AddressCard />
          <ProductCard />
        </div>

        <div className="space-y-4 gap-4 flex flex-col justify-end lg:justify-start">
          <div className="order-2 lg:order-1">
            <PaymentSummary />
          </div>

          <div className="order-1 lg:order-2">
            <PaymentMethod />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
