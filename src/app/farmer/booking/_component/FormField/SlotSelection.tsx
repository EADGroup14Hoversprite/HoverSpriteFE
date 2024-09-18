import { UseFormReturn } from "react-hook-form";
import { OrderType } from "@/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { slots, SpraySlot, toSlotNum, toSlotString } from "@/models/Booking";
import { useEffect, useState } from "react";
import { getOrderByDate } from "@/actions/order";
import { addHours } from "date-fns";
import { transformBookings } from "@/hooks/useDateMatrix";

interface SlotSelectionProps {
  bookingForm: UseFormReturn<OrderType>;
  isDisabled: boolean;
}
export function SlotSelection({
  bookingForm,
  isDisabled = true,
}: SlotSelectionProps) {
  const [availableSlots, setAvailableSlots] = useState<SpraySlot[]>(slots);
  const desiredDate = bookingForm.watch("desiredDate");
  useEffect(() => {
    console.log(desiredDate);
    const getBookingsByDate = async () => {
      const res = await getOrderByDate(desiredDate);
      const slotMap = transformBookings(res.orders);
      const dateTimes = res.orders.map((order) => {
        return addHours(
          order.desiredDate,
          toSlotNum(order.timeSlot as SpraySlot),
        ).getTime();
      });
      const occupiedDateTime = dateTimes.filter(
        (dateTime) => slotMap.get(dateTime) === 2,
      );
      const filteredSlots =
        res.orders.length > 0
          ? slots.filter(
              (slot) =>
                !occupiedDateTime.some(
                  (occupiedDate) =>
                    new Date(occupiedDate * 1000).getHours() ===
                    toSlotNum(slot),
                ),
            )
          : slots;
      if (desiredDate.getTime() > new Date().getTime()) {
        return filteredSlots;
      } else {
        return filteredSlots.filter(
          (slot) => toSlotNum(slot) > new Date().getHours(),
        );
      }
    };
    getBookingsByDate().then((res) => {
      setAvailableSlots(res);
    });
  }, [desiredDate]);

  return (
    <FormField
      render={({ field }) => (
        <FormItem>
          <FormLabel>Time Slot</FormLabel>
          <FormControl>
            <Select
              defaultValue={field.value}
              onValueChange={field.onChange}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {toSlotString(slot)}
                    </SelectItem>
                  ))
                ) : (
                  <p>No slots available</p>
                )}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
      control={bookingForm.control}
      name="timeSlot"
    />
  );
}
