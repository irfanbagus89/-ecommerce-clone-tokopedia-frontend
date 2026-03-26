import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type = "text",
  leftIcon,
  rightIcon,
  error,
  label,
  placeholder,
  value,
  onChange,
  floating = false,
  ...props
}) {
  const showFloating = floating && (label || placeholder);
  const isFilled = value && value !== "";

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative flex items-center w-full rounded-md border bg-white px-3 py-1 transition-colors group",
          error
            ? "border-red-500 focus-within:ring-1 focus-within:ring-red-200"
            : "border-gray-300 hover:border-[#03AC0E] focus-within:border-[#03AC0E] focus-within:ring-1 focus-within:ring-[#03AC0E]/20",
          "dark:bg-input/30 dark:border-gray-600",
          className
        )}
      >
        {showFloating && (
          <span
            className={cn(
              "pointer-events-none absolute bg-white px-1 z-10 transition-all duration-200 ease-out",
              leftIcon ? "left-9" : "left-3",
              isFilled || props.autoFocus
                ? "top-0 -translate-y-1/2 text-xs"
                : "top-1/2 -translate-y-1/2 text-sm group-focus-within:top-0 group-focus-within:-translate-y-1/2 group-focus-within:text-xs",
              error
                ? "text-red-500 group-focus-within:text-red-600"
                : isFilled
                ? "text-gray-600 group-focus-within:text-[#03AC0E]"
                : "text-gray-400 group-focus-within:text-[#03AC0E]"
            )}
          >
            {label || placeholder}
          </span>
        )}

        {leftIcon && (
          <span className="absolute left-3 flex items-center justify-center text-gray-400">
            {leftIcon}
          </span>
        )}

        <input
          type={type}
          data-slot="input"
          aria-invalid={!!error}
          value={value}
          onChange={onChange}
          placeholder={floating ? "" : placeholder}
          className={cn(
            "w-full bg-transparent outline-none placeholder:text-gray-400",
            "selection:bg-[#03AC0E] selection:text-white",
            leftIcon ? "pl-9" : "pl-2",
            rightIcon ? "pr-9" : "pr-2",
            "h-9 text-base md:text-sm disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-gray-800"
          )}
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-3 flex items-center justify-center text-gray-400">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export { Input };
