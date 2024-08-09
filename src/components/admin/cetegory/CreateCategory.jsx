"use client";
import ActionModal from "components/widgets/ActionModal";
import React, { useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "components/ui/input";
import { toast } from "react-toastify";
import { createCat } from "actions/categoryActions";

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Category name must be at least 3 characters.",
  }),
});

export default function CreateCategory() {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values) {
    console.log(values);
    const { name } = values;
    const res = await createCat(values);
    console.log(res);
    if (res?.error) {
      toast.error(res?.error); // Display error message if there's an error
    }
    if (res?.message) {
      toast.success(res?.message); // Display success message if category creation is successful
    }
    form.reset();
    setOpen(false);
  }

  return (
    <div>
      <ActionModal
        title="Create Category"
        desc="Are you sure you want to create this category?"
        trigger={
          <Button variant={"default"} className="text-white">
            Create.
          </Button>
        }
        open={open}
        setOpen={setOpen}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <LoadingButton
                btnText="Loading..."
                btnClass="w-full"
                btnVariant="default"
              />
            ) : (
              <Button type="submit" className="w-full">
                Create Category
              </Button>
            )}
          </form>
        </Form>
      </ActionModal>
    </div>
  );
}
