"use client";
import React from "react";
import { Nav } from "./nav";
import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  Layers3,
  ScrollText,
  Megaphone,
} from "lucide-react";
import { useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { Button } from "@/components/ui/button";

export default function AdminNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r border-gray-300 px-4  pb-10 pt-24 bg-color-dark dark:bg-yellow-500">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
            variant: "ghost",
          },
          {
            title: "Category",
            href: "/admin/category",
            icon: Layers3,
            variant: "ghost",
          },
          {
            title: "Posts",
            href: "/admin/post",
            icon: ScrollText,
            variant: "ghost",
          },
          {
            title: "Promo",
            href: "/admin/promo",
            icon: Megaphone,
            variant: "ghost",
          },
          {
            title: "Profile",
            href: "/admin/profile",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Users",
            href: "/admin/users",
            icon: UsersRound,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
