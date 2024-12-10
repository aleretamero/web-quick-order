import { ErrorMessage } from "@/components/feedback/error-message.component";
import { toast } from "sonner";

export function useToast() {
  return {
    success: (message: string | string[]) => toast.success(message),
    error: (message: string | string[]) => toast.error(<ErrorMessage message={message} />), // prettier-ignore
    warning: (message: string | string[]) => toast.warning(message),
    info: (message: string | string[]) => toast.info(message),
  };
}
