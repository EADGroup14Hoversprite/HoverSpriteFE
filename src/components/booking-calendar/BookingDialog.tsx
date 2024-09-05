import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropsWithChildren, ReactNode } from "react";

export function BookingDialog({
  slot,
  date,
  children,
  form,
}: PropsWithChildren<{
  slot: number;
  date: Date;
  form: ReactNode;
}>) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>slot</DialogTitle>
          <DialogDescription>
            This is the form for booking the spraying session. Please fill the
            form!
          </DialogDescription>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
}
