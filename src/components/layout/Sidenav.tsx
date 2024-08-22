"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SidenavMenu } from "@/components/layout/SidenavMenu";
import { useSidebarToggle } from "@/store/use-sidebar-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarToggle } from "@/components/layout";

export function Sidebar() {
  const sidebar = useSidebarToggle();

  if (!sidebar) return null;
  return (
    <aside
      className={cn(
        `
          fixed left-0 top-0 z-20 h-full -translate-x-full border-r transition-[width] duration-300 ease-in-out
          lg:translate-x-0
        `,
        sidebar?.isOpen === false ? "w-[68px]" : "w-60",
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />

      <div className="relative h-full flex flex-col overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            "flex items-center justify-center gap-2 h-12",
          )}
          variant="link"
          asChild
        >
          <Link href="/booking" className="flex items-center gap-2">
            <Image
              src={`/logo/logo.svg`}
              alt={"application logo"}
              width="32"
              height="32"
            />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100",
              )}
            >
              Hover Sprite
            </h1>
          </Link>
        </Button>
        <Separator />
        <SidenavMenu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
