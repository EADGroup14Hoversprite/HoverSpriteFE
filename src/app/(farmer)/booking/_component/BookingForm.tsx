import { UseFormReturn } from "react-hook-form";
import { OrderType } from "@/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { getCrops } from "@/lib/crop-list";
import { AreaList, CropList } from "@/app/(farmer)/booking/_component";
import { getAreaList } from "@/lib/area-list";
import { Input } from "@/components/ui/input";

const crops = getCrops();
const areaList = getAreaList();

interface BookingFormProps {
  bookingForm: UseFormReturn<OrderType>;
}

export default function BookingForm({ bookingForm }: BookingFormProps) {
  const areaValue = bookingForm.watch("area");
  return (
    <Form {...bookingForm}>
      <form className="w-full space-y-4">
        <FormField
          name="cropType"
          control={bookingForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crop Type</FormLabel>
              <FormDescription>
                Choose the type of crop you want to spay
              </FormDescription>
              <FormControl>
                <CropList
                  crops={crops}
                  onCropChange={field.onChange}
                  defaultCrop={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="area"
          control={bookingForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area (declare)</FormLabel>
              <FormDescription>
                Specify spray area you want to spay
              </FormDescription>
              <FormControl>
                <div>
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
                  <AreaList
                    areaList={areaList}
                    onAreaChange={(val) => field.onChange(Number(val))}
                    defaultArea={areaValue.toString()}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
