"use client";
import { BookingCalendar } from "@/components/booking-calendar";
import CustomerForm from "@/app/receptionist/_components/CustomerForm";
import { orderSchema, OrderType } from "@/schema";
import { CropType } from "@/types/crop-type";
import { useCalendarStore } from "@/store/calendar-store";
import { PaymentType } from "@/types/payment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { getOrderRange } from "@/actions/order";
import { transformBookings } from "@/hooks/useDateMatrix";
import { addDays } from "date-fns";
import { IOrder } from "@/models/Order";

export default function Page() {
  const { initialState } = useCalendarStore();

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const defaultState: OrderType = {
    address: "",
    cropType: CropType.FRUIT,
    desiredDate: initialState.startDate,
    farmerId: "",
    farmlandArea: 0,
    location: {
      latitude: 0,
      longitude: 0,
    },
    paymentMethod: PaymentType.CASH,
    timeSlot: null,
  };

  const bookingForm = useForm<OrderType>({
    defaultValues: defaultState,
    resolver: zodResolver(orderSchema),
    reValidateMode: "onChange",
  });

  const endDate = addDays(initialState.startDate, 7);

  useEffect(() => {
    setIsLoading(true);
    getOrderRange(
      initialState.startDate.getTime() / 1000,
      endDate.getTime() / 1000,
    ).then((res) => {
      const slotMap = transformBookings(res.orders);
      setOrders(res.orders);
      setIsLoading(false);
    });
  }, [initialState.startDate]);
  return (
    <div className="m-auto max-w-7xl p-5 gap-4 h-full flex items-start flex-col w-full">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Booking</h2>
          <p className="text-muted-foreground">Book a slot for your customer</p>
        </div>
      </div>
      <BookingCalendar
        bookingForm={bookingForm}
        orders={orders}
        isLoading={isLoading}
      >
        <CustomerForm></CustomerForm>
      </BookingCalendar>{" "}
    </div>
  );
}
