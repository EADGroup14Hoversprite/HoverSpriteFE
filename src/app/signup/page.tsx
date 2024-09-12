"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form/form";
import { Input } from "@/components/form/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PasswordVisibility } from "@/utils/passwordVisibility";
import { BarChart2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/
  );

  const phoneValidation = new RegExp(/^(0|\+84)\s?\d{2,3}\s?\d{3}\s?\d{3,4}$/);

  const nameValidation = new RegExp(/^(?!.*[A-Z]{2}).*$/);

  const signupSchema = z
    .object({
      lastName: z
        .string()
        .min(2, { message: "Invalid name" })
        .regex(nameValidation, { message: "Invalid name" }),
      middleName: z.string().regex(nameValidation, { message: "Invalid name" }),
      firstName: z
        .string()
        .min(2, { message: "Invalid name" })
        .regex(nameValidation, { message: "Invalid name" }),
      email: z
        .string()
        .email({ message: "invalid email" })
        .min(6, { message: "invalid email" }),
      phone: z
        .string()
        .min(1, { message: "Please enter your phone number" })
        .regex(phoneValidation, {
          message:
            "Invalid phone number. Phone number must start with 0 or +84, followed by nine or ten digits",
        }),
      address: z.string().min(1, { message: "Please enter your address" }),
      password: z
        .string()
        .min(8, { message: "Password must have at least 8 characters" })
        .regex(passwordValidation, {
          message:
            "Your password must contain at least one lowercase, one uppercase and one special character",
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  type Signup = z.infer<typeof signupSchema>;
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

  return (
    <div className="flex screen">
      {/* Left side of the screen hidden on small & medium screens */}
      <div className="hidden lg:flex flex-[11] flex-col justify-center items-center bg-blue-600">
        <div className="info-box">
          <div className="info-content">
            <h1 className="text-blue">Already have an account? Sign in!</h1>
            <p className="text-blue pt-3">
              Enter your personal details and start a wonderful journey with us!
            </p>
          </div>
  
          <div className="absolute bottom-0 right-10 w-3/12">
            <Link href={`/login/`}>
              <Button
                className="w-full bg-blue-800 my-5 rounded-full hover:bg-blue-900"
                variant={"default"}
              >
                Sign in
              </Button>
            </Link>
          </div>
  
          {/* Rating box */}
          <div className="rating-box shadow-all">
            <BarChart2Icon
              className="self-center"
              style={{ color: "blue" }}
              strokeWidth={3}
            />
            <div className="pl-5 text-blue-800">
              <span className="block text-sm"> Our rating among farms! </span>
              <span className="block text-xl font-bold"> 0.85 </span>
            </div>
          </div>
        </div>
  
        <div className="text-white text-center w-3/5">
          <h1 className="pt-20 pb-10 text-3xl font-bold">Come Join Us!</h1>
          <p className="text-balance">
            By signing up, you will gain access to among the most reliable, and
            experienced sprayer team, among many perks and rewards...
          </p>
        </div>
      </div>
  
      {/* Right side of the screen, full width on small & medium screens */}
      <div className="flex-[9] flex flex-col justify-center items-center w-full lg:w-auto">
        <h1 className="font-bold text-4xl text-blue whitespace-nowrap py-10">
          Account Creation
        </h1>
  
        <div className="w-4/5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Name Fields: Last Name, Middle Name, First Name */}
              <div className="flex gap-4 mb-3">
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1 basis-1/3">
                      <FormLabel>Last Name</FormLabel>
                      <Input {...field} placeholder="Your last name:" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="middleName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1 basis-1/2">
                      <FormLabel>Middle Name</FormLabel>
                      <Input {...field} placeholder="Your middle name:" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1 basis-1/3">
                      <FormLabel>First Name</FormLabel>
                      <Input {...field} placeholder="Your first name:" />
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
                Sign Up
              </Button>
            </form>
          </Form>
        </div>
  
        {/* Separation Line */}
        <div className="w-2/5 justify-center my-5 flex items-center">
          <Separator className="ml-12" />
          <span className="text-sm"> OR </span>
          <Separator className="mr-12" />
        </div>
  
        {/* Social login*/}
        <div className="flex flex-col justify-center items-center ">
          <Link href={``}>
            <Button
              className="mx-2 rounded-full mb-2 w-96"
              variant={"outline"}
            >
              Continue with Google
            </Button>
          </Link>
  
          <Link href={``}>
            <Button
              className="mx-2 rounded-full w-96 mb-2"
              variant={"outline"}
            >
              Continue with Facebook
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
  
}
