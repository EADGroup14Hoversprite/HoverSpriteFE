"use client";

import { Row } from "@tanstack/react-table";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IOrderSchema } from "@/models/Order";
import { ListCollapse, ScanEye, SquarePen } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { getLunarDate } from "@/hooks/useDateMatrix";
import { paymentStatuses, statuses } from "@/components/data-table/data/data";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SpraySlot, toSlotString } from "@/models/Booking";
import { PaymentType, toPaymentString } from "@/types/payment";
import FeedbackForm from "@/app/[role]/(farmer)/orders/_component/feedback/FeedbackForm";
import FeedbackOverview from "@/app/[role]/(farmer)/orders/_component/feedback/FeedbackOverview";
import { getFeedback } from "@/actions/feedback";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const order = IOrderSchema.parse(row.original);
  const paymentStatus = paymentStatuses.find(
    (paymentStatus) => paymentStatus.value === order.paymentStatus,
  );

  const status = statuses.find(
    (status) => status.value === order.status.toLowerCase(),
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="flex p-0 px-2 data-[state=open]:bg-muted gap-2"
          >
            <ListCollapse className="h-4 w-4" />
            <span>View Detail</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Order #{order.id}</SheetTitle>
            <SheetDescription>
              <div>
                Created at: {new Date(order.createdAt * 1000).toDateString()}
              </div>
              <div className="flex items-center justify-between">
                <p>Status:</p>
                <Badge
                  variant="outline"
                  className={`${status?.classes} font-semibold flex items-center gap-1 w-fit`}
                >
                  {status && <status.icon size={16} />}
                  {status?.label}
                </Badge>
              </div>
            </SheetDescription>
            <Separator />
          </SheetHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold mt-2">Order Detail:</p>
              <Separator />
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Crop type:</p>
                  <p className="text-sm capitalize">
                    {order.cropType.toLowerCase()}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Spray area:</p>
                  <p className="text-sm">{order.farmlandArea} declare</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Spray slot:</p>
                  <p className="text-sm">
                    {toSlotString(order.timeSlot as SpraySlot)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Gregorian date:</p>
                  <p className="text-sm capitalize">
                    {new Date(order.desiredDate * 1000).toDateString()}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Lunar date:</p>
                  <p className="text-sm capitalize">
                    {getLunarDate(
                      new Date(order.desiredDate * 1000),
                    ).toDateString()}
                  </p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold mt-2">
                Shipping and Payment:
              </p>
              <Separator />
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Address:</p>
                  <p className="text-sm">{order.address}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Payment status:</p>
                  <Badge
                    variant="outline"
                    className={`${paymentStatus?.classes} font-semibold flex items-center gap-1 w-fit`}
                  >
                    {paymentStatus && <paymentStatus.icon size={16} />}
                    {paymentStatus?.label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Payment Method:</p>
                  <p className="text-sm">
                    {toPaymentString(order.paymentMethod as PaymentType)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">Total cost:</p>
                  <p className="text-lg font-semibold">
                    đ {order.totalCost.toLocaleString("en-US")}
                  </p>
                </div>
              </div>
            </div>
            <Separator />

            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold mt-2">Assigned sprayers:</p>
              <Separator />
              <div className="flex flex-col gap-2">
                {status?.value === "assigned" ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Address:</p>
                      <p className="text-sm">{order.address}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Payment status:</p>
                      <Badge
                        variant="outline"
                        className={`${paymentStatus?.classes} font-semibold flex items-center gap-1 w-fit`}
                      >
                        {paymentStatus && <paymentStatus.icon size={16} />}
                        {paymentStatus?.label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold">Total cost:</p>
                      <p className="text-lg font-semibold">
                        đ {order.totalCost.toLocaleString("en-US")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm">We are processing your orders</p>
                )}
              </div>
            </div>
          </div>
          <SheetFooter className="flex-1">
            <SheetClose asChild>
              <Button type="submit" className="self-end">
                Dismiss
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {order.hasFeedback ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              disabled={status?.value !== "completed"}
              className="flex p-0 px-2 data-[state=open]:bg-muted gap-2"
            >
              <>
                <ScanEye className="h-4 w-4" />
                <span>View Feedback</span>
              </>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <DialogHeader>
              <DialogTitle>Order #{order.id}</DialogTitle>
              <DialogDescription>
                Your feedback is recaptured as below
              </DialogDescription>
            </DialogHeader>
            <React.Suspense fallback={<div className="mt-2">Loading...</div>}>
              <FeedbackOverview feedbackPromise={getFeedback(order.id)} />
            </React.Suspense>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              disabled={status?.value !== "completed"}
              className="flex p-0 px-2 data-[state=open]:bg-muted gap-2"
            >
              <>
                <SquarePen className="h-4 w-4" />
                <span>Feedback</span>
              </>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Give feedback to order #{order.id}</DialogTitle>
              <DialogDescription>
                Your feedback is valuable for our future improvement!
              </DialogDescription>
            </DialogHeader>
            <FeedbackForm order={order} setDialogOpen={setDialogOpen} />
          </DialogContent>
        </Dialog>
      )}

      {/*  </TooltipTrigger>*/}
      {/*  <TooltipContent align="start" side="bottom">*/}
      {/*    {status?.value !== "completed"*/}
      {/*      ? "You can only give feedback to completed order!"*/}
      {/*      : ""}*/}
      {/*  </TooltipContent>*/}
      {/*</Tooltip>*/}
    </div>
  );
}
