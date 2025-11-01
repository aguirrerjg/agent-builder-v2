"use client";

import { Handle, Position } from "@xyflow/react";
import { GitBranch } from "lucide-react";

/**
 * Nodo de lógica
 */
export function LogicNode({ data }: { data: any }) {
  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-[#EC4899] !border-2 !border-white"
      />
      <div className="bg-[#2C2C2E] border-2 border-[#EC4899] rounded-lg shadow-lg min-w-[140px] p-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-[#EC489920] flex items-center justify-center">
            <GitBranch className="w-4 h-4 text-[#EC4899]" />
          </div>
          <span className="text-sm font-medium text-[#F5F5F7]">{data.label}</span>
        </div>
        <p className="text-xs text-[#ACACBE]">{data.description}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-[#EC4899] !border-2 !border-white"
      />
    </div>
  );
}

