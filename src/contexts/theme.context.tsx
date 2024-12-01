import * as React from "react";

type Theme = "light" | "dark" | "system";

interface ThemeProviderState {
  theme: Theme;
  toggleTheme: () => void;
  setSystemTheme: () => void;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = React.createContext<ThemeProviderState>(
  {} as ThemeProviderState
);

const storageKey = "@theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    const saveTheme = async () => {
      try {
        localStorage.setItem(storageKey, theme); // TODO: chanche to another storage
      } catch (error) {
        console.error(error);
      }
    };

    saveTheme();
  }, [theme]);

  React.useEffect(() => {
    const loadTheme = async () => {
      try {
        const storageTheme = localStorage.getItem(storageKey) as Theme | null; // TODO: chanche to another storage

        if (storageTheme && theme !== storageTheme) {
          setTheme(storageTheme);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadTheme();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
        setDarkTheme: () => setTheme("dark"),
        setLightTheme: () => setTheme("light"),
        setSystemTheme: () => setTheme("system"),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
