"use client";

import { Handle, Position } from "@xyflow/react";
import { Flag } from "lucide-react";

/**
 * Nodo de finalización (End) - Diseño moderno
 */
export function EndNode({ data }: { data: any }) {
  return (
    <div className="relative group">
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-gradient-to-br !from-[#EF4444] !to-[#DC2626] !border-2 !border-white shadow-lg"
      />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#EF4444] to-[#DC2626] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
      
      {/* Main node */}
      <div className="relative flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-[#EF4444] to-[#DC2626] text-white rounded-2xl shadow-2xl min-w-[140px] border border-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
        <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <Flag className="w-4 h-4" />
        </div>
        <span className="text-sm font-semibold">{data.label}</span>
      </div>
    </div>
  );
}

