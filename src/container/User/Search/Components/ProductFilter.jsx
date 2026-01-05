import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

const ProductFilter = () =>{
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Filter</h2>

      {/* Jenis Toko */}
      <div className="space-y-2">
        <h3 className="font-medium">Jenis toko</h3>
        <div className="flex items-center gap-2">
          <Checkbox id="mall" />
          <label htmlFor="mall">Mall</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="power" />
          <label htmlFor="power">Power Shop</label>
        </div>
      </div>

      {/* Lokasi */}
      <div className="space-y-2">
        <h3 className="font-medium">Lokasi</h3>
        {["DKI Jakarta", "Jabodetabek", "Bandung", "Surabaya"].map(
          (city) => (
            <div key={city} className="flex items-center gap-2">
              <Checkbox id={city} />
              <label htmlFor={city}>{city}</label>
            </div>
          )
        )}
      </div>

      {/* Harga */}
      <div className="space-y-2">
        <h3 className="font-medium">Harga</h3>
        <div className="flex gap-2">
          <Input placeholder="Rp Min" />
          <Input placeholder="Rp Max" />
        </div>
      </div>

    </div>
  )
}

export default ProductFilter