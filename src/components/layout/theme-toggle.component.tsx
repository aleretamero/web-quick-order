import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme.hook";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setDarkTheme, setLightTheme, setSystemTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-neutral-50 border-neutral-50" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={setLightTheme}
          className={cn({
            "bg-neutral-700 text-neutral-50": theme === "light",
          })}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={setDarkTheme}
          className={cn({
            "bg-neutral-700 text-neutral-50": theme === "dark",
          })}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={setSystemTheme}
          className={cn({
            "bg-neutral-700 text-neutral-50": theme === "system",
          })}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
