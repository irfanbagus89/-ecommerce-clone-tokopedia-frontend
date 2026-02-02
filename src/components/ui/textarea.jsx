import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({
  className,
  error,
  maxLength,
  showCount = true,
  ...props
}) {
  const [count, setCount] = React.useState(
    props.value ? String(props.value).length : 0
  );

  return (
    <div className="w-full">
      <div className="relative">
        <textarea
          data-slot="textarea"
          aria-invalid={!!error}
          maxLength={maxLength}
          className={cn(
            "w-full min-h-16 rounded-md border bg-white px-3 py-2 pb-6 text-base outline-none transition-colors md:text-sm",
            error
              ? "border-red-500 focus:ring-1 focus:ring-red-200"
              : "border-gray-300 hover:border-[#03AC0E] focus:border-[#03AC0E] focus:ring-1 focus:ring-[#03AC0E]/20",
            "placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 text-gray-800",
            className
          )}
          {...props}
          onChange={(e) => {
            setCount(e.target.value.length);
            props.onChange?.(e);
          }}
        />

        {maxLength && showCount && (
          <span className="pointer-events-none absolute bottom-1.5 right-2 text-xs text-gray-400">
            {count} / {maxLength}
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

export { Textarea };
