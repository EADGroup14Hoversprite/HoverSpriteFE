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
import { crops, toCropString } from "@/types/crop-type";

interface CropSelectionProps {
  bookingForm: UseFormReturn<OrderType>;
}
export function CropSelection({ bookingForm }: CropSelectionProps) {
  return (
    <FormField
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="">Crop Type</FormLabel>
          <FormControl>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {toCropString(crop)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
      control={bookingForm.control}
      name="cropType"
    />
  );
}
