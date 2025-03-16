export interface Chart {
  id: string;
  name: string;
  type: string;
  data: unknown;
}

export type ViewMode = "list" | "grid" | "dashboard";
