import { useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from 'lucide-react';

interface InputPasswordFormProps<T extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<"input">, "form"> {
  name: Path<T>;
  form: UseFormReturn<T>;
  label?: string;
}

export const InputPasswordForm = <T extends FieldValues>({
  name,
  form,
  label,
  ...props
}: InputPasswordFormProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={props.className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                {...props}
                {...field}
              />
              <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3">
                <Button
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 p-0 h-4 w-4 bg-inherit hover:bg-inherit"
                  aria-label={showPassword ? "Esconder senha" : "Exibir senha"}
                  type="button"
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
InputPasswordForm.displayName = "InputPasswordForm";
