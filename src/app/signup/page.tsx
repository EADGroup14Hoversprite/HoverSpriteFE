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
import { PasswordInput } from "@/utils/password-input";
import { BarChart2Icon } from "lucide-react";

export default function Page() {
  const signupSchema = z.object({
    email: z
      .string()
      .email({ message: "invalid email" })
      .min(6, { message: "invalid email" }),
    password: z
      .string()
      .min(7, { message: "Password must have at least 7 characters" }),
  });

  type Signup = z.infer<typeof signupSchema>;
  const defaultState: Partial<Signup> = {
    email: "",
    password: "",
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
    <div className="flex min-h-screen">
      {/* Left side of the screen, full width on small screens */}
      <div className="hidden lg:flex flex-[11] flex-col justify-center items-center bg-blue-600">
        <div className="relative bg-white flex flex-col justify-center mx-20 rounded-lg w-3/5 min-w-96">
          <div className="mx-10 mt-10 w-4/5 text-balance pb-20">
            <h1 className="text-sky-700 font-bold text-3xl">
              Already have an account? Sign in!
            </h1>
            <p className="text-sky-800 pt-3">
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

          {/* Small rating box */}
          <div className="flex flex-row relative -bottom-9 left-5 bg-white shadow-all rounded-full px-4 py-4 w-6/12">
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

      {/* Right side of the screen, hidden on small screens */}
      <div className="flex-[9] flex flex-col justify-center items-center w-full lg:w-auto">
        <h1 className="font-bold text-4xl text-blue-800 text-nowrap pb-10">
          Account Creation
        </h1>

        <div className="w-4/5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>E-mail</FormLabel>
                    <Input {...field} placeholder="Enter your email:" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <PasswordInput
                      {...field}
                      placeholder="Enter your password:"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full mt-4 bg-blue-800 mt-10 rounded-lg hover:bg-blue-900"
                variant={"default"}
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </div>

        {/* Separation Line */}
        <div className="relative my-6 w-full flex items-center">
          <div className="flex-grow border-t border-gray-300 ml-12"></div>
          <span className="mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300 mr-12"></div>
        </div>

        {/* Add social login buttons here */}
        <div className="flex flex-col justify-center">
          <Button className="mx-2 rounded-full " variant={"outline"}>
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
