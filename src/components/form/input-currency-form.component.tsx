import * as React from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/helpers/formats/format-currency.helper";

interface InputCurrencyFormProps<T extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<"input">, "form"> {
  name: Path<T>;
  form: UseFormReturn<T>;
  label?: string;
}

export const InputCurrencyForm = <T extends FieldValues>({
  name,
  form,
  label,
  ...props
}: InputCurrencyFormProps<T>) => {
  const initialValue =
    props.value !== undefined ? formatCurrency(props.value.toString()) : "";

  const [value, setValue] = React.useReducer((_: string, next: string) => {
    const digits = next.replace(/\D/g, "");
    return formatCurrency(Number(digits) / 100);
  }, initialValue);

  type ChangeHandler = (realValue: number) => void;

  function handleChange(realChangeFn: ChangeHandler, formattedValue: string) {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100;

    realChangeFn(realValue);
  }

  React.useEffect(() => {
    setValue(props.value?.toString() ?? "");
  }, [props.value]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        field.value = value as PathValue<T, Path<T>>;
        const _change = field.onChange;

        return (
          <FormItem className={cn(props.className)}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input
                placeholder={props.placeholder}
                type="text"
                {...field}
                onChange={(ev) => {
                  setValue(ev.target.value);
                  handleChange(_change, ev.target.value);
                }}
                value={value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
InputCurrencyForm.displayName = "InputCurrencyForm";
