"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props} />
  );
}

// Custom: Background transparan, lebar full, dan ada border abu-abu di bawah
function TabsList({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex w-full items-center justify-start border-b border-gray-200 bg-transparent p-0",
        className
      )}
      {...props} />
  );
}

// Custom: Style underline hijau saat aktif, font bold
function TabsTrigger({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Base styles
        "relative flex items-center justify-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-bold text-gray-500 transition-all",
        "hover:text-gray-700",
        // Focus styles
        "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        // Active State Styles (Border bawah hijau & Text hijau)
        "data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-600 data-[state=active]:shadow-none",
        className
      )}
      {...props} />
  );
}

function TabsContent({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("mt-2 ring-offset-background focus-visible:outline-none", className)}
      {...props} />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent }