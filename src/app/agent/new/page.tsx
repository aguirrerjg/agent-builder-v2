"use client";

import dynamic from "next/dynamic";

// Importar AgentFlowEditor solo en el cliente para evitar problemas de SSR con React Flow
const AgentFlowEditor = dynamic(
  () => import("@/components/agent/AgentFlowEditor").then((mod) => ({ default: mod.AgentFlowEditor })),
  { ssr: false }
);

/**
 * Página para crear un nuevo agente
 * Editor de flujo visual estilo OpenAI mejorado
 */
export default function NewAgentPage() {
  return <AgentFlowEditor />;
}

