import { RootLayout } from "@/layouts/root.layout";
import { ThemeProvider } from "@/contexts/theme.context";
import { router } from "@/router";
import { RouterProvider } from "react-router";

export function App() {
  return (
    <ThemeProvider>
      <RootLayout>
        <RouterProvider router={router} />
      </RootLayout>
    </ThemeProvider>
  );
}
