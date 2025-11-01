"use client";

import { Handle, Position } from "@xyflow/react";
import { Sparkles } from "lucide-react";

/**
 * Nodo de agente - Diseño moderno con glassmorphism y profundidad
 */
export function AgentNode({ data }: { data: any }) {
  return (
    <div className="relative group">
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-gradient-to-br !from-[#5B5BD6] !to-[#7676FF] !border-2 !border-white shadow-lg"
      />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5B5BD6] to-[#7676FF] rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
      
      {/* Main node with glassmorphism */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl min-w-[180px] p-4 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
        {/* Header with icon */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5B5BD6] to-[#7676FF] flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">{data.label}</span>
        </div>
        
        {/* Description */}
        <p className="text-xs text-white/70 leading-relaxed">{data.description}</p>
        
        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5B5BD6] via-[#7676FF] to-[#5B5BD6] rounded-b-3xl" />
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-gradient-to-br !from-[#5B5BD6] !to-[#7676FF] !border-2 !border-white shadow-lg"
      />
    </div>
  );
}

