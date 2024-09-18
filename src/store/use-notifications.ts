import { create } from "zustand";
import { INotification } from "@/models/Notification";

type NotificationState = {
  notifications: INotification[];
};

type NotificationAction = {
  setNotifications: (notifications: INotification[]) => void;
};

type NotificationStore = NotificationState & NotificationAction;

export const useNotificationStore = create<NotificationStore>(
  (set): NotificationStore => ({
    notifications: [],
    setNotifications: (notifications: INotification[]) =>
      set({ notifications }),
  }),
);
