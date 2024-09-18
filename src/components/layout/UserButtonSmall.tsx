import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LucideIcon from "@/components/lucide-icon";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import { signOut } from "@/actions/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Notifications from "@/components/Notifications";
import { clientSessionToken } from "@/utils/axiosClient";

export default function UserButtonSmall() {
  const { currentUser, logout } = useUserStore();
  const router = useRouter();
  const userSignOut = async () => {
    await signOut();
    logout();
  };
  return (
    <div className="h-full flex items-center gap-2 sm:hidden">
      <Popover>
        <PopoverTrigger asChild>
          <div className="rounded-md flex items-center border border-primary border-solid p-2 h-10 gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                className="rounded-full"
                src={currentUser?.imageUrl}
                alt={`${currentUser?.fullName}'s image`}
              />
              <AvatarFallback>
                {currentUser?.fullName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
          <p className="font-semibold text-primary text-sm">
            {currentUser?.emailAddress}
          </p>
          <Button
            variant="outline"
            className="flex gap-2 items-center w-full justify-start"
            onClick={() => {
              userSignOut().then((res) => {
                router.push("/auth/login");
              });
            }}
          >
            <LucideIcon name="LogOut" />
            Logout
          </Button>
        </PopoverContent>
      </Popover>

      <Notifications token={clientSessionToken.value} />
    </div>
  );
}
