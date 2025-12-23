'use client'

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

function ProductCardSkeleton({ className }) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col overflow-hidden border-none shadow-sm pt-0!",
        className
      )}
    >
      <Skeleton className="aspect-square w-full rounded-none h-full" />

      <CardContent className="flex flex-1 flex-col justify-between gap-2 p-3">
        <div>
          <div className="mb-2 space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>

          <div className="space-y-1">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>

        <div className="mt-2 space-y-2">
          <div className="flex gap-2">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-16" />
          </div>

          <Skeleton className="h-3 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCardSkeleton
