import {
  useForm as useReactHookForm,
  UseFormProps as ReactHookFormUseFormProps,
  FieldValues,
} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface UseFormProps<T extends FieldValues>
  extends Omit<ReactHookFormUseFormProps<T>, 'resolver'> {
  schema: z.Schema<T>;
}

export function useForm<T extends FieldValues>(props: UseFormProps<T>) {
  return useReactHookForm<T>({
    ...props,
    resolver: zodResolver(props.schema),
  });
}
