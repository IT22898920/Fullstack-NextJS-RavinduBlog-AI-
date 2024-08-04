"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { routes } from "./data";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { cn } from "../../lib/utils";

const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <div className=" flex flex-col h-full text-white">
      <ScrollArea className="h-[70vh]">
        <div className="space-y-0">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-200"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon
                  className={cn("h-5 w-5 mr-3", route.color)}
                  color={route.color}
                />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
        <Separator className="bg-zinc-300 mt-2" />
      </ScrollArea>
    </div>
  );
};

export default MobileMenu;
