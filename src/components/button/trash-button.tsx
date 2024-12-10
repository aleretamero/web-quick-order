import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrashButtonIconProps {
  onClick?: () => void;
}

export function TrashButtonIcon({ onClick }: TrashButtonIconProps) {
  return (
    <Button variant="outline" size="icon" onClick={onClick}>
      <Trash2 />
    </Button>
  );
}
