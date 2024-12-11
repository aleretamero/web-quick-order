import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
}

export function PageContainer({
  children,
  scrollable = true,
  className,
}: PageContainerProps) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className={cn("h-[calc(100dvh-52px)]", className)}>
          <div className="h-full p-2 sm:p-4">{children}</div>
        </ScrollArea>
      ) : (
        <div className={cn("h-full p-2 sm:p-4", className)}>{children}</div>
      )}
    </>
  );
}
