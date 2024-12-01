import { ReactNode } from "react";
import { Navigate } from "react-router";
import { isAuth } from "@/guard/is-auth";

interface GuestGuardProps {
  children: ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  console.log("GuestGuard");

  if (isAuth) {
    return <Navigate to="/home" />;
  }

  return children;
}
