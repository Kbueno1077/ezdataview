import ChartSheet from "@/modules/build/ChartSheet";
import { Sidebar } from "@/modules/build/Sidebar";
import { BuildStoreProvider } from "@/providers/store-provider";

type tParams = Promise<{ id: string[] }>;

const Page = async ({}: { params: tParams }) => {
  // const { id } = await params;

  return (
    <BuildStoreProvider>
      <div className="flex gap-2 h-screen">
        <div className="w-full p-2">
          <ChartSheet />
        </div>

        <div className="w-1/3 min-w-[380px] max-w-[500px]">
          <Sidebar />
        </div>
      </div>
    </BuildStoreProvider>
  );
};

export default Page;
