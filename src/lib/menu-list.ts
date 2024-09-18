import { icons } from "lucide-react";
import { UserRole } from "@/types/role";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: keyof typeof icons;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Record<UserRole, Group[]> {
  return {
    ROLE_FARMER: [
      {
        groupLabel: "Farmer Dashboard",
        menus: [
          {
            href: "/farmer/booking",
            label: "Booking",
            active: pathname.includes("/farmer/booking"),
            icon: "Album",
            submenus: [],
          },
          {
            href: "/farmer/orders",
            label: "All orders",
            active: pathname.includes("/farmer/orders"),
            icon: "Logs",
            submenus: [],
          },
        ],
      },
    ],
    ROLE_SPRAYER: [
      {
        groupLabel: "Sprayer Dashboard",
        menus: [
          {
            href: "/sprayer/assign-orders",
            label: "Assigned Orders",
            active: pathname.includes("/sprayer/assign-orders"),
            icon: "Book",
            submenus: [],
          },
          {
            href: "/sprayer/order-history",
            label: "Order History",
            active: pathname.includes("/sprayer/order-history"),
            icon: "Book",
            submenus: [],
          },
          {
            href: "/sprayer/route",
            label: "Map Routing",
            active: pathname.includes("/sprayer/route"),
            icon: "Map",
            submenus: [],
          },
        ],
      },
    ],
    ROLE_RECEPTIONIST: [
      {
        groupLabel: "Receptionist Dashboard",
        menus: [
          {
            href: "/receptionist/dashboard",
            label: "Dashboard",
            active: pathname.includes("/receptionist/dashboard"),
            icon: "Book",
            submenus: [],
          },
          {
            href: "/receptionist/booking",
            label: "Booking",
            active: pathname.includes("/receptionist/booking"),
            icon: "Book",
            submenus: [],
          },
        ],
      },
    ],
  };
}
