"use client";

import { MoreVertical, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Agent } from "@/types/agent";

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
  onMenuClick?: (event: React.MouseEvent) => void;
}

/**
 * Tarjeta de agente estilo OpenAI GPTs
 * 
 * Características:
 * - Header con icono, nombre y menú
 * - Descripción limitada a 2 líneas
 * - Tags de capacidades
 * - Footer con estadísticas
 * - Hover state con borde verde y elevación
 */
export function AgentCard({ agent, onClick, onMenuClick }: AgentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div
      className={cn(
        "bg-white border border-[#E5E5E5] rounded-xl p-4 cursor-pointer transition-standard group",
        "hover:border-[#10A37F] hover:shadow-[0_4px_12px_rgba(16,163,127,0.1)] hover:-translate-y-0.5",
        "min-h-[200px] flex flex-col"
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F7F7F8] flex items-center justify-center border border-[#E5E5E5]">
            <Sparkles className="w-4 h-4 text-[#10A37F]" />
          </div>
          <h3 className="text-base font-semibold text-[#202123] line-clamp-1">
            {agent.name}
          </h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick?.(e);
          }}
          className="p-1 rounded-md text-[#6E6E80] hover:text-[#202123] hover:bg-[#F7F7F8] transition-fast opacity-0 group-hover:opacity-100"
          aria-label="More options"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-[#6E6E80] leading-relaxed mb-4 line-clamp-2 flex-1">
        {agent.description}
      </p>

      {/* Tags */}
      {agent.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {agent.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium text-[#6E6E80] bg-[#F7F7F8] rounded-md hover:bg-[#EBEBEB] transition-fast"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="pt-3 border-t border-[#F0F0F0]">
        <div className="flex items-center gap-2 text-xs text-[#6E6E80]">
          <span>{formatNumber(agent.totalRuns)} runs</span>
          <span>·</span>
          <span>{agent.successRate.toFixed(0)}% success</span>
          <span>·</span>
          <span>Updated {formatTimeAgo(agent.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}

