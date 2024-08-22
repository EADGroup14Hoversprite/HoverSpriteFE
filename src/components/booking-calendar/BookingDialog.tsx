import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropsWithChildren } from "react";

export function BookingDialog({
  slot,
  date,
  children,
}: PropsWithChildren<{
  slot: number;
  date: Date;
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
      </DialogContent>
    </Dialog>
  );
}
