"use client";
import React, { PropsWithChildren, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Navbar, Sidebar } from "@/components/layout";
import { useSidebarToggle } from "@/store/use-sidebar-toggle";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb/DynamicBreadcrumb";
import { Toaster } from "sonner";
import { useUserStore } from "@/store/user-store";

export default function Layout({ children }: PropsWithChildren) {
  const { isOpen } = useSidebarToggle();
  const { currentUser } = useUserStore();
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
      <Toaster position="top-center" />
    </div>
  );
  // : (
  //     <div className={"bg-black/50 h-screen flex items-center justify-center"}>
  //         <div className="flex flex-col gap-6 rounded-md p-4 border border-solid border-black w-[500px] bg-white">
  //             <div className="flex flex-col gap-2">
  //                 <p className="font-semibold text-lg">Session expired!</p>
  //                 <p className="text-sm">
  //                     It looks like your session has been expired! Please login again
  //                 </p>
  //             </div>
  //             <Link href={"/auth/login"}>
  //                 <Button>Login</Button>
  //             </Link>
  //         </div>
  //         <Toaster />
  //     </div>
  // )
}
