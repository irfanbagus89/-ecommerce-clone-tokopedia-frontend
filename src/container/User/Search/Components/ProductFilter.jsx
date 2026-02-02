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

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Filter</h2>

      <div className="space-y-2">
        <h3 className="font-medium">Jenis toko</h3>
        {productsMeta?.store_type?.map((store) => (
          <div key={store.id} className="flex items-center gap-2">
            <Checkbox
              checked={filters.storeTypes.includes(store.id)}
              onCheckedChange={() => toggleStoreType(store.id)}
            />
            <label>{store.name}</label>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Lokasi</h3>
        {productsMeta?.locations?.map((city) => (
          <div key={city} className="flex items-center gap-2">
            <Checkbox
              checked={filters.locations.includes(city)}
              onCheckedChange={() => toggleLocation(city)}
            />
            <label>{city}</label>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Harga</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Rp Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <Input
            placeholder="Rp Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
