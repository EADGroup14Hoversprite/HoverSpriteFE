import { IUser } from "@/types/user";
import axios from "axios";

export async function userRegister(values: {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  homeAddress: string;
  userRole: string;
  password: string;
  googleId: string | null;
  facebookId: string | null;
}) {
  try {
    const res = await axios.post<{ message: string; dto: IUser }>(
      "http://localhost:8080/auth/register",
      {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        emailAddress: values.emailAddress,
        homeAddress: values.homeAddress,
        userRole: values.userRole,
        password: values.password,
        googleId: values.googleId,
        facebookId: values.facebookId,
      },
    );
    return res;

    // return await signIn("credentials", {
    //   emailOrPhone: values.emailAddress,
    //   password: values.password,
    //   redirect: false,
    // });
  } catch (error) {
    console.log(error);

    throw error;
    // if (error === 409) {
    //     throw new Error("User Already Exists");
    //   } else if (!res.ok) {
    //     throw new Error("Internal Error");
    //   }
    // return {
    //   error: (error as any).message,
    //   code: 500,
    // };
  }
}
