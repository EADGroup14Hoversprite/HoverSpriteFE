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
  } catch (error) {
    throw error;
  }
}
