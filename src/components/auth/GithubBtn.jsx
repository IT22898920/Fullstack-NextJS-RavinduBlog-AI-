import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const GithubBtn = () => {
  return (
    <Button
      variant={"outline"}
      className="w-full space-x-2"
      onClick={() => signIn("github")}
    >
      <span>Sign In With GitHub</span>
      <Image
        src="/images/github-logo.png"
        height={20}
        width={20}
        alt="google logo"
      />
    </Button>
  );
};

export default GithubBtn;
