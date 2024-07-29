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


const FormSchema = z
  .object({
    password: z.string().min(6, {
      message: "password must be at least 6 characters.",
    }),
    cpassword: z.string(),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords must match",
    path: ["cpassword"],
  });

export default function ResetForm({ resetToken }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      cpassword: "",
    },
  });

  function onSubmit(values) {
    const { password } = values;
    console.log(values);
  }

  return (
    <div className="grid place-items-center h-screen">
      <Card className="w-[450px] shadow-lg border-t-4 border-blue-500">
        <CardHeader>
          <CardTitle className="text-center text-color-secondary">
            Reset Password
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
              <Button className="w-full mt-2" type="submit">
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Separator className="h-[0.5px] my-2" />
          <p className="text-sm">
            <Link href={"/"}>&larr; Back To Home</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
