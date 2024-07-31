"use client";
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Profile() {
  const { data: session, status } = useSession();
  console.log(session);

  return (
    <div className="w-[450px] space-y-2">
      <div className="--center-all">
        <UserAvatar />
      </div>
      <Input
        type="text"
        placeholder="Name"
        value={session?.user?.name}
        className="text-color-dark"
      />
      <Input
        type="email"
        placeholder="Email"
        value={session?.user?.email}
        className="text-color-dark"
      />
      <Button
        className="w-full"
        variant={"destructive"}
        onClick={() => signOut()}
      >
        Logout
      </Button>
    </div>
  );
}

export function UserAvatar() {
  const { data: session } = useSession();

  return (
    <>
      <div className="--center-all">
        <Avatar>
          <AvatarImage src={session?.user?.image} />
          <AvatarFallback>{session?.user?.name?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}

export default Profile;
