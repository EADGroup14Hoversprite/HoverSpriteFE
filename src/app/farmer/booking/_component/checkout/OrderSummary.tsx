import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";
import { OrderType } from "@/schema";
import { toPaymentString } from "@/types/payment";

interface OrderSummaryProps {
  bookingForm: UseFormReturn<OrderType>;
}

export function OrderSummary({ bookingForm }: OrderSummaryProps) {
  return (
    <div className="flex flex-col gap-4 flex-shrink-0 basis-1/3">
      <h2 className="font-semibold text-2xl">Order Summary</h2>
      <Separator className="flex-grow-0" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p>Price per ha:</p>
          <p>đ 30,000</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Total ha:</p>
          <p>{bookingForm.getValues("farmlandArea")}</p>
        </div>
      </div>

      <Separator className="flex-grow-0" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p>Subtotal:</p>
          <p>
            đ{" "}
            {(bookingForm.getValues("farmlandArea") * 30000).toLocaleString(
              "en-US",
            )}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>Shipping:</p>
          <p>đ 0</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Taxes:</p>
          <p>đ 0</p>
        </div>
      </div>

      <Separator className="flex-grow-0" />
      <div className="flex items-center justify-between">
        <p>Total:</p>
        <p className="font-bold text-xl">
          đ{" "}
          {(bookingForm.getValues("farmlandArea") * 30000).toLocaleString(
            "en-US",
          )}
        </p>
      </div>
      <Separator className="flex-grow-0" />
      <div className="flex items-center justify-between">
        <p>Payment method:</p>
        <p className="font-bold text-xl capitalize">
          {toPaymentString(bookingForm.getValues("paymentMethod"))}
        </p>
      </div>
    </div>
  );
}
