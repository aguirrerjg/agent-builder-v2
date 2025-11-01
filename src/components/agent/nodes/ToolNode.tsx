"use client";

import { Handle, Position } from "@xyflow/react";
import { Zap } from "lucide-react";

/**
 * Nodo de herramienta - Diseño moderno
 */
export function ToolNode({ data }: { data: any }) {
  return (
    <div className="relative group">
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-gradient-to-br !from-[#F59E0B] !to-[#FBBF24] !border-2 !border-white shadow-lg"
      />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
      
      {/* Main node */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl min-w-[170px] p-4 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] flex items-center justify-center shadow-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">{data.label}</span>
        </div>
        <p className="text-xs text-white/70 leading-relaxed">{data.description}</p>
        
        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B] rounded-b-3xl" />
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-gradient-to-br !from-[#F59E0B] !to-[#FBBF24] !border-2 !border-white shadow-lg"
      />
    </div>
  );
}

