import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/hooks/use-auth.hook";

interface GuestGuardProps {
  children: ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { isLogged } = useAuth();
  const location = useLocation();

  if (isLogged === undefined) {
    return null; // TODO or loading component
  }

  if (isLogged) {
    return <Navigate to={`home${location.search}`} />;
  }

  return children;
}
