import { SessionProvider } from "next-auth/react";
import { PropsWithChildren, useMemo } from "react";
import { Session } from "next-auth";

export default function SessionWrapper({
  children,
  session,
  sessionKey,
}: PropsWithChildren<{ session: Session | null; sessionKey: number }>) {
  const memoizedSessionKey = useMemo(() => {
    return sessionKey;
  }, [session]);
  return (
    <SessionProvider key={memoizedSessionKey} session={session}>
      {children}
    </SessionProvider>
  );
}
