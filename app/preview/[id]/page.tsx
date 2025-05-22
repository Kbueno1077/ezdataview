"use client";

import PreviewWrapper from "@/modules/preview/PreviewWrapper";
import { BuildStoreProvider } from "@/providers/store-provider";

type tParams = Promise<{ id: string[] }>;

const Page = ({}: { params: tParams }) => {
  return (
    <BuildStoreProvider>
      <div className="flex h-screen">
        <div className="flex-1 p-2 relative">
          <PreviewWrapper />
        </div>
      </div>
    </BuildStoreProvider>
  );
};

export default Page;
