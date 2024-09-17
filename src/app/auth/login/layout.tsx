import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Toaster position="bottom-left" />
    </>
  );
}
