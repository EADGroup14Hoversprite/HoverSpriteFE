"use client";
import React, { PropsWithChildren, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Navbar, Sidebar } from "@/components/layout";
import { useSidebarToggle } from "@/store/use-sidebar-toggle";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb/DynamicBreadcrumb";
import { Toaster } from "sonner";
import { notFound } from "next/navigation";
import { UserRole } from "@/types/role";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "@/types/user";

export default function Layout({ children }: PropsWithChildren) {
  const { isOpen } = useSidebarToggle();
  const clientCookie = useCookies().get("sessionToken");

  useEffect(() => {
    if (clientCookie) {
      const decodeData = jwtDecode<JWTPayload>(clientCookie!);
      if (decodeData.userRole !== UserRole.ROLE_FARMER.toString()) {
        notFound();
      }
    }
  }, [clientCookie]);

  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <main
        data-collapsed={isOpen}
        className={cn(
          `
            min-h-screen bg-zinc-50 transition-[margin-left] duration-300 ease-in-out
            dark:bg-zinc-900
            w-full flex flex-col
            overflow-hidden
            data-[collapsed=false]:lg:ml-[68px] 
            data-[collapsed=true]:lg:ml-60
          `,
        )}
      >
        <Navbar title="Farmer" />
        <DynamicBreadcrumb />
        {children}
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
