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

