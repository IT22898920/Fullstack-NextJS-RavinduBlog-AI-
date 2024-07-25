import {
    FaRegHeart,
    FaRegUser,
    FaWallet,
  } from "react-icons/fa";
  import { HiShoppingBag } from "react-icons/hi2";
  import { MdOutlineRateReview } from "react-icons/md";
  import { IoSettingsOutline } from "react-icons/io5";
  
  export const routes = [
    {
      label: "My Profile",
      icon: FaRegUser,
      href: "/profile",
      color: "#0ea5e9",
    },
    {
      label: "All Posts",
      icon: MdOutlineRateReview,
      color: "#be185d",
      href: "/posts",
    },
    {
      label: "Contact",
      icon: FaRegHeart,
      color: "#c2410c",
      href: "/contact",
    },
    {
      label: "Login",
      icon: FaRegUser,
      color: "#10b981",
      href: "/login",
    },

  ];
  