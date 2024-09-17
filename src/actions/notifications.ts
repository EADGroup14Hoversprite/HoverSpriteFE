import API from "@/utils/axiosClient";
import { INotification } from "@/models/Notification";

export async function getNotifications() {
  try {
    const res = await API.get<{
      message: string;
      notifications: INotification[];
    }>("/notification/my-notifications");
    return res.data;
  } catch (e) {
    throw new Error("Cannot get notifications from API");
  }
}
