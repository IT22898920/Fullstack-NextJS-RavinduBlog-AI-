"use client";

import Image from "next/image";
// import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const GoogleBtn = () => {
  return (
    <Button
      variant={"outline"}
      className="w-full space-x-2"
      // onClick={() => signIn("google")}
    >
      <span>Sign In With Google</span>
      <Image
        src="/images/google-logo.png"
        height={20}
        width={20}
        alt="google logo"
      />
    </Button>
  );
};

export default GoogleBtn;
