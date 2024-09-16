import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { OrderType } from "@/schema";

interface AreaInputProps {
  bookingForm: UseFormReturn<OrderType>;
}

export function AreaInput({ bookingForm }: AreaInputProps) {
  return (
    <FormField
      name="farmlandArea"
      control={bookingForm.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Area (declare)</FormLabel>
          <FormControl>
            <Input
              value={field.value.toString()}
              onChange={(event) => {
                const value = event.target.value;

                // Allow empty string (for backspace/delete operations)
                if (value === "") {
                  field.onChange("");
                  return;
                }

                // Check if the value is a valid number
                const numberValue = Number(value);
                if (!isNaN(numberValue)) {
                  field.onChange(numberValue);
                }
              }}
              id="area-val"
              placeholder="Your area"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
