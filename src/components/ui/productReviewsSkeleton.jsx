import { Skeleton } from "@/components/ui/skeleton";

const ProductReviewsSkeleton = () => {
  return (
    <section className="py-2">
      <Skeleton className="h-6 w-48 mb-6" />

      <div className="rounded-xl border p-6 mb-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="space-y-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="flex-1 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-3 w-full rounded-full" />
                <Skeleton className="h-4 w-4" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3 hidden lg:block space-y-6">
          <div>
            <Skeleton className="h-5 w-24 mb-4" />
            <Skeleton className="h-4 w-40" />
          </div>

          <div>
            <Skeleton className="h-5 w-24 mb-4" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-24 mb-3" />
            ))}
          </div>

          <div>
            <Skeleton className="h-5 w-32 mb-4" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-40 mb-3" />
            ))}
          </div>
        </div>

        <div className="lg:col-span-9 space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-9 w-40 rounded-md" />
          </div>

          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-b pb-6 space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>

              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>

              <Skeleton className="h-4 w-40" />

              <Skeleton className="h-4 w-3/4" />

              <Skeleton className="h-20 w-20 rounded-md" />

              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductReviewsSkeleton;
