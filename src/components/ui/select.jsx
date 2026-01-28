"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Select({ ...props }) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({ className, size = "default", children, ...props }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-gray-300 bg-white text-gray-800 hover:border-[#03AC0E] focus-visible:border-[#03AC0E] focus-visible:ring-[#03AC0E]/20 data-placeholder:text-gray-400 flex w-fit items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm shadow-sm transition outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 text-gray-500" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        align={align}
        className={cn(
          "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-md " +
            "data-[state=open]:animate-in data-[state=closed]:animate-out " +
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 " +
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 " +
            "relative z-50 max-h-(--radix-select-content-available-height) " +
            "min-w-32 origin-(--radix-select-content-transform-origin) " +
            "overflow-x-hidden overflow-y-auto",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        {...props}
      >
        <SelectScrollUpButton />

        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width) scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>

        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "mb-1 focus:bg-[#EAFBEA] focus:text-[#03AC0E] data-[state=checked]:bg-[#EAFBEA] data-[state=checked]:text-[#03AC0E] relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm select-none data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-[#03AC0E]" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

function CustomSelect({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select option",
  options = [],
  disabled = false,
  className,
  position='popper',
}) {
  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent position={position}>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  CustomSelect,
};
