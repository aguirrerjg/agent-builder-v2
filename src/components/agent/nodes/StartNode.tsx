"use client";

import { Handle, Position } from "@xyflow/react";
import { Play } from "lucide-react";

/**
 * Nodo de inicio (Start)
 */
export function StartNode({ data }: { data: any }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#10A37F] text-white rounded-lg shadow-lg min-w-[120px]">
        <Play className="w-4 h-4" />
        <span className="text-sm font-medium">{data.label}</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-[#10A37F] !border-2 !border-white"
      />
    </div>
  );
}

