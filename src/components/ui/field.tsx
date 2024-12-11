import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  value: string;
  className?: string;
}

export function Field({ label, value, className }: FieldProps) {
  return (
    <div className={cn("flex gap-2 py-2", className)}>
      <span className="text-md font-medium text-gray-500 dark:text-neutral-400">
        {label}
      </span>
      <span className="text-md font-medium text-gray-900 dark:text-neutral-50">
        {value}
      </span>
    </div>
  );
}
