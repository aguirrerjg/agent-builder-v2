"use client";

import { AgentFlowEditor } from "@/components/agent/AgentFlowEditor";
import { useAgents } from "@/contexts/AgentsContext";
import { use } from "react";

/**
 * Página para editar un agente existente
 * Muestra el editor de flujo con los datos del agente
 */
export default function EditAgentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { agents } = useAgents();
  
  // Buscar el agente por ID
  const agent = agents.find(a => a.id === resolvedParams.id);
  
  return <AgentFlowEditor agentId={resolvedParams.id} agentName={agent?.name} />;
}

