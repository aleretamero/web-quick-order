import { ButtonHTMLAttributes, forwardRef } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface EditButtonIconProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const EditButtonIcon = forwardRef<
  HTMLButtonElement,
  EditButtonIconProps
>((props: EditButtonIconProps, ref) => {
  return (
    <Button variant="outline" size="icon" {...props} ref={ref}>
      <Edit />
    </Button>
  );
});
EditButtonIcon.displayName = "EditButtonIcon";
