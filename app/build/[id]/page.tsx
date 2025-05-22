"use client";

import ChartSheet from "@/modules/build/ChartSheet";
import { Sidebar } from "@/modules/build/Sidebar";
import { useState } from "react";

type tParams = Promise<{ id: string[] }>;

const Page = ({}: { params: tParams }) => {
  // const { id } = await params;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-2 relative">
        <ChartSheet openSidebar={() => setIsSidebarOpen(true)} />
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
};

export default Page;
