"use client";
import { orderSchema, OrderType } from "@/schema";
import { CropType } from "@/types/crop-type";
import { useCalendarStore } from "@/store/calendar-store";
import { PaymentType } from "@/types/payment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { createOrder, getOrderRange } from "@/actions/order";
import { transformBookings } from "@/hooks/useDateMatrix";
import { addDays, addHours, startOfDay } from "date-fns";
import { IOrder } from "@/models/Order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CustomerForm from "@/app/receptionist/_components/CustomerForm";
import {
  AreaInput,
  CropSelection,
  SlotSelection,
} from "@/app/farmer/booking/_component/FormField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { DatePicker } from "@/components/date-picker/DatePicker";
import { Button } from "@/components/ui/button";
import { BookingCalendar } from "@/components/booking-calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Page() {
  const { initialState } = useCalendarStore();

  const router = useRouter();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const defaultState: OrderType = {
    address: "",
    farmerPhoneNumber: "",
    farmerName: "",
    farmerEmailAddress: "",
    cropType: CropType.FRUIT,
    desiredDate: initialState.startDate,
    farmlandArea: 0,
    location: {
      latitude: 0,
      longitude: 0,
    },
    paymentMethod: PaymentType.CASH,
    timeSlot: undefined,
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

  const submitOrder = async (order: OrderType) => {
    const onCreatingOrder = createOrder({
      ...order,
      desiredDate: addHours(startOfDay(order.desiredDate), 7),
    });

    toast.promise(onCreatingOrder, {
      loading: "Creating order...",
      success: async () => {
        router.push("/receptionist/dashboard");
        router.refresh();
        return `Order has been created successfully.`;
      },
      error: () => {
        return "Failed to create order";
      },
    });
  };
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
        showBookingDialog={setShowDialog}
      ></BookingCalendar>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogTitle>Book an order</DialogTitle>
          <DialogDescription>
            Help your customer to book a slot!
          </DialogDescription>
          <div className="mt-3">
            <CustomerForm bookingForm={bookingForm} />
            <div>
              <Form {...bookingForm}>
                <form className="flex flex-col gap-3">
                  <FormField
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-1">
                        <FormLabel>Desire date</FormLabel>
                        <FormControl>
                          <DatePicker
                            date={field.value}
                            setDate={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                    name="desiredDate"
                    control={bookingForm.control}
                  />
                  <SlotSelection bookingForm={bookingForm} isDisabled={false} />
                  <CropSelection bookingForm={bookingForm} />
                  <AreaInput bookingForm={bookingForm} />
                  <Button onClick={() => submitOrder(bookingForm.getValues())}>
                    Create
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
