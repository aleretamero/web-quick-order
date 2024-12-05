import * as React from "react";
import { AuthContext } from "@/contexts/auth.context";

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};
