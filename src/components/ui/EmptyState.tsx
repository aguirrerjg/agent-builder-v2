"use client";

import { Sparkles, Plus, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  onCreateAgent?: () => void;
  onBrowseTemplates?: () => void;
}

/**
 * Estado vacío estilo OpenAI - ultra minimalista
 * 
 * Se muestra cuando no hay agentes creados
 */
export function EmptyState({ onCreateAgent, onBrowseTemplates }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-[#F7F7F8] dark:bg-[#2C2C2E] flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8 text-[#6E6E80] dark:text-[#ACACBE]" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-[#202123] dark:text-[#F5F5F7] mb-2">
        No agents yet
      </h2>

      {/* Description */}
      <p className="text-base text-[#6E6E80] dark:text-[#ACACBE] mb-8 max-w-md">
        Create your first agent to get started
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <button
          onClick={onCreateAgent}
          className={cn(
            "flex items-center justify-center gap-2 px-6 py-3 bg-[#10A37F] text-white rounded-lg",
            "font-medium hover:bg-[#0E8C6C] transition-fast active:scale-[0.98]"
          )}
        >
          <Plus className="w-5 h-5" />
          <span>Create Agent</span>
        </button>

        <button
          onClick={onBrowseTemplates}
          className={cn(
            "flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-[#202123] dark:text-[#F5F5F7] rounded-lg",
            "font-medium border border-[#E5E5E5] dark:border-[#3A3A3C] hover:border-[#10A37F] hover:bg-[#F7F7F8] dark:hover:bg-[#2C2C2E] transition-fast"
          )}
        >
          <LayoutTemplate className="w-5 h-5" />
          <span>Browse Templates</span>
        </button>
      </div>

      {/* Or text */}
      <p className="text-sm text-[#6E6E80] dark:text-[#ACACBE] mb-6">or start from a template</p>

      {/* Template Preview Cards */}
      <div className="flex gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-28 h-36 rounded-lg border border-[#E5E5E5] dark:border-[#3A3A3C] bg-[#F7F7F8] dark:bg-[#2C2C2E] hover:border-[#10A37F] hover:shadow-[0_2px_8px_rgba(16,163,127,0.1)] transition-standard cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}

