import * as React from "react";
import { ThemeContext } from "@/contexts/theme.context";

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
};
