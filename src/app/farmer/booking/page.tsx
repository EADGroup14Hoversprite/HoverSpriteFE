"use client";

import { useForm } from "react-hook-form";
import { orderSchema, OrderType } from "@/schema";
import { CropType } from "@/types/crop-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentType } from "@/types/payment";
import { useCalendarStore } from "@/store/calendar-store";
import React from "react";
import BookingComponent from "@/app/farmer/booking/_component/BookingComponent";

export default function Page() {
  const { initialState } = useCalendarStore();
  const defaultValues: OrderType = {
    farmerName: "",
    farmerPhoneNumber: "",
    farmlandArea: 0,
    cropType: CropType.FRUIT,
    desiredDate: initialState.startDate,
    farmerEmailAddress: "",
    timeSlot: undefined,
    location: {
      latitude: 0,
      longitude: 0,
    },
    address: "",
    paymentMethod: PaymentType.CASH,
  };

  const bookingForm = useForm<OrderType>({
    defaultValues,
    resolver: zodResolver(orderSchema),
    mode: "onChange",
  });

  return (
    <div className="m-auto max-w-7xl p-4 gap-4 h-full flex justify-center items-start flex-col w-full">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Farmer Booking</h2>
          <p className="text-muted-foreground">Make your orders with 3 steps</p>
        </div>
      </div>

      <BookingComponent methods={bookingForm} />
    </div>
  );
}
