"use client";
import React from "react";
import FooterLinks from "./FooterLinks";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname?.includes("/admin") ||
      pathname?.includes("/login") ||
      pathname?.includes("/register") ||
      pathname?.includes("/forgot") ||
      pathname?.includes("/reset") ? null : (
        <FooterLinks />
      )}
      <div className="bg-color-dark-blue h-14 --center-all">
        <div className="container flex-center py-3">
          <p className="text-sm text-white">
            © RavinduBlog - All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
