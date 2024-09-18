"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUp, SignUpSchema } from "@/schema";
import API from "@/utils/axiosClient";

export default function CustomerForm() {
  const defaultState: Partial<SignUp> = {
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    homeAddress: "",
    password: "",
    confirmPassword: "",
    googleId: null,
    facebookId: null,
  };

  const form = useForm<SignUp>({
    defaultValues: defaultState,
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
  });

  const { watch, setValue, control } = form;

  const phoneNumber = watch("phoneNumber");

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
            setValue("fullName", user.fullName);
            setValue("emailAddress", user.emailAddress);
            setValue("homeAddress", user.homeAddress);
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
        <Form {...form}>
          <form>
            {/* Full Name Field */}
            <div className="flex gap-4 mb-3">
              <FormField
                name="fullName"
                control={control}
                render={({ field }) => (
                  <FormItem className="w-full">
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
                name="emailAddress"
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
                name="phoneNumber"
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
                name="homeAddress"
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
