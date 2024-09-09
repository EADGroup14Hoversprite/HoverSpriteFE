"use client";

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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PasswordVisibility } from "@/utils/passwordVisibility";
import { BarChart2Icon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { login } from "@/actions/auth";
import { SignIn, signInSchema } from "@/schema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();

  const defaultState: SignIn = {
    emailOrPhone: "",
    password: "",
  };

  const form = useForm<SignIn>({
    defaultValues: defaultState,
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: SignIn) => {
    const res = await login({
      emailOrPhone: values.emailOrPhone,
      password: values.password,
    });
    if (res.error) {
      toast({
        title: "Authentication failed!",
        description: res.error,
      });
    } else {
      router.push("/booking");
    }
  };

  return (
    <div className="flex screen">
      {/* Left side of the screen, full width on small and medium screen */}
      <div className="flex-[9] flex flex-col justify-center items-center w-full lg:w-auto">
        <h1 className="font-bold text-4xl text-blue-800 whitespace-nowrap py-10">
          Sign In
        </h1>

        <div className="w-4/5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="emailOrPhone"
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
                    <PasswordVisibility
                      {...field}
                      placeholder="Enter your password:"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded-sm"
                  />
                  <Label htmlFor="remember-me">Remember me</Label>
                </div>

                {/* Forgot Password Link */}
                <div className="text-blue-500 underline text-sm hover:text-blue-800">
                  <Link href={""}>Forgot Password?</Link>
                </div>
              </div>

              <Button
                className="w-full mt-10 bg-blue-800 rounded-md hover:bg-blue-900"
                variant={"default"}
              >
                Sign In
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
        <div className="flex flex-col justify-center items-center">
          <Link href={``}>
            <Button
              className="mx-2 rounded-full mb-2 w-96 "
              variant={"outline"}
            >
              Continue with Google
            </Button>
          </Link>

          <Link href={``}>
            <Button className="mx-2 rounded-full w-96 mb-2" variant={"outline"}>
              Continue with Facebook
            </Button>
          </Link>

          <div className="pt-5">
            <span className="font-light text-sm"> Don't have an account?</span>
            <Link href={`/signup/`}>
              <span className="text-blue-500 underline text-sm pl-1 hover:text-blue-800">
                Create now
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Right side of the screen, hidden on small screens */}
      <div className="hidden lg:flex flex-[11] flex-col justify-center items-center bg-blue-600">
        <div className="info-box">
          <div className="info-content">
            <h1 className="text-blue">Don't have an account? Create one!</h1>
            <p className="text-blue pt-3">
              Enter your personal details and start a wonderful journey with us!
            </p>
          </div>

          <div className="absolute bottom-0 right-10 w-3/12  ">
            <Link href={`/signup/`}>
              <Button
                className="w-full bg-blue-800 my-5 rounded-full hover:bg-blue-900"
                variant={"default"}
              >
                Sign up
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
            <div className="pl-5 text-blue">
              <span className="block text-sm"> Our rating among farms! </span>
              <span className="block text-xl font-bold"> 0.85 </span>
            </div>
          </div>
        </div>

        <div className="text-white text-center w-3/5">
          <h1 className="pt-20 pb-10 text-3xl font-bold">Come Join Us! </h1>
          <p className="text-balance">
            By signing up, you will gain access to among the most reliable, and
            experienced sprayer team, among many perks and rewards...
          </p>
        </div>
      </div>
    </div>
  );
}
