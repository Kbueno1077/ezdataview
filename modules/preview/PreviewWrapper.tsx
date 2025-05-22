import { useBuildStore } from "@/providers/store-provider";
import React from "react";

function PreviewWrapper() {
  const { workspaceCharts } = useBuildStore((state) => state);
  console.log("🚀 ~ Page ~ workspaceCharts:", workspaceCharts);

  return <div>PreviewWrapper</div>;
}

export default PreviewWrapper;
