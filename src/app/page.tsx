"use client";

import { AgentCard } from "@/components/ui/AgentCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Agent } from "@/types/agent";
import { useState } from "react";

/**
 * Página principal - Grid de Agentes
 * 
 * Muestra un grid de agentes estilo OpenAI GPTs
 * Si no hay agentes, muestra el Empty State
 */
export default function HomePage() {
  // Datos de ejemplo - luego vendrán de una API o estado global
  const [agents] = useState<Agent[]>([
    {
      id: "1",
      name: "Marketing Content Generator",
      description: "Creates engaging marketing content, social media posts, and ad copy tailored to your brand voice and target audience.",
      status: "active",
      capabilities: ["natural-language-processing", "web-search"],
      tags: ["Marketing", "Content", "Social Media"],
      totalRuns: 1245,
      successRate: 98.5,
      avgResponseTime: 1.2,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      createdBy: "user-1",
    },
    {
      id: "2",
      name: "Data Analysis Assistant",
      description: "Analyzes datasets, creates visualizations, and provides insights from your business data using advanced AI models.",
      status: "active",
      capabilities: ["data-analysis", "code-generation"],
      tags: ["Data", "Analytics", "Business"],
      totalRuns: 856,
      successRate: 96.2,
      avgResponseTime: 2.1,
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 horas atrás
      createdBy: "user-1",
    },
    {
      id: "3",
      name: "Customer Support Bot",
      description: "Handles customer inquiries, provides product information, and escalates complex issues to human agents when needed.",
      status: "active",
      capabilities: ["natural-language-processing", "api-integration"],
      tags: ["Support", "Customer Service", "Chatbot"],
      totalRuns: 3421,
      successRate: 99.1,
      avgResponseTime: 0.8,
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hora atrás
      createdBy: "user-1",
    },
  ]);

  const handleAgentClick = (agentId: string) => {
    console.log("Agent clicked:", agentId);
    // Aquí abrirás el panel lateral de detalles
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
