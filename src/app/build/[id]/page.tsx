import ChartSheet from "../../../modules/build/ChartSheet";
import { Sidebar } from "../../../modules/build/Sidebar";
import { BuildStoreProvider } from "../../../providers/store-provider";

interface PageProps {
  params: {
    id: string;
  };
}

const BuildPage: React.FC<PageProps> = ({ params }) => {
  const { id } = params;
  console.log("🚀 ~ id:", id);

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

export default BuildPage;
