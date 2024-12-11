import { ComponentPropsWithRef } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlusButtonIconProps extends ComponentPropsWithRef<"button"> {}

export function PlusButtonIcon(props: PlusButtonIconProps) {
  return (
    <Button variant="outline" size="icon" {...props}>
      <Plus />
    </Button>
  );
}
