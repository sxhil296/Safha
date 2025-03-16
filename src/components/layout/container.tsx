import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div className={cn("max-w-7xl mx-auto px-5", className)} {...props}>
      {children}
    </div>
  );
}
