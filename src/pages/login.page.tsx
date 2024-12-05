import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/form/form.component";
import { InputForm } from "@/components/form/input-form.component";
import { InputPasswordForm } from "@/components/form/input-password-form.component";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth.hook";

const formSchema = z.object({
  email: z
    .string({
      required_error: "E-mail não pode ser vazio",
      message: "E-mail inválido",
    })
    .email("E-mail inválido"),
  password: z.string(),
});

export function LoginPage() {
  const { login } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Olá novamente! Faça login para continuar.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
