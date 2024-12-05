import { Form as DefaultForm } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import * as React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface FormProps<T extends FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void> | void;
}

export const Form = <T extends FieldValues>({
  className,
  form,
  children,
  onSubmit,
  ...props
}: FormProps<T>) => {
  return (
    <DefaultForm {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6 grid grid-cols-12 gap-4", className)}
        {...props}
      >
        {children}
      </form>
    </DefaultForm>
  );
};
Form.displayName = "Form";
