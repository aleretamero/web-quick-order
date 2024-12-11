import { ButtonHTMLAttributes, forwardRef } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PlusButtonIconProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const PlusButtonIcon = forwardRef<
  HTMLButtonElement,
  PlusButtonIconProps
>((props: PlusButtonIconProps, ref) => {
  return (
    <Button variant="outline" size="icon" {...props} ref={ref}>
      <Plus />
    </Button>
  );
});
PlusButtonIcon.displayName = "PlusButtonIcon";
