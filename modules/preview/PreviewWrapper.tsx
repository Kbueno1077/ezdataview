"use client";

import { NativeCharts } from "@/components/NativeModal";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useBuildStore } from "@/providers/store-provider";
import { Grid, Hammer, Home, Layout } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function PreviewWrapper() {
  const router = useRouter();
  const { workspaceCharts, workspaceName } = useBuildStore((state) => state);
  const pathname = usePathname();
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");

  return (
    <div>
      <div className="flex justify-between w-full items-center gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          {workspaceName || "Untitled Workspace"}
        </h1>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setViewMode(viewMode === "grid" ? "carousel" : "grid")
            }
            aria-label="Toggle view mode"
          >
            {viewMode === "grid" ? <Layout /> : <Grid />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push(`/build/${pathname.split("/")[2]}`)}
            aria-label="Go to home"
            className="hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Hammer />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Go to home"
            onClick={() => router.push("/")}
          >
            <Home />
          </Button>

          <ThemeToggle />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {workspaceCharts.map((chart) => (
          <NativeCharts
            key={chart.id}
            title={chart.chartName}
            description={chart.description}
            chart={{
              id: chart.id,
              type: chart.chartType,
              data: chart.data,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default PreviewWrapper;
