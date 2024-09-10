"use client";

import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

import BookingForm from "@/app/(farmer)/booking/_component/BookingForm";
import { BookingCalendar } from "@/components/booking-calendar";
import StepperIndicator from "@/components/stepper-indicator/index.ts";
import { Button } from "@/components/ui/button";
import { OrderType } from "@/schema";

function getStepContent(step: number, bookingForm: UseFormReturn<OrderType>) {
  switch (step) {
    case 1:
      return <BookingForm bookingForm={bookingForm} />;
    case 2:
      return <BookingCalendar bookingForm={bookingForm} />;
    case 3:
      return <div />;

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

  const handleNext = async () => {
    const isStepValid = await trigger(undefined, { shouldFocus: true });
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
          <Button className="w-[100px]" type="button" disabled={isSubmitting}>
            Checkout
          </Button>
        ) : (
          <Button type="button" className="w-[100px]" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>

      {getStepContent(activeStep, methods)}
    </div>
  );
};

export default HookMultiStepForm;
