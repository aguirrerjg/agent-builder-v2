"use client";

import { Handle, Position } from "@xyflow/react";
import { Sparkles } from "lucide-react";

/**
 * Nodo de agente
 */
export function AgentNode({ data }: { data: any }) {
  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-[#5B5BD6] !border-2 !border-white"
      />
      <div className="bg-[#2C2C2E] border-2 border-[#5B5BD6] rounded-lg shadow-lg min-w-[150px] p-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-[#5B5BD620] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#5B5BD6]" />
          </div>
          <span className="text-sm font-medium text-[#F5F5F7]">{data.label}</span>
        </div>
        <p className="text-xs text-[#ACACBE]">{data.description}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-[#5B5BD6] !border-2 !border-white"
      />
    </div>
  );
}

