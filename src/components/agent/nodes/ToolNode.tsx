"use client";

import { Handle, Position } from "@xyflow/react";
import { Zap } from "lucide-react";

/**
 * Nodo de herramienta
 */
export function ToolNode({ data }: { data: any }) {
  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-[#F59E0B] !border-2 !border-white"
      />
      <div className="bg-[#2C2C2E] border-2 border-[#F59E0B] rounded-lg shadow-lg min-w-[140px] p-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-[#F59E0B20] flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <span className="text-sm font-medium text-[#F5F5F7]">{data.label}</span>
        </div>
        <p className="text-xs text-[#ACACBE]">{data.description}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-[#F59E0B] !border-2 !border-white"
      />
    </div>
  );
}

