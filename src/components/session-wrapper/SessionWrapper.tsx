"use client";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import { useUserStore } from "@/store/user-store";
import { getMe } from "@/actions/auth";
import { clientSessionToken } from "@/utils/axiosClient";

export default function SessionWrapper({
  children,
  session,
}: PropsWithChildren<{ session: string }>) {
  const { login } = useUserStore();
  if (typeof window !== "undefined") {
    useState(() => {
      clientSessionToken.value = session;
    });
  }
  useEffect(() => {
    (async () => {
      const res = await getMe(session);
      if (!res.error) {
        login(res.dto!);
      }
    })();
  }, [session]);
  return <Fragment>{children}</Fragment>;
}
