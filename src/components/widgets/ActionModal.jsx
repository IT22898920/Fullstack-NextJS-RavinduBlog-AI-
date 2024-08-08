"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { Separator } from "../ui/separator";

const ActionModal = ({
  children,
  trigger,
  title,
  desc,
  btnText,
  onClick,
  open,
  setOpen,
}) => {
  // const [keyword, setKeyword] = useState("");

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="h-[60vh] overflow-y-scroll">
        <AlertDialogHeader className="my-0 py-0 border-b-[1px] border-gray-300 ">
          <h4 className="text-lg">{title}</h4>
          <p className="text-sm">{desc}</p>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter className="my-0 pt-1 border-t-[1px] border-gray-300 ">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {btnText && (
            <AlertDialogAction onClick={onClick}>{btnText}</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActionModal;
