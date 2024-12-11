import { ButtonHTMLAttributes, forwardRef } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TrashButtonIconProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const TrashButtonIcon = forwardRef<
  HTMLButtonElement,
  TrashButtonIconProps
>((props: TrashButtonIconProps, ref) => {
  return (
    <Button variant="outline" size="icon" {...props} ref={ref}>
      <Trash2 />
    </Button>
  );
});
TrashButtonIcon.displayName = "TrashButtonIcon";
