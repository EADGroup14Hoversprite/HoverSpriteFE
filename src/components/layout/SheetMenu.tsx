import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidenavMenu } from "@/components/layout";
import Image from "next/image";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="sm:w-72 h-full flex flex-col px-3 pt-3"
        side="left"
      >
        <SheetHeader>
          <Button
            className="flex justify-start items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/booking" className="flex items-center gap-2">
              <Image
                src="/logo/logo.svg"
                alt="logo image"
                width={40}
                height={40}
              />
              <SheetTitle className="font-bold text-lg">HoverSprite</SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <SidenavMenu isOpen />
      </SheetContent>
    </Sheet>
  );
}
