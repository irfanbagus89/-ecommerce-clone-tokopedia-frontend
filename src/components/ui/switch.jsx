"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors outline-none",
        "bg-gray-300 data-[state=checked]:bg-[#03AC0E]",
        "focus-visible:ring-2 focus-visible:ring-[#03AC0E]/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
          "translate-x-0.5 data-[state=checked]:translate-x-[18px]"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
