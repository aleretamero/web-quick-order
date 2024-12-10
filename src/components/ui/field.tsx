interface FieldProps {
  label: string;
  value: string;
}

export function Field({ label, value }: FieldProps) {
  return (
    <div className="flex gap-2 py-2">
      <span className="text-md font-medium text-gray-500 dark:text-neutral-400">
        {label}
      </span>
      <span className="text-md font-medium text-gray-900 dark:text-neutral-50">
        {value}
      </span>
    </div>
  );
}
