import { AuthProvider } from "@/contexts/auth.context";
import { ThemeContext } from "@/contexts/theme.context";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <AuthProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={cn("w-full", theme)}>
            <Outlet />
          </div>
        )}
      </ThemeContext.Consumer>
    </AuthProvider>
  );
}
