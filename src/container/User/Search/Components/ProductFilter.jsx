import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const ProductFilter = ({
  filters,
  setFilters,
  setSize,
  productsMeta,
  minPrice,
  maxPrice,
  setMaxPrice,
  setMinPrice,
}) => {
  const toggleStoreType = (id) => {
    setSize(1);
    setFilters((prev) => {
      const exists = prev.storeTypes.includes(id);
      return {
        ...prev,
        storeTypes: exists
          ? prev.storeTypes.filter((x) => x !== id)
          : [...prev.storeTypes, id],
      };
    });
  };

  const toggleLocation = (city) => {
    setSize(1);
    setFilters((prev) => {
      const exists = prev.locations.includes(city);
      return {
        ...prev,
        locations: exists
          ? prev.locations.filter((x) => x !== city)
          : [...prev.locations, city],
      };
    });
  };
  console.log(productsMeta, "product");
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-semibold">Filter</h2>
        <span className="text-xs sm:text-sm text-gray-500">
          {productsMeta?.totalResult || 0} produk
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm sm:text-base font-medium">Jenis toko</h3>
        <div className="space-y-1.5">
          {productsMeta?.store_type?.map((store) => (
            <div key={store.id} className="flex items-center gap-2 sm:gap-3">
              <Checkbox
                checked={filters.storeTypes.includes(store.id)}
                onCheckedChange={() => toggleStoreType(store.id)}
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              <label className="text-sm sm:text-base cursor-pointer">
                {store.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm sm:text-base font-medium">Lokasi</h3>
        <div className="space-y-1.5">
          {productsMeta?.locations?.map((city) => (
            <div key={city} className="flex items-center gap-2 sm:gap-3">
              <Checkbox
                checked={filters.locations.includes(city)}
                onCheckedChange={() => toggleLocation(city)}
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              <label className="text-sm sm:text-base cursor-pointer">
                {city}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm sm:text-base font-medium">Harga</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Rp Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="text-sm"
          />

          <Input
            placeholder="Rp Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
