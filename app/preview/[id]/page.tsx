"use client";

import PreviewWrapper from "@/modules/preview/PreviewWrapper";

type tParams = Promise<{ id: string[] }>;

const Page = ({}: { params: tParams }) => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-2 relative">
        <PreviewWrapper />
      </div>
    </div>
  );
};

export default Page;
