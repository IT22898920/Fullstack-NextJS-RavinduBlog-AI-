"use server";
import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/categoryModel";
import slugify from "slugify";
import { getErrorMessage } from "./userActions";
import { revalidatePath } from "next/cache";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import User from "models/userModel";
import Post from "@/models/postModel";
import { getServerSession } from "next-auth";

export const createPost = async (formData) => {
  const { id, title, slug, author, image, category, content, status } =
    formData;

  try {
    if (!title || !image || !category || !content) {
      return { error: "Please fill in all fields" };
    }
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return { error: "Unauthorized. Please login to continue" };
    }

    const user = await User.findOne({ email: session.user.email });

    const postExists = await Post.findOne({ title });
    const slugExists = await Post.findOne({ slug: slugify(title) });

        if (postExists || slugExists) {
          return { error: "Post name already exists." };
        }

    const post = await Post.create({
      title,
      slug,
      author: user?._id,
      image,
      category,
      content,
      status,
      isFeatured: false,
    });
        revalidatePath("/admin/post");

    return {
      message: "Post created successfully",
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
