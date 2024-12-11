import { Navigate, useLocation } from "react-router";
import { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth.hook";
import { Role } from "@/domain/user/enums/role.enum";

interface AuthGuardProps {
  children: ReactNode;
}

export function AdminGuard({ children }: AuthGuardProps) {
  const { isLogged, dataUser } = useAuth();
  const location = useLocation();

  if (isLogged === undefined) {
    return null; // TODO or loading component
  }

  if (!isLogged) {
    return <Navigate to={`/${location.search}`} />;
  }

  if (dataUser?.role !== Role.ADMIN) {
    return <Navigate to={`/orders${location.search}`} />;
  }

  return children;
}
