import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from '@/hooks/use-auth.hook';

interface GuestGuardProps {
  children: ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { isLogged } = useAuth();

  if (isLogged) {
    return <Navigate to="/home" />;
  }

  return children;
}
