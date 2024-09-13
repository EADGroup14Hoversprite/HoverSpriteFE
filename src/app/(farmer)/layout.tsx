"use client";
import React, { PropsWithChildren, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Navbar, Sidebar } from "@/components/layout";
import { useSidebarToggle } from "@/store/use-sidebar-toggle";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb/DynamicBreadcrumb";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/user-store";
import { Toaster } from "sonner";

export default function Layout({ children }: PropsWithChildren) {
  const { isOpen } = useSidebarToggle();
  const { login, logout, currentUser } = useUserStore();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      login(session.user);
    } else {
      logout();
    }
  }, [session?.user]);
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
            data-[collapsed=false]:lg:ml-[68px] 
            data-[collapsed=true]:lg:ml-60
          `,
        )}
      >
        <Navbar title="Farmer" />
        <DynamicBreadcrumb />
        {children}
      </main>
      <Toaster />
    </div>
  );
}
