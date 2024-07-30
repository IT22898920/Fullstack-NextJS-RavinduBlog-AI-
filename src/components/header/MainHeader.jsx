"use client";
import { useEffect, useState } from "react";
import React from 'react'
import { FaCartArrowDown, FaPenToSquare, FaRegUser } from "react-icons/fa6";
import HeaderSearch from './HeaderSearch';
import Link from "next/link";
import { ModeToggle } from '../widgets/ModeToggle';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiLogin, CiLogout } from "react-icons/ci";
import { Button } from "../ui/button";
import { LuUser2, LuUserPlus2 } from "react-icons/lu";
import { signOut } from "next-auth/react";



export const logo = (
  <Link href={"/"}>
  <div className="flex-start w-[150px]">
    <h2 className="text-color-secondary text-3xl">Ravindu</h2>
    <FaPenToSquare size={40} color={"blue"} className="p-0" />
  </div>
  </Link>
);


const MainHeader = () => {
  const [scrollPage, setScrollPage] = useState(false);

  useEffect(() => {
    const fixNavbar = () => {
      if (window.scrollY > 50) {
        setScrollPage(true);
      } else {
        setScrollPage(false);
      }
    };

    // Add event listener when component mounts
    window.addEventListener("scroll", fixNavbar);


  }, []);

  return (
    <header
      className={
        scrollPage
          ? `w-full fixed top-0 transition duration-500 ease-in-out z-50`
          : null
      }
    >

      <div className="bg-color-white">
        <div className="container">
          <div className="h-16  flex justify-between items-center ">
            <div className="logo cursor-pointer">
              {logo}
            </div>
            <HeaderSearch />
            <nav className="mr-[20px]">
              <ul className="flex-center space-x-5">
                <li>
                <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Link
                          href=""
                          className="flex-center space-x-1 outline-none dark:text-yellow-300"
                        >
                          {/* <ShowOnLogout> */}
                          <FaRegUser />
                            <span>Account</span>
                          {/* </ShowOnLogout> */}
                          {/* <ShowOnLogin>
                            <UserAvatar />
                          </ShowOnLogin> */}
                          <MdKeyboardArrowDown size={20} />
                        </Link>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-52 p-0 m-0">
                        <DropdownMenuSeparator />
                        {/* <ShowOnLogout> */}
                          <DropdownMenuItem>
                            <Button variant={"destructive"} className="w-full">
                              <Link
                                href={"/login"}
                                className="text-white"
                              >
                                <span className="flex-center space-x-1">
                                  <CiLogin />
                                  <span>Login</span>
                                </span>
                              </Link>
                            </Button>
                          </DropdownMenuItem>
                        {/* </ShowOnLogout> */}

                        <DropdownMenuItem>
                          <Link href={"/profile"} className="dark:text-yellow-300">
                            <span className="flex-center space-x-2">
                              <FaRegUser />
                              <span>My Profile</span>
                            </span>
                          </Link>
                        </DropdownMenuItem>

                        {/* <AdminOnlyLink> */}
                          <DropdownMenuItem>
                            <Link
                              href={"/admin"}
                              className="dark:text-yellow-300"
                            >
                              <span className="flex-center space-x-1">
                                <LuUser2 />
                                <span>Dashboard</span>
                              </span>
                            </Link>
                          </DropdownMenuItem>
                        {/* </AdminOnlyLink> */}

                        {/* <ShowOnLogin> */}
                          <DropdownMenuItem>
                            <Button
                              variant={"destructive"}
                              className="w-full"
                              onClick={() => signOut({ callbackUrl: "/login"})}
                            >
                              Logout
                            </Button>
                          </DropdownMenuItem>
                        {/* </ShowOnLogin> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                </li>
                <li>
                  <Link href={'/account'} className="dark:text-yellow-300">All Posts</Link>
                </li>
                <li>
                  <Link href={'/account'} className="dark:text-yellow-300">Contact</Link>
                </li>
                <li>
                  <ModeToggle />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>

  )
}

export default MainHeader