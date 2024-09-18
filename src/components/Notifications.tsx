import React, { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useNotificationStore } from "@/store/use-notifications";
import { Badge } from "@/components/ui/badge";
import LucideIcon from "@/components/lucide-icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getNotifications } from "@/actions/notifications";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface NotificationsBellProps {
  token: string;
}

const NotificationsBell: React.FC<NotificationsBellProps> = ({ token }) => {
  const socket = useSocket(token);
  const [incomingMessage, setIncomingMessage] = useState("");
  const { notifications, setNotifications } = useNotificationStore();
  const router = useRouter();

  useEffect(() => {
    const getMyNotifications = async () => {
      return await getNotifications();
    };

    getMyNotifications().then((notification) => {
      setNotifications(notification.notifications);
    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to WebSocket");
      });

      socket.on("notification", (data: string) => {
        const getMyNotifications = async () => {
          return await getNotifications();
        };
        getMyNotifications().then((notification) => {
          setNotifications(notification.notifications);
        });
        toast.success(data);
        router.refresh();
      });

      return () => {
        socket.off("connect");
        socket.off("notification");
      };
    }
  }, [socket]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 rounded-full bg-border px-2 py-1">
          <Badge className="p-1">
            <LucideIcon name="BellRing" size={16} />
          </Badge>
          <p className="text-destructive font-semibold">
            {notifications.length}
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <ScrollArea>
          {notifications.length > 0 ? (
            <div>
              {incomingMessage.length > 0 && incomingMessage}
              {notifications.map((notification, index) => (
                <p key={notification.id}>{notification.content}</p>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <p className="italic">No notifications!</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
      {/*<Toaster position="top-center" />*/}
    </Popover>
  );
};

export default NotificationsBell;
