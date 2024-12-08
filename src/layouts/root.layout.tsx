import { AuthProvider } from "@/contexts/auth.context";
import { ThemeContext, ThemeProvider } from "@/contexts/theme.context";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => (
            <div className={cn("w-full", theme)}>
              <Outlet />
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </AuthProvider>
  );
}
