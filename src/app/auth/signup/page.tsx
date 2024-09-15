"use client";
import DefaultRegisterForm from "@/app/auth/signup/_component/DefaultRegisterForm";

export default function Page() {
  // const cookieClient = useCookies();
  // const router = useRouter();
  // const authInfo = cookieClient.get("authInfo");
  // if (authInfo) {
  //   router.push("/auth/redirect-register");
  // }
  return <DefaultRegisterForm />;
}
