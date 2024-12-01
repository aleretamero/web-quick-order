import React from "react";
import {
  Tooltip as DefaultTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  trigger: React.ReactNode;
  asChild?: boolean;
  side?: "top" | "right" | "bottom" | "left";
}

export const Tooltip = React.forwardRef<HTMLButtonElement, TooltipProps>(
  ({ text, trigger, asChild = false, side, className }, ref) => {
    return (
      <TooltipProvider>
        <DefaultTooltip>
          <TooltipTrigger asChild={asChild} ref={ref}>
            {trigger}
          </TooltipTrigger>
          <TooltipContent side={side} className={className}>
            <p>{text}</p>
          </TooltipContent>
        </DefaultTooltip>
      </TooltipProvider>
    );
  }
);
Tooltip.displayName = "Tooltip";
