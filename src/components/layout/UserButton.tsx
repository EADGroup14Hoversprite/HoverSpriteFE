import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LucideIcon from "@/components/lucide-icon";
import { useUserStore } from "@/store/user-store";
import { signOut } from "@/actions/auth";
import Notifications from "@/components/Notifications";
import { useRouter } from "next/navigation";

export function UserButton() {
  const { logout, currentUser } = useUserStore();
  const router = useRouter();
  const userSignOut = async () => {
    await signOut();
    logout();
  };
  return (
    <div className="h-full items-center gap-2 hidden sm:flex">
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
        <p className="text-semibold text-primary text-sm">
          {currentUser?.emailAddress}
        </p>
      </div>
      <Notifications token={currentUser?.accessToken!} />

      <Button
        variant="outline"
        className="flex gap-2 items-center w-full justify-start"
        onClick={() => {
          userSignOut().then((res) => router.push("/auth/login"));
        }}
      >
        <LucideIcon name="LogOut" />
        Logout
      </Button>
    </div>
  );
}
