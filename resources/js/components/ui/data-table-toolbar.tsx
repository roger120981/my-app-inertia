"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { router } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";

interface FilterConfig<TData> {
  columnId: keyof TData;
  type: "text" | "select" | "custom";
  label?: string;
  options?: { value: string; label: string }[];
  render?: (table: Table<TData>) => React.JSX.Element;
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumn?: string;
  filterPlaceholder?: string;
  filterConfig?: FilterConfig<TData>[];
}

export function DataTableToolbar<TData>({
  table,
  filterColumn,
  filterPlaceholder = "Filter records...",
  filterConfig = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Extraer estados estables
  const filters = table.getState().columnFilters;
  const sorting = table.getState().sorting;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  React.useEffect(() => {
    // Transformar filtros y ordenación a un formato serializable
    const serializedFilters = filters.map((filter) => ({
      id: filter.id,
      value: Array.isArray(filter.value)
        ? filter.value.map(String)
        : String(filter.value),
    }));
    const serializedSorting = sorting.map((sort) => ({
      id: sort.id,
      desc: sort.desc,
    }));

    router.get(
      window.location.pathname,
      {
        filters: serializedFilters,
        sort: serializedSorting,
        page: pageIndex + 1,
        per_page: pageSize,
      },
      { preserveState: true, preserveScroll: true, replace: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sorting, pageIndex, pageSize]);

  // Validar columnas disponibles
  const validColumns = React.useMemo(
    () => table.getAllColumns().map((col) => col.id),
    [table]
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filterColumn && validColumns.includes(filterColumn) && (
          <Input
            placeholder={filterPlaceholder}
            value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(filterColumn)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {filterConfig.map((config) => {
          if (!validColumns.includes(config.columnId as string)) return null;

          if (config.type === "text") {
            return (
              <Input
                key={config.columnId as string}
                placeholder={config.label || `Filtrar ${config.columnId as string}...`}
                value={
                  (table.getColumn(config.columnId as string)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn(config.columnId as string)?.setFilterValue(event.target.value)
                }
                className="h-8 w-[150px] lg:w-[250px]"
              />
            );
          } else if (config.type === "select") {
            return (
              <Select
                key={config.columnId as string}
                value={
                  (table.getColumn(config.columnId as string)?.getFilterValue() as string) ?? ""
                }
                onValueChange={(value) =>
                  table.getColumn(config.columnId as string)?.setFilterValue(value)
                }
              >
                <SelectTrigger className="h-8 w-[150px] lg:w-[250px]">
                  <SelectValue placeholder={config.label || "Todos"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{config.label || "Todos"}</SelectItem>
                  {config.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          } else if (config.type === "custom" && config.render) {
            return <div key={config.columnId as string}>{config.render(table)}</div>;
          }
          return null;
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}