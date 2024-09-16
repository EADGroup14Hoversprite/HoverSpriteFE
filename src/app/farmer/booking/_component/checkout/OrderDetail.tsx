import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UseFormReturn } from "react-hook-form";
import { OrderType } from "@/schema";
import {
  AreaInput,
  CropSelection,
  SlotSelection,
} from "@/app/farmer/booking/_component/FormField";

interface OrderDetailProps {
  bookingForm: UseFormReturn<OrderType>;
}

export function OrderDetail({ bookingForm }: OrderDetailProps) {
  return (
    <AccordionItem value="item-3">
      <AccordionTrigger className="text-2xl font-semibold pt-0 pb-4">
        Order details
      </AccordionTrigger>
      <AccordionContent className="space-y-4 p-2">
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <AreaInput bookingForm={bookingForm} />
          <CropSelection bookingForm={bookingForm} />
          <div className="flex flex-col gap-2">
            <Label htmlFor="desireDate">Desire date</Label>
            <Input
              value={bookingForm.getValues("desiredDate").toDateString()}
              id="desireDate"
              disabled
            />
          </div>
          <SlotSelection bookingForm={bookingForm} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
