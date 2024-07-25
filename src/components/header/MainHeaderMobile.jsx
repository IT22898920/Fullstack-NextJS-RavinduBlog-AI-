"use client";
import React, { useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { logo } from "./MainHeader";
import MobileMenu from "./MobileMenu";
import { Separator } from "../ui/separator";
import { ModeToggle } from "components/widgets/ModeToggle";
import { Button } from "../ui/button";
import { MdOutlineSearchOff } from "react-icons/md";
import { cn } from "lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import HeaderSearch from './HeaderSearch';
import { IoMdClose } from 'react-icons/io';
const MainHeaderMobile = () => {

  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="w-full max-w-[100vh] bg-color-dark-blue relative">
      <div className="container h-[100px] flex justify-between items-center">
        <div className="flex justify-center items-center space-x-3">
          <Sheet>
            <SheetTrigger asChild>
              <AiOutlineMenu
                size={28}
                color="white"
                className="cursor-pointer"
              />
            </SheetTrigger>

            <SheetContent
              side={"left"}
              className="w-[300px] bg-color-dark-blue p-3"
            >
              <SheetHeader className="relative">
                {logo}
              </SheetHeader>
              <Separator className="bg-zinc-300 mt-2" />

              <div className="grid gap-4 py-4">
                <MobileMenu />
              </div>
              <div className="grid gap-4 py-4">
                <ModeToggle />
              </div>
              <SheetFooter>
                <Button
                  type="button"
                  variant={"destructive"}
                  className="w-full"
                  // onClick={logoutUser}
                >
                  Logout
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <>{logo}</>
        </div>
        <nav className="mr-[20px]">
          <ul className="text-white flex-center space-x-5">
            <li>
              {showSearch ? (
                <MdOutlineSearchOff
                  size={28}
                  className="cursor-pointer hover:text-color-secondary"
                  onClick={() => setShowSearch(false)}
                />
              ) : (
                <FiSearch
                  size={23}
                  className="cursor-pointer hover:text-color-secondary"
                  onClick={() => setShowSearch(true)}
                />
              )}
            </li>
            {/* <ShowOnLogin>
              <li>
                <Link href="/" className="text-white">
                  <UserAvatar />
                </Link>
              </li>
            </ShowOnLogin> */}
          </ul>
        </nav>
      </div>
      <div
        className={cn(
          "w-full h-16 bg-gray-200 border-b-2 border-gray-400 absolute right-0 transition-all duration-500 ease-in-out z-50",
          showSearch ? "top-[100px]" : "top-[-100px]"
        )}
      >
        <div className="flex-center h-16">
          <HeaderSearch />
          <IoMdClose
            size={28}
            className="cursor-pointer text-color-secondary"
            onClick={() => setShowSearch(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default MainHeaderMobile