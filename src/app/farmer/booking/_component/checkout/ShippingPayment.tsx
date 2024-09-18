import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { OrderType } from "@/schema";
import { useUserStore } from "@/store/user-store";
import { Form, FormField } from "@/components/ui/form";
import { OrderDetail } from "@/app/farmer/booking/_component/checkout";
import GeoSearchForm from "@/components/map/geoSearchForm";

interface ShippingPaymentProps {
  bookingForm: UseFormReturn<OrderType>;
}

export function ShippingPayment({ bookingForm }: ShippingPaymentProps) {
  const { currentUser } = useUserStore();

  useEffect(() => {
    bookingForm.setValue("address", currentUser?.homeAddress!);
    bookingForm.setValue("farmerPhoneNumber", currentUser?.phoneNumber!);
    bookingForm.setValue("farmerName", currentUser?.fullName!);
    bookingForm.setValue("farmerEmailAddress", currentUser?.emailAddress!);
  }, []);

  const handleAddressSelect = (
    address: string,
    longitude: number,
    latitude: number,
  ) => {
    bookingForm.setValue("address", address); // Update the home address field in the form
    bookingForm.setValue("location.latitude", latitude); // Update the home address field in the form
    bookingForm.setValue("location.longitude", longitude); // Update the home address field in the form
  };
  return (
    <Form {...bookingForm}>
      <form className="flex-1">
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={["item-1", "item-2", "item-3"]}
        >
          <OrderDetail bookingForm={bookingForm} />
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl font-semibold pt-0 pb-4">
              Shipping Information
            </AccordionTrigger>
            <AccordionContent className="space-y-4 p-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="farmerName">Full name</Label>
                <Input value={currentUser?.fullName} id="farmerName" disabled />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="farmerName">Email</Label>
                  <Input
                    value={currentUser?.emailAddress}
                    id="farmerEmail"
                    disabled
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="farmerName">Phone Number</Label>
                  <Input
                    value={currentUser?.phoneNumber}
                    id="farmerPhone"
                    disabled
                  />
                </div>
              </div>
              <FormField
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="farmerAddress">Home Address</Label>
                    <GeoSearchForm
                      onSelect={(data, long, lat) =>
                        handleAddressSelect(data, long, lat)
                      }
                    />
                    <Input
                      value={field.value}
                      placeholder="Your address"
                      disabled
                    />
                  </div>
                )}
                name="address"
              />
            </AccordionContent>
          </AccordionItem>
          {/*      <AccordionItem value="item-2">*/}
          {/*        <AccordionTrigger className="text-2xl font-semibold pt-0 pb-4">*/}
          {/*          Payment*/}
          {/*        </AccordionTrigger>*/}
          {/*        <AccordionContent className="p-1 pb-2 space-y-4">*/}
          {/*          <FormField*/}
          {/*            render={({ field }) => (*/}
          {/*              <RadioGroup*/}
          {/*                value={field.value}*/}
          {/*                onValueChange={field.onChange}*/}
          {/*              >*/}
          {/*                <Label*/}
          {/*                  htmlFor="cash"*/}
          {/*                  className={`*/}
          {/*      relative flex cursor-pointer items-center gap-2 rounded-md bg-popover p-4 font-semibold leading-normal ring-1 ring-border*/}
          {/*hover:bg-accent hover:text-accent-foreground*/}
          {/*has-[*[data-state=checked]]:ring-2 has-[*[data-state=checked]]:ring-foreground*/}
          {/*    `}*/}
          {/*                >*/}
          {/*                  <RadioGroupItem*/}
          {/*                    value={PaymentType.CASH}*/}
          {/*                    id="cash"*/}
          {/*                    className="flex-shrink-0"*/}
          {/*                  />*/}
          {/*                  <div className="flex items-center justify-between flex-1">*/}
          {/*                    <span className="overflow-hidden text-ellipsis whitespace-nowrap break-words text-center">*/}
          {/*                      Pay on delivery*/}
          {/*                    </span>*/}
          {/*                    <LucideIcon name="Receipt" />*/}
          {/*                  </div>*/}
          {/*                </Label>*/}
          {/*                <Label*/}
          {/*                  htmlFor="creditCard"*/}
          {/*                  className={`*/}
          {/*   relative flex cursor-pointer items-center gap-2 rounded-md bg-popover p-4 font-semibold leading-normal ring-1 ring-border*/}
          {/*hover:bg-accent hover:text-accent-foreground*/}
          {/*has-[*[data-state=checked]]:ring-2 has-[*[data-state=checked]]:ring-foreground*/}
          {/*    `}*/}
          {/*                >*/}
          {/*                  <RadioGroupItem*/}
          {/*                    value={PaymentType.CREDIT_CARD}*/}
          {/*                    id="creditCard"*/}
          {/*                    className="flex-shrink-0"*/}
          {/*                  />*/}
          {/*                  <div className="flex items-center justify-between flex-1">*/}
          {/*                    <span className="overflow-hidden text-ellipsis whitespace-nowrap break-words text-center">*/}
          {/*                      Pay by credit card*/}
          {/*                    </span>*/}
          {/*                    <LucideIcon name="CreditCard" />*/}
          {/*                  </div>*/}
          {/*                </Label>*/}
          {/*              </RadioGroup>*/}
          {/*            )}*/}
          {/*            name="paymentMethod"*/}
          {/*            control={bookingForm.control}*/}
          {/*          />*/}

          {/*          {paymentMethod === PaymentType.CREDIT_CARD && (*/}
          {/*            <div className="flex flex-col gap-2">*/}
          {/*              <Input value="CARD HOLDER NAME" disabled />*/}
          {/*              <Input value="CARD NUMBER" disabled />*/}
          {/*              <div className="grid grid-cols-3 gap-4">*/}
          {/*                <Input value="MM" disabled />*/}
          {/*                <Input value="YY" disabled />*/}
          {/*                <Input value="CVV" disabled />*/}
          {/*              </div>*/}
          {/*            </div>*/}
          {/*          )}*/}
          {/*        </AccordionContent>*/}
          {/*      </AccordionItem>*/}
        </Accordion>
      </form>
    </Form>
  );
}
