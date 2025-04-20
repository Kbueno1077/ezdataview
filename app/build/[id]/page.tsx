"use client";

import ChartSheet from "@/modules/build/ChartSheet";
import { Sidebar } from "@/modules/build/Sidebar";
import { BuildStoreProvider } from "@/providers/store-provider";
import { useState } from "react";

type tParams = Promise<{ id: string[] }>;

const Page = ({}: { params: tParams }) => {
  // const { id } = await params;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BuildStoreProvider>
      <div className="flex h-screen">
        <div className="flex-1 p-2 relative">
          <ChartSheet openSidebar={() => setIsSidebarOpen(true)} />
        </div>

        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </BuildStoreProvider>
  );
};

export default Page;
