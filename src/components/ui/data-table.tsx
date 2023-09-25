"use client";

import * as React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

import { filterParamsBody, queryParamOptions } from "@/types/api";

import {
  DEFAULT_FIRST_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  queryParamDefault,
} from "@/config/defaults";
import { useQuery } from "@tanstack/react-query";
import { searchEntities } from "@/client-api/utils";
import { columnDefMapper } from "@/config/column-defs";

export interface DataTableProps<TData, TValue> {
  entity: keyof typeof columnDefMapper;
  queryParams?: queryParamOptions;
  filterParams?: filterParamsBody;
  //** base path for the action button to navigate to */
  baseDetailsPath: string;
  hideActionColumn?: boolean;
}

export function DataTable<TData, TValue>({
  baseDetailsPath,
  entity,
  queryParams = queryParamDefault,
  filterParams = {},
  hideActionColumn = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageSize: DEFAULT_PAGE_SIZE,
    pageIndex: DEFAULT_FIRST_PAGE_INDEX,
  });

  const { data, refetch } = useQuery({
    queryKey: [`search${entity}`],
    queryFn: () =>
      searchEntities(
        entity as string,
        {
          sorts: queryParams.sorts,
          expand: queryParams.expand,
          page: pagination.pageIndex + 1,
          size: pagination.pageSize,
        },
        filterParams
      ),
  });

  const table = useReactTable({
    columns: columnDefMapper[entity],
    data: data ? data.data.data : [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination,
    },
    manualPagination: true,
    pageCount: data ? data.data.total_pages : -1,
    onPaginationChange: setPagination,
  });

  React.useEffect(() => {
    refetch();
  }, [pagination]);

  return (
    <div className="space-y-3">
      <DataTableViewOptions table={table}></DataTableViewOptions>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
                {!hideActionColumn && (
                  <TableHead key={headerGroup.id + "-action"}>Action</TableHead>
                )}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  {!hideActionColumn && (
                    <TableCell key={`${row.id}-action`}>
                      <Link href={`${baseDetailsPath}/${row.getValue("id")}`}>
                        <ArrowRightCircle className="hover:text-primary/90"></ArrowRightCircle>
                      </Link>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.options.columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table}></DataTablePagination>
    </div>
  );
}