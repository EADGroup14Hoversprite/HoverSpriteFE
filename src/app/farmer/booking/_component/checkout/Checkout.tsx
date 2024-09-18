import { UseFormReturn } from "react-hook-form";
import { OrderType } from "@/schema";
import { ShippingPayment } from "@/app/farmer/booking/_component/checkout/ShippingPayment";
import { OrderSummary } from "@/app/farmer/booking/_component/checkout/OrderSummary";

interface CheckoutProps {
  bookingForm: UseFormReturn<OrderType>;
}

export function Checkout({ bookingForm }: CheckoutProps) {
  return (
    <div className="flex justify-center gap-8 flex-col lg:flex-row">
      <ShippingPayment bookingForm={bookingForm} />
      <OrderSummary bookingForm={bookingForm} />
    </div>
  );
}
