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

export default function ForgotForm() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  function onSubmit(values) {
    const { name, email, password } = values;
    console.log(values);
  }

  return (
    <div className="grid place-items-center h-screen">
      <Card className="w-[450px] shadow-lg border-t-4 border-blue-500">
        <CardHeader>
          <CardTitle className="text-center text-color-secondary">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
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

              <Button variant="default" type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm mt-4 self-end">
            Already have an account? <Link href={"/login"}>Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
