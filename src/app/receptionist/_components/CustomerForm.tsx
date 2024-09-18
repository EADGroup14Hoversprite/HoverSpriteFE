"use client";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OrderType } from "@/schema";
import API from "@/utils/axiosClient";

interface CustomerFormProps {
  bookingForm: UseFormReturn<OrderType>;
}

export default function CustomerForm({ bookingForm }: CustomerFormProps) {
  const { watch, setValue, control } = bookingForm;

  const phoneNumber = watch("farmerPhoneNumber");

  useEffect(() => {
    if (phoneNumber) {
      const fetchUserByPhoneNumber = async (phoneNumber: string) => {
        try {
          const response = await API.get(`/user/by-phone-number`, {
            params: { phoneNumber },
          });

          const user = response.data.userInfoDTO;

          if (user) {
            // If user exists, set the other form values
            setValue("farmerName", user.fullName);
            setValue("farmerEmailAddress", user.emailAddress);
            setValue("address", user.homeAddress);
          }
        } catch (error) {
          console.error("Failed to fetch user by phone number:", error);
        }
      };

      fetchUserByPhoneNumber(phoneNumber);
    }
  }, [phoneNumber, setValue]);

  return (
    <div className="flex-[9] flex flex-col justify-center items-center w-full lg:w-auto">
      <div className="w-4/5">
        <Form {...bookingForm}>
          <form>
            {/* onSubmit={form.handleSubmit(onSubmit)} */}
            <div className="flex gap-4 mb-3">
              <FormField
                name="farmerName"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1 basis-1/3">
                    <FormLabel>Full Name</FormLabel>
                    <Input {...field} placeholder="Farmer's name:" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Phone Number Field */}
            <FormField
              name="farmerPhoneNumber"
              control={control}
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter farmer's phone number:"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email Address Field */}
            <FormField
              name="farmerEmailAddress"
              control={control}
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Email Address</FormLabel>
                  <Input {...field} placeholder="Enter your email address:" />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Home Address Field */}
            <FormField
              name="address"
              control={control}
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Home Address</FormLabel>
                  <Input {...field} placeholder="Enter your address" />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
