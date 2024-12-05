import { Navigate } from "react-router";
import { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth.hook";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isLogged } = useAuth();

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return children;
}
