"use client";

import { AgentCard } from "@/components/ui/AgentCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Agent } from "@/types/agent";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAgents } from "@/contexts/AgentsContext";

/**
 * Página principal - Grid de Agentes
 * 
 * Muestra un grid de agentes estilo OpenAI GPTs
 * Si no hay agentes, muestra el Empty State
 */
export default function HomePage() {
  const router = useRouter();
  const { setAgents } = useAgents();
  
  // Datos de ejemplo - luego vendrán de una API o estado global
  const [agents] = useState<Agent[]>([
    {
      id: "1",
      name: "Neuro-Predictor (Cortex)",
      description: "Predice el resultado de una situación determinada basándose en los datos proporcionados.",
      status: "active",
      capabilities: ["natural-language-processing", "web-search"],
      tags: ["Neuro", "Content", "Prediction"],
      totalRuns: 1245,
      successRate: 98.5,
      avgResponseTime: 1.2,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      createdBy: "user-1",
    },
    {
      id: "2",
      name: "Sentinela N0 (Triage)",
      description: "Clasifica y analiza conjuntos de datos, crea visualizaciones y proporciona insights a partir de tus datos empresariales utilizando modelos avanzados de IA.",
      status: "active",
      capabilities: ["data-analysis", "code-generation"],
      tags: ["Sentinela", "Triage", "AI"],
      totalRuns: 856,
      successRate: 96.2,
      avgResponseTime: 2.1,
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 horas atrás
      createdBy: "user-1",
    },
    {
      id: "3",
      name: "Auto-Fixer (Ejecución)",
      description: "Corrige errores en la ejecución de una tarea asignada.",
      status: "active",
      capabilities: ["natural-language-processing", "api-integration"],
      tags: ["Auto-Fixer", "Execution", "AI"],
      totalRuns: 3421,
      successRate: 99.1,
      avgResponseTime: 0.8,
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hora atrás
      createdBy: "user-1",
    },
  ]);

  // Actualizar agentes en el contexto
  useEffect(() => {
    setAgents(agents);
  }, [agents, setAgents]);

  const handleAgentClick = (agentId: string) => {
    // Navegar al editor de flujo del agente
    router.push(`/agent/${agentId}`);
  };

  const handleMenuClick = (agentId: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Menu clicked for agent:", agentId);
    // Aquí mostrarás el dropdown menu
  };

  const handleCreateAgent = () => {
    console.log("Create agent clicked");
    // Aquí abrirás el modal de creación
  };

  const handleBrowseTemplates = () => {
    console.log("Browse templates clicked");
    // Aquí navegarás a la página de templates
  };

  return (
    <div className="min-h-full bg-white dark:bg-[#1C1C1E]">
      <div className="mx-auto max-w-[1280px] px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#202123] dark:text-[#F5F5F7] mb-2">
            My Agents
          </h1>
          <p className="text-base text-[#6E6E80] dark:text-[#ACACBE]">
            Build and manage your AI agents
          </p>
        </div>

        {/* Agents Grid or Empty State */}
        {agents.length === 0 ? (
          <EmptyState
            onCreateAgent={handleCreateAgent}
            onBrowseTemplates={handleBrowseTemplates}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onClick={() => handleAgentClick(agent.id)}
                onMenuClick={handleMenuClick(agent.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
