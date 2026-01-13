import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const ProductCard = () => {
  return (
    <Card>
      <CardContent className="flex gap-4 py-4">
        <Image
          src="https://picsum.photos/seed/1/600/600"
          width={96}
          height={96}
          alt="Produk"
          className="rounded-lg border"
        />

        <div className="flex-1 space-y-1">
          <p className="font-medium leading-snug">
            Kursi Kantor Minimalis
          </p>

          <div className="flex items-center gap-2 text-sm">
            <span className="line-through text-muted-foreground">
              Rp899.000
            </span>
            <span className="text-red-500 font-semibold">
              47% OFF
            </span>
          </div>

          <p className="text-lg font-semibold">
            Rp479.000
          </p>

          <p className="text-xs text-muted-foreground">
            Ongkir: Rp42.000
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
