"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../providers/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-md ${
          theme === "light"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted"
        }`}
        aria-label="Light theme"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-md ${
          theme === "dark"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted"
        }`}
        aria-label="Dark theme"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-md ${
          theme === "system"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted"
        }`}
        aria-label="System theme"
      >
        <span className="text-xs">System</span>
      </button>
    </div>
  );
}
