import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session) {
    redirect("/booking");
  }
  return <Fragment>{children}</Fragment>;
}
