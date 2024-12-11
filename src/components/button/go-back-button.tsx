import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { useNavigate } from "react-router";

export interface GoBackButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const GoBackButton = forwardRef<HTMLButtonElement, GoBackButtonProps>(
  (props: GoBackButtonProps, ref) => {
    const navigate = useNavigate();

    return (
      <Button
        variant="outline"
        size="icon"
        {...props}
        ref={ref}
        onClick={() => navigate(-1)}
      >
        <Undo2 />
      </Button>
    );
  }
);
GoBackButton.displayName = "GoBackButton";
