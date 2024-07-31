import { cn } from "@/lib/utils";
import React from "react";

export default function PageTitle({ title, className }) {
  return <h1 className={cn("text-2xl font-semibold", className)}>{title}</h1>;
}

export function SectionTitle({ title, bgColor, textColor }) {
  return (
    <div
      className={`h-10 p-2 bg-gray-300 text-base border-dark mb-2 ${bgColor}`}
    >
      <p className={`text-gray-800 text-base font-semibold ${textColor}`}>
        {title}
      </p>
    </div>
  );
}
