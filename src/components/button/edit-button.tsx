import { ComponentPropsWithRef } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditButtonIconProps extends ComponentPropsWithRef<"button"> {}

export function EditButtonIcon(props: EditButtonIconProps) {
  return (
    <Button variant="outline" size="icon" {...props}>
      <Edit />
    </Button>
  );
}
