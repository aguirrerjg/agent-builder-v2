"use client";

import { Handle, Position } from "@xyflow/react";
import { Play } from "lucide-react";

/**
 * Nodo de inicio (Start) - Diseño moderno con glassmorphism
 */
export function StartNode({ data }: { data: any }) {
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#10A37F] to-[#0E8C6C] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
      
      {/* Main node */}
      <div className="relative flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-[#10A37F] to-[#0E8C6C] text-white rounded-2xl shadow-2xl min-w-[140px] border border-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
        <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <Play className="w-4 h-4 fill-white" />
        </div>
        <span className="text-sm font-semibold">{data.label}</span>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-gradient-to-br !from-[#10A37F] !to-[#0E8C6C] !border-2 !border-white shadow-lg"
      />
    </div>
  );
}

