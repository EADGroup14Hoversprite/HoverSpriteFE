import { Fragment } from "react";
import { Toaster } from "sonner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      {children}
      <Toaster position="bottom-left" />
    </Fragment>
  );
}
