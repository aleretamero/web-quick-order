import { ComponentPropsWithRef } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrashButtonIconProps extends ComponentPropsWithRef<"button"> {}

export function EditButtonIcon(props: TrashButtonIconProps) {
  return (
    <Button variant="outline" size="icon" {...props}>
      <Edit />
    </Button>
  );
}
