import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete("sessionToken");
  redirect("/auth/login");
}
