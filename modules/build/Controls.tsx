import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import React from "react";

function Controls() {
  return (
    <div>
      <div className="flex justify-end absolute bottom-0 left-0 p-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => (window.location.href = "/")}
          aria-label="Go to home"
        >
          <Home className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-end absolute bottom-0 right-0 p-4">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Controls;
