"use client";

import { Row } from "@tanstack/react-table";
import React from "react";
import { Button } from "@/components/ui/button";
import { IOrderSchema } from "@/models/Order";
import { Pencil } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = IOrderSchema.parse(row.original);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {/*<div className="grid gap-4 py-4">*/}
        {/*  <div className="grid grid-cols-4 items-center gap-4">*/}
        {/*    <Label htmlFor="name" className="text-right">*/}
        {/*      Name*/}
        {/*    </Label>*/}
        {/*    <Input id="name" value="Pedro Duarte" className="col-span-3" />*/}
        {/*  </div>*/}
        {/*  <div className="grid grid-cols-4 items-center gap-4">*/}
        {/*    <Label htmlFor="username" className="text-right">*/}
        {/*      Username*/}
        {/*    </Label>*/}
        {/*    <Input id="username" value="@peduarte" className="col-span-3" />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
