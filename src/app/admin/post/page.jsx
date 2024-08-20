import { Button } from '@/components/ui/button';
import { getPosts } from 'actions/postActions';
import ListPost from 'components/admin/post/ListPost';
import { Separator } from 'components/ui/separator';
import PageTitle from 'components/widgets/PageTitle';
import Link from 'next/link';
import React from 'react';

export default async function PostPage({ searchParams }) {
  const search = searchParams?.search || "";
  const page = searchParams?.page || "";

  const allPost = await getPosts({
    page: page,
    limit: 5,
    search: search,
    status: "",
    category: "",
    // isFeatured: true,
  });
  const allPosts = JSON.parse(allPost);
  console.log("post data", allPosts);

  return (
    <div className="bg-color-grey">
      <div className="flex justify-between">
        <PageTitle title="Posts" />
        <Link href="/admin/create-post" className="text-red-500">
          <Button className="text-white">Create Post</Button>
        </Link>
      </div>
      <Separator className="my-4 border-b-[2px] border-color-light-blue" />
      {allPosts?.hasOwnProperty("total") && (
      <ListPost
        // data={allPosts}
        total={allPosts?.total}
        pageNumber={allPosts?.pageCount}
        posts={allPosts?.data}
      />
      )}
    </div>
  );
}