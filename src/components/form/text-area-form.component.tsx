import * as React from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextAreaFormProps<T extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<"textarea">, "form"> {
  name: Path<T>;
  form: UseFormReturn<T>;
  label?: string;
}

export const TextAreaForm = <T extends FieldValues>({
  name,
  form,
  label,
  className,
  ...props
}: TextAreaFormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              className={cn("resize-none h-auto")}
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
TextAreaForm.displayName = "TextAreaForm";
