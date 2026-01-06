import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProductCartSkeleton = () => {
  return (
    <>
      {/* Title */}
      <Skeleton className="h-7 w-32 mb-4" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {[1, 2].map((seller) => (
            <Card key={seller}>
              <CardContent className="p-4 space-y-4">
                {/* Seller */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-sm" />
                  <Skeleton className="h-4 w-40" />
                </div>

                <Skeleton className="h-px w-full" />

                {/* Item */}
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <Skeleton className="h-4 w-4 rounded-sm" />

                    {/* Image */}
                    <Skeleton className="h-16 w-16 rounded-md" />

                    {/* Info */}
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-4 w-24" />

                      <div className="flex gap-2">
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>

                    {/* Qty */}
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-9 w-9" />
                      <Skeleton className="h-6 w-6" />
                      <Skeleton className="h-9 w-9" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* RIGHT: Summary */}
        <Card className="h-fit">
          <CardHeader>
            <Skeleton className="h-5 w-40" />
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>

            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-11 w-full rounded-md" />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductCartSkeleton;
