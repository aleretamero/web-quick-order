import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { LoginForm } from "@/components/app/login/login-form.component";

export function LoginPage() {
  return (
    <div className="px-2 mx-auto max-w-md w-full">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Olá novamente! Faça login para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
