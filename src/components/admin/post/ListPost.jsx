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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Search from "components/widgets/Search";
import { cn } from "lib/utils";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  }

];
export default function ListPost({ total, pageNumber, posts }) {
  const [action, setAction] = useState("");
  const [search, setSearch] = useState("");

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
        <Search
          placeholder="Search date, amount, status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b-[1px] border-color-text">
            <TableHead className="w-[100px]">
              <input
                type="checkbox"
                className="form-checkbox text-purple-600 h-4 w-4 mr-2"
                //checked={selectedItems.length === posts?.length}
                // onChange={() => handleSelectAll()}
              />
              sn
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-color-text">
          {posts?.map((post, index) => (
            <TableRow
              key={index}
              className={cn("border-b-[1px] border-gray-400")}
            >
              <TableCell className="font-medium">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-600 h-4 w-4 mr-2"
                  // checked={isSelected(post._id)}
                  // onChange={() => handleCheckboxChange(post._id)}
                />
                {/* {index + 1 + (currentPage?.current - 1) * Number(5)} */}
              </TableCell>
              <TableCell className={post?.isFeatured && "bg-blue-400"}>
                {/* {shortenText(post?.title, 30)} */}
              </TableCell>
              <TableCell>{post?.category}</TableCell>
              <TableCell>{post?.status}</TableCell>
              <TableCell>{post?.author?.name}</TableCell>
              <TableCell>{post?.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
