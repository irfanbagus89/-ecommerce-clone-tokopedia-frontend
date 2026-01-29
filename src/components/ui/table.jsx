"use client";

import * as React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

function Table({ className, ...props }) {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className={cn("w-full text-sm", className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }) {
  return <thead className={cn("[&_tr]:border-b", className)} {...props} />;
}

function TableBody({ className, ...props }) {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  );
}

function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn("hover:bg-muted/50 border-b transition-colors", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }) {
  return (
    <th
      className={cn(
        "h-10 px-2 text-left font-medium whitespace-nowrap",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }) {
  return (
    <td
      className={cn("p-2 align-middle whitespace-nowrap", className)}
      {...props}
    />
  );
}

function CustomTable({ columns, data }) {
  const [sortKey, setSortKey] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState("asc");

  function handleSort(col) {
    if (!col.sortable) return;

    if (sortKey === col.key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(col.key);
      setSortOrder("asc");
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === "string")
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      if (typeof aVal === "number")
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;

      return 0;
    });
  }, [data, sortKey, sortOrder]);

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => {
              const isActive = sortKey === col.key;

              return (
                <TableHead
                  key={col.key}
                  onClick={() => handleSort(col)}
                  className={
                    col.sortable ? "cursor-pointer hover:text-[#03AC0E]" : ""
                  }
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable &&
                      isActive &&
                      (sortOrder === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      ))}
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedData.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {col.render ? col.render(row) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  CustomTable,
};
