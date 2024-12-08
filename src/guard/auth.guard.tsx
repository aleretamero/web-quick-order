import { Navigate, useLocation } from "react-router";
import { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth.hook";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isLogged } = useAuth();
  const location = useLocation();
  console.log("🚀 ~ AuthGuard ~ location:", location);

  if (isLogged === undefined) {
    return null; // TODO or loading component
  }

  if (!isLogged) {
    return <Navigate to={`/${location.search}`} />;
  }

  return children;
}
