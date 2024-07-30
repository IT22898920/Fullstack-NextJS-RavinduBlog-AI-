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
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "../widgets/Loader";

const FormSchema = z.object({
  email: z.string().min(6, {
    message: "Email must be at least 6 characters.",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
});

export default function LoginForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values) {
    const { email, password } = values;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid email or password");
        return;
      }
      console.log(res);
      toast.success("Login Successful");
      router.replace("/");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <Card className="w-[450px] shadow-lg border-t-4 border-blue-500">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col items-center space-y-2">
            <GoogleBtn />
            <GithubBtn />
          </div>
          <p className="text-sm text-center mb-2">
            Or Login with email & password
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="border border-white rounded-md p-1 space-y-2"
            >
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
              {isSubmitting ? (
                <LoadingButton
                  btnText="Submitting..."
                  btnClass="w-full"
                  btnVariant="outline"
                />
              ) : (
                <Button className="w-full mt-2" type="submit">
                  Login
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="w-full flex items-center justify-between ">
            <p className="text-left">
              <Link className="text-sm" href={"/forgot"}>
                Forgot Password
              </Link>
            </p>
            <p className="text-sm">
              New User? <Link href={"/register"}>Register</Link>
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
