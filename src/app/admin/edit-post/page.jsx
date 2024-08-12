import { Button } from '@/components/ui/button';
import EditPost from 'components/admin/post/EditPost';
import { Separator } from 'components/ui/separator';
import PageTitle from 'components/widgets/PageTitle';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div className="bg-color-grey">
      <div className="flex justify-between">
        <PageTitle title="Edit Post" />
        <Link href="/admin/post" className="color-white">
          <Button variant={"default"} className="text-white">
            View Post
          </Button>
        </Link>
      </div>
      <Separator className="my-4 border-b-[2px] border-color-light-blue" />
      <EditPost />
    </div>
  );
}