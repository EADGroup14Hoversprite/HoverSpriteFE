"use client";

import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

import BookingForm from "@/app/(farmer)/booking/_component/crop-area/BookingForm";
import { BookingCalendar } from "@/components/booking-calendar";
import StepperIndicator from "@/components/stepper-indicator";
import { Button } from "@/components/ui/button";
import { OrderType } from "@/schema";
import { Checkout } from "@/app/(farmer)/booking/_component/checkout/Checkout";
import { SpraySlot, toSlotNum } from "@/models/Booking";
import { useUserStore } from "@/store/user-store";
import axios from "axios";

function isValidSlot(slot: SpraySlot, bookingForm: UseFormReturn<OrderType>) {
  if (
    new Date().getDate() === bookingForm.getValues("desiredDate").getDate() &&
    new Date().getMonth() === bookingForm.getValues("desiredDate").getMonth() &&
    new Date().getFullYear() ===
      bookingForm.getValues("desiredDate").getFullYear()
  )
    return toSlotNum(slot) > new Date().getHours();

  if (bookingForm.getValues("desiredDate").getTime() > new Date().getTime()) {
    return true;
  }
  return toSlotNum(slot) > new Date().getHours();
}

function getStepContent(step: number, bookingForm: UseFormReturn<OrderType>) {
  switch (step) {
    case 1:
      return <BookingForm bookingForm={bookingForm} />;
    case 2:
      return <BookingCalendar bookingForm={bookingForm} />;
    case 3:
      return <Checkout bookingForm={bookingForm} />;

    default:
      return "Unknown step";
  }
}

const HookMultiStepForm = ({
  methods,
}: {
  methods: UseFormReturn<OrderType>;
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const { currentUser } = useUserStore();
  const [erroredInputName, setErroredInputName] = useState("");
  const {
    trigger,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  // focus errored input on submit
  useEffect(() => {
    const erroredInputElement =
      document.getElementsByName(erroredInputName)?.[0];
    if (erroredInputElement instanceof HTMLInputElement) {
      erroredInputElement.focus();
      setErroredInputName("");
    }
  }, [erroredInputName]);

  const handleNext = async (activeStep: number) => {
    let isStepValid = false;
    switch (activeStep) {
      case 1:
        isStepValid = await trigger("farmlandArea", { shouldFocus: true });
        break;
      case 2:
        isStepValid = isValidSlot(methods.getValues("timeSlot"), methods);
        break;
      case 3:
        isStepValid = await trigger(undefined, { shouldFocus: true });
    }
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  async function onSubmit(value: OrderType) {
    const reqBody = {
      farmerId: value.farmerId,
      farmlandArea: value.farmlandArea,
      location: value.location,
      address: value.address,
      cropType: value.cropType,
      desiredDate: value.desiredDate,
      timeSlot: value.timeSlot,
    };
    const res = await axios.post(
      "http://localhost:8080/order/create",
      {
        ...reqBody,
        farmerId: currentUser?.id!,
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser?.accessToken}`,
        },
      },
    );

    // await createOrder({ ...value, farmerId: currentUser?.id! });
    // console.log(currentUser?.accessToken);
    return res;
  }

  return (
    <div className="w-full h-full space-y-4">
      <StepperIndicator steps={[1, 2, 3]} activeStep={activeStep} />
      <div className="flex justify-center space-x-[20px]">
        <Button
          type="button"
          className="w-[100px]"
          variant="secondary"
          onClick={handleBack}
          disabled={activeStep === 1}
        >
          Back
        </Button>
        {activeStep === 3 ? (
          <Button
            className="w-[100px]"
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              onSubmit(methods.getValues());
            }}
          >
            Checkout
          </Button>
        ) : (
          <Button
            type="button"
            className="w-[100px]"
            onClick={() => handleNext(activeStep)}
          >
            Next
          </Button>
        )}
      </div>

      {getStepContent(activeStep, methods)}
    </div>
  );
};

export default HookMultiStepForm;
