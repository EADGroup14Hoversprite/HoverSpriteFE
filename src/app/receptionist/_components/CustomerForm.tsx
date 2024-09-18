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
  const defaultState: SignUp = {
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
    <div className="flex-[9] flex flex-col justify-center items-center w-full lg:w-auto">
      <div className="w-4/5">
        <Form {...form}>
          <form> {/* onSubmit={form.handleSubmit(onSubmit)} */}
            <div className="flex gap-4 mb-3">
              <FormField
                name="fullName"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1 basis-1/3">
                    <FormLabel>Full Name</FormLabel>
                    <Input {...field} placeholder="Your full name:" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone Number Field */}
            <FormField
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Phone Number</FormLabel>
                  <Input {...field} placeholder="Enter your phone number:" />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Address Field */}
            <FormField
              name="emailAddress"
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
              name="homeAddress"
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
