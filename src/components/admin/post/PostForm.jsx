"use client";
import React, { useEffect, useRef, useState } from "react";
import { LoadingButton } from "components/widgets/Loader";
import { Button } from "components/ui/button";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "components/ui/input";
import { toast } from "react-toastify";
import { createCat, updateCategory } from "actions/categoryActions";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import JoditEditor from "jodit-react";
import { BsRobot, BsTrash } from "react-icons/bs";
import slugify from "slugify";
import { createPost } from "actions/postActions";
import { useSession } from "next-auth/react";
import { cn } from "lib/utils";
import Image from "next/image";

const FormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  slug: z.string().optional(),
  author: z.string().optional(),
  // image: z.string().url(),
  image: z.string().optional(),
  category: z.string().min(3, {
    message: "Category is required.",
  }),
  content: z.string().min(3, {
    message: "Content must be at least 100 characters.",
  }),
  status: z.string().min(3, {
    message: "Post Status is required.",
  }),
});

const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;
const upload_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
const url = "https://api.cloudinary.com/v1_1/dqwgbpf2d/image/upload";

function PostForm({ categories }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  // Image upload
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const editor = useRef(null);
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const id = searchParams.get("id");
  // const itemName = searchParams.get("itemName");

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      slug: "",
      author: "",
      image: "https://i.ibb.co/30VbMPg/desktop.jpg",
      category: "",
      content: "This is a great post",
      status: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    const fetchPost = async () => {
      const res = await getPost({ id });
      // console.log(res);
      const post = JSON.parse(res);
      form.setValue("title", post?.title);
      form.setValue("slug", post?.slug);
      form.setValue("author", post?.author?._id);
      form.setValue("image", post?.image);
      form.setValue("category", post?.category);
      form.setValue("content", post?.content);
      form.setValue("status", post?.status);
      setImageLink(post?.image);
    };
    if (id) {
      fetchPost();
    }
  }, [id, form, slug]);

  // Upload
  const date = new Date();
  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    if (imageLink !== "") {
      return toast.error(
        "Please delete image below before selecting another one"
      );
    }
    setImage(e.target.files[0]);
    setImageName(
      date.getTime().toString() +
        "-" +
        e.target.files[0].name.replaceAll(" ", "_")
    );
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // Save Image
  const uploadImage = async (e) => {
    e.preventDefault();
    let imageURL;
    setIsUploading(true);

    try {
      if (
        image !== null &&
        (image.type === "image/jpeg" ||
          image.type === "image/jpg" ||
          image.type === "image/png")
      ) {
        const newImage = new FormData();
        newImage.append("file", image);
        newImage.append("cloud_name", cloud_name);
        newImage.append("upload_preset", upload_preset);

        // Save image to cloudinary
        const response = await fetch(url, { method: "post", body: newImage });
        const imgData = await response.json();
        console.log(imgData);
        imageURL = imgData.url.toString();
      }

      //   save image to mongoDB
      // After successful image upload
      setImageLink(imageURL);
      form.setValue("image", imageURL); // Make sure this line is executed
      setImagePreview(null);
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
      toast.error(error.message);
    }
  };

  function resetFileInput() {
    console.log("resetFileInput", fileInputRef.current);
    fileInputRef.current = null;
    setImage("");
    setImageLink("");
    setImagePreview(null);
  }
  // console.log(id);
  // console.log(form.getValues("image"));
  //  console.log(form.getValues());
