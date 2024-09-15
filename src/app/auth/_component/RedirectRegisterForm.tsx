"use client";
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
import { IUser, JWTPayload } from "@/types/user";
import { SignUp, SignUpSchema } from "@/schema";
import { userRegister } from "@/actions/register";
import { toast } from "sonner";
import { auth, extractRoleInfo } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { jwtDecode } from "jwt-decode";
import { clientSessionToken } from "@/utils/axiosClient";

export default function RedirectRegisterForm({
  authInfo,
}: {
  authInfo: string | undefined;
}) {
  const router = useRouter();
  const { login } = useUserStore();
  const defaultState: SignUp = {
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    homeAddress: "",
    password: "",
    confirmPassword: "",
    facebookId: null,
    googleId: null,
  };

  const form = useForm<SignUp>({
    defaultValues: defaultState,
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: SignUp) => {
    const onRegister = userRegister({
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      emailAddress: values.emailAddress,
      homeAddress: values.homeAddress,
      userRole: "ROLE_FARMER",
      password: values.password,
      googleId: values.googleId,
      facebookId: values.facebookId,
    });
    toast.promise(onRegister, {
      loading: "Creating your account...",
      success: async (res) => {
        const decodeData = jwtDecode<JWTPayload>(res.data.dto.accessToken);
        const finalUser = extractRoleInfo(
          res.data.dto,
          decodeData.authRole,
          decodeData.userRole,
        );
        await auth(finalUser);
        login(finalUser);
        clientSessionToken.value = finalUser.accessToken;
        router.push("/orders");
        return "Register successfully!";
      },
      error: (e) => {
        return e.response?.error?.message;
      },
    });
  };
  useEffect(() => {
    if (authInfo) {
      const user = JSON.parse(authInfo) as IUser;
      form.reset({
        ...defaultState,
        fullName: user.fullName ?? "",
        emailAddress: user.emailAddress ?? "",
        phoneNumber: user.phoneNumber ?? "",
        googleId: user.googleId,
        facebookId: user.facebookId,
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
                  name="fullName"
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
                name="phoneNumber"
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
                name="emailAddress"
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
                name="homeAddress"
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
