"use client";
import { Signup, signupSchema } from "@/app/auth/signup/_schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordVisibility } from "@/utils/passwordVisibility";
import { useEffect } from "react";
import { IUser } from "@/types/user";

export default function RedirectRegisterForm({
  authInfo,
}: {
  authInfo: string | undefined;
}) {
  const defaultState: Partial<Signup> = {
    lastName: "",
    middleName: "",
    firstName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<Signup>({
    defaultValues: defaultState,
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = (values: Partial<Signup>) => {
    console.log(values);
  };

  useEffect(() => {
    if (authInfo) {
      const user = JSON.parse(authInfo) as IUser;
      console.log(user);
      form.reset({
        ...defaultState,
        firstName: user.fullName ?? "",
        email: user.emailAddress ?? "",
        phone: user.phoneNumber ?? "",
      });
    }
  }, [authInfo]);

  return (
    <div className="flex screen">
      <div className="flex-[9] flex flex-col justify-center items-center w-full lg:w-auto">
        <h1 className="font-bold text-4xl text-blue whitespace-nowrap py-10">
          Enter your personal details and start a wonderful journey with us!
        </h1>

        <div className="w-4/5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Name Fields: Last Name, Middle Name, First Name */}
              <div className="flex gap-4 mb-3">
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1 basis-1/3">
                      <FormLabel>Full name</FormLabel>
                      <Input {...field} placeholder="Your full name:" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Phone Number Field */}
              <FormField
                name="phone"
                control={form.control}
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
                name="email"
                control={form.control}
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
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Home Address</FormLabel>
                    <Input {...field} placeholder="Enter your home address:" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Password</FormLabel>
                    <PasswordVisibility
                      {...field}
                      placeholder="Enter your password:"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <PasswordVisibility
                      {...field}
                      placeholder="Confirm your password:"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full mt-4 bg-blue-800 rounded-lg hover:bg-blue-900"
                variant={"default"}
              >
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
