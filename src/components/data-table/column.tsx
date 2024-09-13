"use client";

import { ColumnDef } from "@tanstack/react-table";

// import { labels, priorities, statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { IOrder } from "@/models/Order";
import { paymentStatuses, statuses } from "@/components/data-table/data/data";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import LucideIcon from "@/components/lucide-icon";

export const columns: ColumnDef<IOrder>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value.toUpperCase() === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <Badge
          variant="outline"
          className={`${status.classes} font-semibold flex items-center gap-1 w-fit`}
        >
          <LucideIcon name={status.icon} size={16} />
          {status.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes((row.getValue(id) as string).toLowerCase());
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => {
      const paymentStatus = paymentStatuses.find(
        (paymentStatus) =>
          paymentStatus.value === row.getValue("paymentStatus"),
      );

      if (!paymentStatus) {
        return null;
      }

      return (
        <Badge
          variant="outline"
          className={`${paymentStatus.classes} font-semibold flex items-center gap-1 w-fit`}
        >
          <LucideIcon name={paymentStatus.icon} size={16} />
          {paymentStatus.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(String(row.getValue(id) as boolean));
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ cell }) => {
      return formatDate(new Date((cell.getValue() as number) * 1000));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
