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
        <div className="grid gap-2 content-center grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <AreaInput bookingForm={bookingForm} />
          <CropSelection bookingForm={bookingForm} />
          <div>
            <Label htmlFor="desireDate">Desire date</Label>
            <Input
              value={bookingForm.getValues("desiredDate").toDateString()}
              id="desireDate"
              className="mt-2 w-full"
              disabled
            />
          </div>

          <SlotSelection bookingForm={bookingForm} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
