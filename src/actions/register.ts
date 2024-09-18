import { IUser } from "@/types/user";
import API from "@/utils/axiosClient";

export async function userRegister(values: {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  homeAddress: string;
  userRole: string;
  password: string;
  googleId: string | null;
  facebookId: string | null;
  location: {
    longitude: number;
    latitude: number;
  };
}) {
  try {
    const res = await API.post<{ message: string; dto: IUser }>(
      "/auth/register",
      {
        ...values,
      },
    );
    return res;

    // return await signIn("credentials", {
    //   emailOrPhone: values.emailAddress,
    //   password: values.password,
    //   redirect: false,
    // });
  } catch (error) {
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
