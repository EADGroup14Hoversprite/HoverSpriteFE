import RedirectRegisterForm from "@/app/auth/signup/_component/RedirectRegisterForm";
import { cookies } from "next/headers";

export default function Page() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authInfo")?.value;
  return <RedirectRegisterForm authInfo={authToken} />;
}
