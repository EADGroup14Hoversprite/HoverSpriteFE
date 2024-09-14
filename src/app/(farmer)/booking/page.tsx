"use client";

import { useForm } from "react-hook-form";
import { orderSchema, OrderType } from "@/schema";
import { CropType } from "@/types/crop-type";
import { SpraySlot } from "@/models/Booking";
import { zodResolver } from "@hookform/resolvers/zod";
import BookingComponent from "@/app/(farmer)/booking/_component/BookingComponent";
import { PaymentType } from "@/types/payment";

export default function Page() {
  const defaultValues: OrderType = {
    farmerId: "",
    farmlandArea: 0,
    cropType: CropType.FRUIT,
    desiredDate: new Date(),
    timeSlot: SpraySlot.SLOT_4,
    location: {
      latitude: 0,
      longitude: 0,
    },
    address: "Nha cua trung ne",
    paymentMethod: PaymentType.CASH,
  };

  const bookingForm = useForm<OrderType>({
    defaultValues,
    resolver: zodResolver(orderSchema),
    mode: "onChange",
  });

  return (
    <div className="m-auto max-w-7xl p-4 gap-4 h-full flex justify-center items-start flex-col w-full">
      {/*<BookingForm bookingForm={bookingForm} />*/}
      {/*<div className="w-full space-y-2">*/}
      {/*  <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">*/}
      {/*    Spaying slot*/}
      {/*  </Label>*/}
      {/*  <p className="text-sm text-muted-foreground">*/}
      {/*    Select a time slot you want us to spray*/}
      {/*  </p>*/}
      {/*  <BookingCalendar*/}
      {/*    bookingForm={*/}
      {/*      <div>*/}
      {/*        <Form {...bookingForm}>*/}
      {/*          <form action="">*/}
      {/*            <FormField*/}
      {/*              name="date"*/}
      {/*              control={bookingForm.control}*/}
      {/*              render={({ field }) => <FormItem></FormItem>}*/}
      {/*            />*/}
      {/*          </form>*/}
      {/*        </Form>*/}
      {/*      </div>*/}
      {/*    }*/}
      {/*  ></BookingCalendar>*/}
      {/*</div>*/}

      <BookingComponent methods={bookingForm} />
    </div>
  );
}