async function onSubmit(values) {
  const { title, author, image, category, content, status, slug } = values;
      console.log("Image URL: ", image);

  if (!image) {
    return toast.error("Please upload an image");
  }
  const formData = {
    id: id ? id : "",
    title,
    slug: id ? slug : slugify(title, { lower: true, trim: true }),
    author,
    image,
    category,
    content,
    status,
  };
  console.log(formData);
  if (id !== null) {
    console.log("updating post");
    const res = await updatePost(formData);
    if (res?.error) {
      toast.error(res?.error);
    }
    if (res?.message) {
      toast.success(res?.message);
      router.push("/admin/post");
    }
    form.reset();
  } else {
    console.log("creating post");
    const res = await createPost(formData);
    console.log(res);
    if (res?.error) {
      toast.error(res?.error);
    }
    if (res?.message) {
      toast.success(res?.message);
      router.push("/admin/post");
    }
    await form.reset();
  }
}

  const handleBlur = (content) => {
    form.setValue("content", content);
  };

  const [showAI, setShowAI] = useState(false);

  return (
    <div className="text-color-text">
      {/* SUPABLOG AI */}
      <div
        className={cn(
          "fixed right-0 top-16 bg-blue-950 w-[90vw] md:w-[60vw] h-full rounded-md transition-all duration-500 ease-in-out z-50",
          showAI ? "right-0" : "right-[-90vw]"
        )}
      >
        {/* <Chat /> */}
      </div>
      <div
        onClick={() => setShowAI(false)}
        className={cn(
          "overlay fixed right-0 top-16 bg-zinc-800/50 w-[100vw] h-full cursor-pointer transition-all duration-500 ease-in-out z-10",
          showAI ? "right-0" : "right-[-100vw]"
        )}
      ></div>
      {/* SUPABLOG AI */}
      {/* <Chat /> */}
      {/* <Chat /> */}
      {/* <Chat /> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          <div className="w-full max-w-[500px]">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-yellow-500">
                    Post Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      {...field}
                      className="w-full max-w-[500px]"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-yellow-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full max-w-[500px]">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-yellow-500">
                    Category
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {categories?.length > 0 ? (
                          <>
                            {categories?.map((item) => {
                              const { name } = item;

                              return (
                                <SelectItem key={name} value={name}>
                                  {name}
                                </SelectItem>
                              );
                            })}
                          </>
                        ) : (
                          <SelectItem value="apple">No item found</SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage className="dark:text-yellow-500" />
                </FormItem>
              )}
            />
          </div>

          <Label className="dark:text-yellow-500">Post Image</Label>
          <Card className="p-2 w-full max-w-[500px]">
            {imageLink === "" && (
              <p className="req">
                <code className="text-sm --color-dark">
                  File type: jpg, png | Max size: 2MB
                </code>
                <input
                  className="border border-blue-300 p-1 w-full"
                  type="file"
                  accept="image/png , image/jpeg, image/jpg"
                  name="image"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  disabled={imageLink === "" ? false : true}
                />
              </p>
            )}
            {/* Preview Image */}
            {imagePreview !== null && imageLink === "" ? (
              <>
                <div className="my-2">
                  <Image
                    src={imagePreview}
                    alt="product"
                    width={"500"}
                    height="400"
                    className="border-[2px] border-gray-300 rounded-md"
                  />
                </div>
                {isUploading ? (
                  <LoadingButton
                    btnText="Uploading..."
                    btnClass="w-full"
                    btnVariant="default"
                  />
                ) : (
                  <span className="flex-between">
                    <Button variant="destructive" onClick={resetFileInput}>
                      Remove Image
                    </Button>
                    <Button
                      variant="default"
                      className=""
                      onClick={uploadImage}
                    >
                      Upload Image
                    </Button>
                  </span>
                )}
              </>
            ) : (
              <p></p>
            )}

            {imageLink && (
              <>
                <p className="--text-sm">
                  To add a new image, first delete the one below
                </p>
                <span
                  className="flex-between my-2"
                  style={{ border: "1px solid grey" }}
                >
                  <Image
                    src={imageLink}
                    alt="adImage"
                    width="400"
                    height="250"
                    className="border-[2px] border-gray-300 rounded-md"
                  />
                  <BsTrash
                    color="red"
                    size={"25"}
                    onClick={resetFileInput}
                    style={{ cursor: "pointer" }}
                  />
                </span>
              </>
            )}
          </Card>

          <div className="w-full max-w-[500px]">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select one" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col space-y-2 relative">
            <div className="flex-between">
              <Label className="dark:text-yellow-500">Post Content</Label>
              <Button
                type="button"
                variant={"destructive"}
                className=""
                onClick={() => setShowAI(true)}
              >
                <BsRobot size={24} /> &nbsp; SupaBlog AI
              </Button>
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className="dark:text-yellow-500">
                    Content
                  </FormLabel> */}
                  <FormControl>
                    <JoditEditor
                      ref={editor}
                      value={field.value}
                      // onChange={newContent => field.onChange(newContent)}
                      // onchange={field.onChange}
                      onBlur={(content) => handleBlur(content)}
                      tabIndex={1}
                      config={{
                        height: "600px",
                        style: {
                          color: "#3f3f46",
                        },
                        useCommandShortcut: true,
                        askBeforePasteHTML: false,
                      }}
                    />
                  </FormControl>
                  <FormMessage className="dark:text-yellow-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="my-10">
            {isLoading ? (
              <LoadingButton
                btnText="Loading..."
                btnClass="w-full max-w-[500px]"
                btnVariant="default"
              />
            ) : (
              <Button type="submit" className="text-white w-full max-w-[500px]">
                {id ? "Update Post" : "Create Post"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PostForm;
