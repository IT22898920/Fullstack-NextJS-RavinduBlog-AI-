"use client";
import React from "react";
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
import { AiOutlineEye } from "react-icons/ai";
import DeleteModal from "components/widgets/DeleteModal";
import { toast } from "react-toastify";
import { deleteCategory } from "actions/categoryActions";
import { useRouter } from "next/navigation";

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
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function ListCategory({ categories }) {
  const router = useRouter();

    const onDeleteCat = async (id) => {
      console.log(id);
      const res = await deleteCategory(id);
      if (res?.error) {
        toast.error(res.error);
      } else if (res?.message) {
        toast.success(res.message);
      }
    };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="border-b-[1px] border-gray-400">
            <TableHead className="w-[100px]">s/n</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-color-text">
          {categories?.map((cat, index) => (
            <TableRow key={index} className="border-b-[1px] border-color-text">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{cat.name}</TableCell>
              <TableCell className="flex-start space-x-2">
                <span>
                  <AiOutlineEye
                    size={25}
                    // color={"purple"}
                    className="text-purple-500 dark:text-white cursor-pointer"
                    onClick={() =>
                      router.replace(
                        `/admin/category/?id=${cat._id}&itemName=${cat.name}`
                      )
                    }
                  />
                </span>
                <span>
                  <DeleteModal
                    title="Delete Category"
                    desc="Warning: This action cannot be undone. This will
                        permanently delete your category and remove
                        your data from our servers."
                    pass={"delete"}
                    onClick={() => onDeleteCat(cat._id)}
                  />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
