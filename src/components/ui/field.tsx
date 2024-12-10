interface FieldProps {
  label: string;
  value: string;
}

export function Field({ label, value }: FieldProps) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-200">
      <span className="text-sm font-medium text-gray-500 dark:text-neutral-400">
        {label}
      </span>
      <span className="text-sm text-gray-900 dark:text-neutral-50">
        {value}
      </span>
    </div>
  );
}
