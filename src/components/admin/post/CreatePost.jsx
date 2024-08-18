import React from "react";
import PostForm from "./PostForm";
import { getCategories } from "actions/categoryActions";

// https://i.ibb.co/QmCgRsL/NextJS.png

async function CreatePost() {
  const allCategories = await getCategories();
  const categories = JSON.parse(allCategories);

  return (
    <div className="relative">
      <span className="flex-between">
        <h4>Create New Post</h4>
      </span>
      <PostForm categories={categories} />
    </div>
  );
}

export default CreatePost;
