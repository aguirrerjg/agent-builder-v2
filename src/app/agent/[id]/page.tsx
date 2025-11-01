"use client";

import { AgentFlowEditor } from "@/components/agent/AgentFlowEditor";
import { use } from "react";

/**
 * Página para editar un agente existente
 * Muestra el editor de flujo con los datos del agente
 */
export default function EditAgentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return <AgentFlowEditor agentId={resolvedParams.id} />;
}

