import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Breadcrumb */}
      <div className="mb-6 flex gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
        {/* Gallery */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-16 w-16 rounded-md"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 space-y-4">
          <Skeleton className="h-6 w-3/4" /> {/* Title */}
          <Skeleton className="h-4 w-32" /> {/* Sold + rating */}

          <div className="space-y-2">
            <Skeleton className="h-8 w-40" /> {/* Price */}
            <Skeleton className="h-4 w-24" /> {/* Discount */}
          </div>

          {/* Variant */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-9 w-36 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>

        {/* Purchase Card */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 space-y-4 rounded-xl border p-4">
            <Skeleton className="h-10 w-full" /> {/* Qty */}
            <Skeleton className="h-6 w-32" /> {/* Stock */}
            <Skeleton className="h-12 w-full rounded-lg" /> {/* Add to cart */}
            <Skeleton className="h-12 w-full rounded-lg" /> {/* Buy now */}
            <div className="flex gap-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
