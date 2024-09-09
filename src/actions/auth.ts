"use server";

import { signIn } from "@/auth";

export async function login(values: {
  emailOrPhone: string;
  password: string;
}) {
  try {
    return await signIn("credentials", {
      emailOrPhone: values.emailOrPhone,
      password: values.password,
      redirect: false,
    });
  } catch (error) {
    if ((error as any).name === "InvalidEmailPasswordError") {
      return {
        error: (error as any).type,
        code: 401,
      };
    } else if ((error as any).name === "NotExistEmail") {
      return {
        error: (error as any).type,
        code: 404,
      };
    } else {
      return {
        error: (error as any).type,
        code: 500,
      };
    }
  }
}

export async function userRegister(values: {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  homeAddress: string;
  userRole: string;
  username: string;
  password: string;
}) {
  try {
    const res = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        emailAddress: values.emailAddress,
        homeAddress: values.homeAddress,
        userRole: values.userRole,
        username: values.username,
        password: values.password,
      }),
    });
    if (res.status === 409) {
      throw new Error("User Already Exists");
    } else if (!res.ok) {
      throw new Error("Internal Error");
    }

    return await signIn("credentials", {
      emailOrPhone: values.emailAddress,
      password: values.password,
      redirect: false,
    });
  } catch (error) {
    return {
      error: (error as any).message,
      code: 500,
    };
  }
}
