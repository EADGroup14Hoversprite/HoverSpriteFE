import { icons } from "lucide-react";

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

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Dashboard",
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
    // {
    //   groupLabel: "Contents",
    //   menus: [
    //     {
    //       href: "",
    //       label: "Posts",
    //       active: pathname.includes("/posts"),
    //       icon: "SquarePen",
    //       submenus: [
    //         {
    //           href: "/posts",
    //           label: "All Posts",
    //           active: pathname === "/posts",
    //         },
    //         {
    //           href: "/posts/new",
    //           label: "New Post",
    //           active: pathname === "/posts/new",
    //         },
    //       ],
    //     },
    //     {
    //       href: "/categories",
    //       label: "Categories",
    //       active: pathname.includes("/categories"),
    //       icon: "Bookmark",
    //       submenus: [],
    //     },
    //     {
    //       href: "/tags",
    //       label: "Tags",
    //       active: pathname.includes("/tags"),
    //       icon: "Tag",
    //       submenus: [],
    //     },
    //   ],
    // },
    // {
    //   groupLabel: "Settings",
    //   menus: [
    //     {
    //       href: "/users",
    //       label: "Users",
    //       active: pathname.includes("/users"),
    //       icon: "Users",
    //       submenus: [],
    //     },
    //     {
    //       href: "/account",
    //       label: "Account",
    //       active: pathname.includes("/account"),
    //       icon: "Settings",
    //       submenus: [],
    //     },
    //   ],
    // },
  ];
}
