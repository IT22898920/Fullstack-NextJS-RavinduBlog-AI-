"use client";
import ActionModal from "components/widgets/ActionModal";
import React, { useState } from "react";
import { LoadingButton } from "components/widgets/Loader";
import { Button } from "components/ui/button";

export default function CreateCategory() {
  const [open, setOpen] = useState(false);

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
      ></ActionModal>
    </div>
  );
}
