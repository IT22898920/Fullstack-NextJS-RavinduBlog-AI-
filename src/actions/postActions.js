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

export const getPosts = async (params) => {
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 10;
  let sortDirection = params.order === "asc" ? 1 : -1;
  const skip = (page - 1) * limit;
  console.log(params);

  const query = {
    // "status": "Published",
    ...(params.search && {
      $or: [
        { title: { $regex: params.search, $options: "i" } },
        { category: { $regex: params.search, $options: "i" } },
      ],
    }),
    ...(params.status && { status: params.status }),
    ...(params.category && { category: params.category }),
    ...(params.isFeatured !== undefined && { isFeatured: params.isFeatured }),
  };

  try {
    await connectMongoDB();
    const posts = await Post.find(query)
      .populate("author", "name email image")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(query);
    const pageCount = Math.ceil(total / limit);

    const response = {
      total,
      pageCount,
      data: posts,
    };

    // return response;

    return JSON.stringify({
      total,
      pageCount,
      data: posts,
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};