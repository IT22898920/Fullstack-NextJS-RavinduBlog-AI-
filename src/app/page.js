"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data, status} = useSession();
  console.log(data, status);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="content">
        <h1 className="text-3xl font-bold red">Hello World</h1>

      </div>
    </main>
  );
}
