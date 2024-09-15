import API from "@/utils/axiosClient";
import { IUser, JWTPayload } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import { getUserImg } from "@/utils/utils";

export async function auth(value: IUser) {
  await API.post(
    "/api/auth",
    { ...value },
    {
      baseURL: "http://localhost:3000",
    },
  );
}

export async function getMe(sessionToken: string) {
  try {
    const res = await API.get<{ message: string; dto: IUser; error?: boolean }>(
      "/auth/me",
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      },
    );
    const decodeData = jwtDecode<JWTPayload>(res.data.dto.accessToken);
    return {
      message: res.data.message,
      dto: {
        ...res.data.dto,
        imageUrl: getUserImg(decodeData.authRole, decodeData.userRole),
        userRole: decodeData.userRole,
        authRole: decodeData.authRole,
      } as IUser,
    };
  } catch (e) {
    return {
      message: "Failed to retrieve me",
      dto: null,
      error: true,
    };
  }
}

export async function signOut() {
  await API.post(
    "/api/logout",
    {},
    {
      baseURL: "http://localhost:3000",
    },
  );
}

export async function login(values: {
  emailOrPhone: string;
  password: string;
}) {
  const res = await API.post<{ message: string; dto: IUser }>("/auth/sign-in", {
    emailOrPhone: values.emailOrPhone,
    password: values.password,
  });
  const decodeData = jwtDecode<JWTPayload>(res.data.dto.accessToken);
  return {
    ...res.data.dto,
    imageUrl: getUserImg(decodeData.authRole, decodeData.userRole),
    userRole: decodeData.userRole,
    authRole: decodeData.authRole,
  };
}

export async function loginWithGoogle() {
  try {
    const res = await API.get<{ redirectUri: string }>("/auth/google/redirect");
    return {
      redirectUrl: res.data.redirectUri,
      error: false,
      message: "redirect ok!",
    };
  } catch (err) {
    return {
      redirectUrl: "",
      error: true,
      message: "redirect not oke!",
    };
  }
}
