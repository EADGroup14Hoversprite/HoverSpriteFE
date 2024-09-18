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
    <div className="justify-center items-center">
      <div className="w-full max-w-md">
        <Form {...bookingForm}>
          <form>
            {/* Full Name Field */}
            <div className="mb-3">
              <FormField
                name="farmerName"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <Input {...field} placeholder="Full name" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email and Phone Number Fields */}
            <div className="flex gap-4 mb-3">
              {/* Email Address Field */}
              <FormField
                name="farmerEmailAddress"
                control={control}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Email</FormLabel>
                    <Input {...field} placeholder="Email" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number Field */}
              <FormField
                name="farmerPhoneNumber"
                control={control}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Phone Number</FormLabel>
                    <Input {...field} placeholder="Phone number" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Home Address Field */}
            <div className="mb-3">
              <FormField
                name="address"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Home Address</FormLabel>
                    <Input {...field} placeholder="Search for an address" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
