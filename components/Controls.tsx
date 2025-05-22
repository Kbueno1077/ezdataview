"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "../providers/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  children?: React.ReactNode;
}

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 rounded-full transition-colors",
          theme === "light"
            ? "bg-amber-100 dark:bg-amber-400/10 text-amber-500 hover:bg-amber-100 hover:text-amber-500 dark:hover:bg-amber-400/10 dark:hover:text-amber-500 "
            : "text-muted-foreground hover:bg-amber-100 hover:text-amber-500 dark:hover:bg-amber-400/10 dark:hover:text-amber-500"
        )}
        onClick={() => setTheme("light")}
        aria-pressed={theme === "light"}
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light mode</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 rounded-full transition-colors",
          theme === "dark"
            ? "bg-indigo-100 dark:bg-indigo-400/10 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-500 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-500"
            : "text-muted-foreground hover:bg-indigo-100 hover:text-indigo-500 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-500"
        )}
        onClick={() => setTheme("dark")}
        aria-pressed={theme === "dark"}
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark mode</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 rounded-full transition-colors",
          theme === "system"
            ? "bg-green-100 dark:bg-green-400/10 text-green-500 hover:bg-green-100 hover:text-green-500 dark:hover:bg-green-400/10 dark:hover:text-green-500"
            : "text-muted-foreground hover:bg-green-100 hover:text-green-500 dark:hover:bg-green-400/10 dark:hover:text-green-500"
        )}
        onClick={() => setTheme("system")}
        aria-pressed={theme === "system"}
      >
        <Monitor className="h-4 w-4" />
        <span className="sr-only">System mode</span>
      </Button>
    </>
  );
};

export function Controls({ children }: ThemeToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-lg rounded-full p-1 shadow-md border border-white/20">
      {children}
      {children && (
        <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-600 mx-2" />
      )}
      <ThemeToggle />
    </div>
  );
}
