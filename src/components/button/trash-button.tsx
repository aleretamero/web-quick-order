import { ComponentPropsWithRef } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrashButtonIconProps extends ComponentPropsWithRef<"button"> {}

export function TrashButtonIcon(props: TrashButtonIconProps) {
  return (
    <Button variant="outline" size="icon" {...props}>
      <Trash2 />
    </Button>
  );
}
