"use client";

import {
  BuildStore,
  createBuildStore,
  initBuildStore,
} from "@/stores/builder-store";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type BuildStoreApi = ReturnType<typeof createBuildStore>;

export const BuildStoreContext = createContext<BuildStoreApi | undefined>(
  undefined
);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export const BuildStoreProvider = ({ children }: CounterStoreProviderProps) => {
  const storeRef = useRef<BuildStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createBuildStore(initBuildStore());
  }

  return (
    <BuildStoreContext.Provider value={storeRef.current}>
      {children}
    </BuildStoreContext.Provider>
  );
};

export const useBuildStore = <T,>(selector: (store: BuildStore) => T): T => {
  const buildStoreContext = useContext(BuildStoreContext);

  if (!buildStoreContext) {
    throw new Error(`useBuildStore must be used within BuildStoreProvider`);
  }

  return useStore(buildStoreContext, selector);
};
