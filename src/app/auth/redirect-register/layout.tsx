import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export default async function Layout({ children }: PropsWithChildren) {
  const cookieStore = cookies();
  const authInfo = cookieStore.get("authInfo")?.value;
  if (!authInfo) {
    notFound();
  }

  return (
    <>
      {children}
      <Toaster position="top-center" />
    </>
  );
}
