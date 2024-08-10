"use server";
import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/categoryModel";
import slugify from "slugify";
import { getErrorMessage } from "./userActions";

export const createCat = async (formData) => {
  const { name } = formData;
  console.log(formData);
  try {
    if (!name) {
      return { error: "Please add a category name" };
    }

    await connectMongoDB();

    const categoryExists = await Category.findOne({ name });
    const slugExists = await Category.findOne({ slug: slugify(name) });

    if (categoryExists || slugExists) {
      return { error: "Category name or slug already exists." };
    }

    const category = await Category.create({
      name,
      slug: slugify(name),
    });

    revalidatePath("/admin/category");
    // redirect('/blogs')
    return {
      message: "Category created successfully",
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const getCategories = async () => {
  try {
    await connectMongoDB();
    const categories = await Category.find().sort({ createdAt: -1 });
    return JSON.stringify(categories);
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const deleteCategory = async (id) => {
  try {
    await connectMongoDB();
    const category = await Category.findByIdAndDelete(id);
    revalidatePath("/admin/category");
    return {
      message: "Category deleted successfully",
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};