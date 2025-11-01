"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Agent } from "@/types/agent";

interface AgentsContextType {
  agents: Agent[];
  setAgents: (agents: Agent[]) => void;
}

const AgentsContext = createContext<AgentsContextType | undefined>(undefined);

export function AgentsProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);

  return (
    <AgentsContext.Provider value={{ agents, setAgents }}>
      {children}
    </AgentsContext.Provider>
  );
}

export function useAgents() {
  const context = useContext(AgentsContext);
  if (context === undefined) {
    throw new Error("useAgents must be used within AgentsProvider");
  }
  return context;
}

