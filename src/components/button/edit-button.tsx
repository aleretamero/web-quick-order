import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrashButtonIconProps {
  onClick?: () => void;
}

export function EditButtonIcon({ onClick }: TrashButtonIconProps) {
  return (
    <Button variant="outline" size="icon" onClick={onClick}>
      <Edit />
    </Button>
  );
}
