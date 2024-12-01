import { useTheme } from "@/hooks/use-theme.hook";
import { ReactNode } from "react";

export function RootLayout({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return <div className={theme}>{children}</div>;
}
