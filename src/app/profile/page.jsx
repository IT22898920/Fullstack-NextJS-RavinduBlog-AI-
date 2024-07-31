import Profile from "@/components/profile/Profile";
import { Separator } from "components/ui/separator";
// import PageTitle from "components/widgets/PageTitle";
import React from "react";

export default function page() {
  return (
    <section>
      <div className="container">
        {/* <PageTitle title="User Profile" /> */}
        <Separator className="my-4 border-b-[2px] border-gray-300" />
        <Profile />
      </div>
    </section>
  );
}
