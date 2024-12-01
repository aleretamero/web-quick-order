import { Navigate } from "react-router";
import { isAuth } from "@/guard/is-auth";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  console.log("AuthGuard");

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
}
