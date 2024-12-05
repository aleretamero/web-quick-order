import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface InputFormProps<T extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<"input">, "form"> {
  name: Path<T>;
  form: UseFormReturn<T>;
  label?: string;
}

export const InputForm = <T extends FieldValues>({
  name,
  form,
  label,
  ...props
}: InputFormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={props.className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type={props.type}
              placeholder={props.placeholder}
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
InputForm.displayName = "InputForm";
