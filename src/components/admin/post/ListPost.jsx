"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "components/ui/button";

export default function ListPost({ total, pageNumber, posts }) {
  const [action, setAction] = useState("");

  const applyAction = async () => {
    console.log(action);
    if (action === "") {
      toast.error("Please select an action");
      return;
    }
    if (selectedItems.length < 1) {
      toast.error("Please select an item");
      return;
    }
    if (action === "Delete") {
      console.log(selectedItems);
      const formData = {
        itemIds: selectedItems,
      };
      console.log("form data", formData);
      const res = await deleteManyPost(formData);
      console.log(res);
      if (res?.error) {
        toast.error(res?.error);
      }
      if (res?.message) {
        toast.success(res?.message);
        // router.push("/admin/post");
      }
    }
    if (action === "Draft" || action === "Published") {
      console.log(selectedItems);
      const formData = {
        itemIds: selectedItems,
        newStatus: action,
      };
      console.log("form data", formData);
      const res = await updatePostStatus(formData);
      console.log(res);
      if (res?.error) {
        toast.error(res?.error);
      }
      if (res?.message) {
        toast.success(res?.message);
        // router.push("/admin/post");
      }
    }
    setSelectedItems([]);
  };

  return (
    <div className=" ">
      <div className="flex flex-between border-b-[1px] border-gray-400 pb-3">
        <div className="flex flex-start space-x-2">
          <div className="flex space-x-1 border-r-[1px]  pr-3">
            <Select value={action} onValueChange={(e) => setAction(e)}>
              <SelectTrigger className="text-color-dark">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Actions</SelectLabel>
                  <SelectItem value="Delete">Delete</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="default" onClick={applyAction}>
              Apply
            </Button>
          </div>
          <p className="text-color-dark font-semibold">{total} Posts</p>
        </div>
      </div>
    </div>
  );
}
