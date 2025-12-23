import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type = "text",
  leftIcon,
  rightIcon,
  error, // ← error message
  ...props
}) {
  return (
    <div className="w-full">
      <div
        className={cn(
          "relative flex items-center w-full rounded-md border bg-transparent px-3 py-1 text-base transition-colors",
          error
            ? "border-red-500 focus-within:ring-1 focus-within:ring-red-200"
            : "border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200",
          "dark:bg-input/30 dark:border-gray-600",
          className
        )}
      >
        {leftIcon && (
          <span className="absolute left-3 flex items-center justify-center">
            {leftIcon}
          </span>
        )}

        <input
          type={type}
          data-slot="input"
          aria-invalid={!!error}
          className={cn(
            "w-full bg-transparent outline-none placeholder:text-muted-foreground",
            "selection:bg-primary selection:text-primary-foreground",
            leftIcon ? "pl-9" : "pl-2",
            rightIcon ? "pr-9" : "pr-2",
            "h-9 text-base md:text-sm disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          )}
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-3 flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export { Input };
