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
import { slots, toSlotString } from "@/models/Booking";

interface SlotSelectionProps {
  bookingForm: UseFormReturn<OrderType>;
}
export function SlotSelection({ bookingForm }: SlotSelectionProps) {
  return (
    <FormField
      render={({ field }) => (
        <FormItem>
          <FormLabel>Time Slot</FormLabel>
          <FormControl>
            <Select
              defaultValue={field.value}
              onValueChange={field.onChange}
              disabled
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {slots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {toSlotString(slot)}
                  </SelectItem>
                ))}
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
