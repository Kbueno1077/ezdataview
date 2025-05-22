"use client";

import { Controls } from "@/components/Controls";
import { NativeCharts } from "@/components/NativeModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
          <Controls>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setViewMode(viewMode === "grid" ? "carousel" : "grid")
              }
              aria-label="Toggle view mode"
              className="h-8 w-8 rounded-full transition-colors text-muted-foreground hover:bg-muted hover:text-muted-foreground dark:hover:bg-zinc-600"
            >
              {viewMode === "grid" ? (
                <Layout className="h-4 w-4" />
              ) : (
                <Grid className="h-4 w-4" />
              )}
            </Button>

            <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-600 mx-2" />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/build/${pathname.split("/")[2]}`)}
              aria-label="Go to home"
              className="h-8 w-8 rounded-full transition-colors text-muted-foreground hover:bg-muted hover:text-muted-foreground dark:hover:bg-zinc-600"
            >
              <Hammer className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Go to home"
              onClick={() => router.push("/")}
              className="h-8 w-8 rounded-full transition-colors text-muted-foreground hover:bg-muted hover:text-muted-foreground dark:hover:bg-zinc-600"
            >
              <Home className="h-4 w-4" />
            </Button>
          </Controls>
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
