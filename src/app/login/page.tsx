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
} from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Link from "next/link";
import { PasswordInput } from "@/components/password-input";

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
      <div className="flex-[9] flex flex-col justify-center items-center w-full md:w-auto">
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
                className="w-full mt-4 bg-blue-800 mt-10"
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
          <span className="mx-4 text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-300 mr-12"></div>
        </div>
  
        {/* Add social login buttons here */}
        <div className="flex flex-col justify-center">
          <Button className="mx-2" variant={"outline"}>
            Google
          </Button>
          <Button className="mx-2" variant={"outline"}>
            Facebook
          </Button>
        </div>
      </div>
  
      {/* Right side of the screen, hidden on small screens */}
      <div className="hidden md:flex flex-[11] justify-center items-center bg-blue-600">
        <Link href={`/login/`}>
          <Button className="w-full" variant={"secondary"}>
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
  
}
