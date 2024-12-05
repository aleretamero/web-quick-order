import { Form } from '@/components/form/form.component';
import { InputForm } from '@/components/form/input-form.component';
import { InputPasswordForm } from '@/components/form/input-password-form.component';
import { Button } from '@/components/ui/button';
import { useAuth } from "@/hooks/use-auth.hook";
import { useForm } from "@/hooks/use-form.hook";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({
      required_error: "E-mail não pode ser vazio",
      message: "E-mail inválido",
    })
    .email("E-mail inválido"),
  password: z.string(),
});

export function LoginForm() {
  const { login } = useAuth();

  const form = useForm({
    schema: formSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    login.mutate({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <InputForm
        form={form}
        name="email"
        label="Email"
        className="col-span-12"
      />
      <InputPasswordForm
        form={form}
        name="password"
        label="Password"
        className="col-span-12"
      />
      <div className="col-span-12">
        <Button type="submit" disabled={login.isPending}>
          Login
        </Button>
      </div>
    </Form>
  );
}
