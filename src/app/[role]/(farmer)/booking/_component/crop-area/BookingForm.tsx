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
import { getAreaList } from "@/lib/area-list";
import { CropList } from "@/app/[role]/(farmer)/booking/_component/crop-area/CropList";
import { AreaInput } from "@/app/[role]/(farmer)/booking/_component/FormField";
import { AreaList } from "@/app/[role]/(farmer)/booking/_component/crop-area/AreaList";

const crops = getCrops();
const areaList = getAreaList();

interface BookingFormProps {
  bookingForm: UseFormReturn<OrderType>;
}

export default function BookingForm({ bookingForm }: BookingFormProps) {
  const areaValue = bookingForm.watch("farmlandArea");
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
        <div className="flex flex-col gap-3">
          <AreaInput bookingForm={bookingForm} />
          <FormField
            name="farmlandArea"
            control={bookingForm.control}
            render={({ field }) => (
              <FormItem>
                <AreaList
                  areaList={areaList}
                  onAreaChange={(val) => field.onChange(Number(val))}
                  defaultArea={areaValue.toString()}
                />
              </FormItem>
            )}
          />
          <p>Specify spray area you want to spay</p>
        </div>
      </form>
    </Form>
  );
}
