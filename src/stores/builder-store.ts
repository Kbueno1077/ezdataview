import { createStore } from "zustand/vanilla";

// DEFAULT WORKSPACE DATA
export type BuildState = {
  id: string;
  workspaceName: string;
  currentChartIndex: number;
  workspaceCharts: ChartData[];
};

export const initBuildStore = (): BuildState => {
  return {
    id: Math.random().toString(36).substring(2, 12),
    workspaceName: "",
    currentChartIndex: 0,
    workspaceCharts: [defaultChart],
  };
};

// DEFAULT CHART DATA
export type ChartData = {
  id: string;
  chartName: string;
  chartType: string;

  multipleValues?: boolean;
  withImage?: boolean;
  withTooltip?: boolean;
  useAnimation?: boolean;
  data: any[];
};

const defaultChart = {
  id: Math.random().toString(36).substring(2, 12),
  chartName: "",
  chartType: "horizontal-bar",
  data: [],

  multipleValues: false,
  withImage: false,
  withTooltip: true,
  useAnimation: false,
};

export type BuildActions = {
  changeWorkspaceName: (workspaceName: string) => void;
  changeCurrentChartIndex: (index: number) => void;
  changeChartType: (type: string) => void;

  addChartItem: (item: any) => void;
  deleteChartItem: (index: number) => void;
  updateChartItem: (index: number, key: string, value: any) => void;
  updateChartConfig: (key: string, value: any) => void;
  moveChartItem: (fromIndex: number, toIndex: number) => void;

  addChart: (chart: ChartData) => void;
  removeChart: (index: number) => void;
};

export type BuildStore = BuildState & BuildActions;

export const defaultInitState: BuildState = {
  id: Math.random().toString(36).substring(2, 12),
  workspaceName: "",
  currentChartIndex: 0,
  workspaceCharts: [defaultChart],
};

export const createBuildStore = (initState: BuildState = defaultInitState) => {
  return createStore<BuildStore>()((set, get) => ({
    ...initState,

    changeWorkspaceName: (workspaceName: string) =>
      set(() => ({ workspaceName })),

    changeCurrentChartIndex: (index: number) =>
      set(() => ({ currentChartIndex: index })),

    changeChartType: (type: string) => {
      const currentChart = get().workspaceCharts?.[get().currentChartIndex];

      if (currentChart) {
        set(() => ({
          workspaceCharts: [
            ...get().workspaceCharts.slice(0, get().currentChartIndex),
            { ...currentChart, chartType: type, data: [] },
            ...get().workspaceCharts.slice(get().currentChartIndex + 1),
          ],
        }));
      }
    },

    addChartItem: (item: any) =>
      set(() => {
        const workspaceCharts = get().workspaceCharts;
        const currentChartIndex = get().currentChartIndex;
        const currentChart = get().workspaceCharts[get().currentChartIndex];

        return {
          workspaceCharts: workspaceCharts.map((c, i) =>
            i === currentChartIndex
              ? { ...currentChart, data: [...currentChart.data, item] }
              : c
          ),
        };
      }),

    deleteChartItem: (index: number) =>
      set((state) => {
        const currentChart = state.workspaceCharts[state.currentChartIndex];
        return {
          workspaceCharts: state.workspaceCharts.map((c, i) =>
            i === state.currentChartIndex
              ? {
                  ...currentChart,
                  data: currentChart.data.filter((_, idx) => idx !== index),
                }
              : c
          ),
        };
      }),

    updateChartItem: (index: number, key: string, value: any) =>
      set((state) => {
        const currentChart = state.workspaceCharts[state.currentChartIndex];
        return {
          workspaceCharts: state.workspaceCharts.map((c, i) =>
            i === state.currentChartIndex
              ? {
                  ...currentChart,
                  data: currentChart.data.map((oldItem, idx) =>
                    idx === index ? { ...oldItem, [key]: value } : oldItem
                  ),
                }
              : c
          ),
        };
      }),

    updateChartConfig: (key: string, value: any) =>
      set((state) => {
        const currentChart = state.workspaceCharts[state.currentChartIndex];
        return {
          workspaceCharts: state.workspaceCharts.map((c, i) =>
            i === state.currentChartIndex
              ? { ...currentChart, [key]: value }
              : c
          ),
        };
      }),

    moveChartItem: (fromIndex: number, toIndex: number) =>
      set((state) => {
        const currentChart = state.workspaceCharts[state.currentChartIndex];
        const newData = [...currentChart.data];
        const [movedItem] = newData.splice(fromIndex, 1);
        newData.splice(toIndex, 0, movedItem);

        return {
          workspaceCharts: state.workspaceCharts.map((c, i) =>
            i === state.currentChartIndex
              ? { ...currentChart, data: newData }
              : c
          ),
        };
      }),

    addChart: (chart: ChartData = defaultChart) =>
      set((state) => ({ workspaceCharts: [...state.workspaceCharts, chart] })),

    removeChart: (index: number) =>
      set((state) => ({
        workspaceCharts: state.workspaceCharts.filter((_, i) => i !== index),
      })),
  }));
};
