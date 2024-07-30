"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MdMailOutline, MdPassword } from "react-icons/md";
import Link from "next/link";
import { Separator } from "../ui/separator";
import GoogleBtn from "./GoogleBtn";
import GithubBtn from "./GithubBtn";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { registerUser } from "actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingButton } from "../widgets/Loader";

const FormSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters.",
    }),
    email: z.string().email().min(6, {
      message: "Email must be at least 6 characters.",
    }),
    password: z.string().min(6, {
      message: "password must be at least 6 characters.",
    }),
    cpassword: z.string(),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords must match",
    path: ["cpassword"],
  });

export default function RegisterForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values) {
    const { name, email, password } = values;
    console.log(values);
    const formData = {
      name,
      email,
      password,
    };
    const res = await registerUser(formData);

    if (res?.error) {
      // console.log(res.error);
      return toast.error(res.error);
    }
    if (res?.message) {
      // console.log(res.message);
      toast.error(res.message);
      router.push("/login");
    }
    form.reset();
  }

  return (
    <div className="grid place-items-center h-screen">
      <Card className="w-[450px] shadow-lg border-t-4 border-blue-500">
        <CardHeader>
          <CardTitle className="text-center text-color-secondary">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* <div className="mb-4 flex flex-col items-center space-y-2">
            <GoogleBtn />
            <GithubBtn />
          </div>
          <p className="text-sm text-center mb-2">
            Or Login with email & password
          </p> */}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="border border-white rounded-md p-1 space-y-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute left-2 top-2.5">
                      <FaRegUser size={20} color="#333" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="pl-8 w-full"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute left-2 top-2.5">
                      <MdMailOutline size={20} color="#333" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="pl-8 w-full"
                        placeholder="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute left-2 top-2.5">
                      <MdPassword size={20} color="#333" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="pl-8 w-full"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute left-2 top-2.5">
                      <MdPassword size={20} color="#333" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="pl-8 w-full"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isSubmitting ? (
                <LoadingButton
                  btnText="Submitting..."
                  btnClass="w-full"
                  btnVariant="outline"
                />
              ) : (
                <Button className="w-full mt-2" type="submit">
                  Register
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="w-full flex-center ">
            <p className="text-sm">
              Already have an account? <Link href={"/login"}>Login</Link>
            </p>
          </div>
          <Separator className="h-[0.5px] my-2" />
          <p className="text-sm">
            <Link href={"/"}>&larr; Back To Home</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
