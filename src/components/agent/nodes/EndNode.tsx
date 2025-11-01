"use client";

import { Handle, Position } from "@xyflow/react";
import { Flag } from "lucide-react";

/**
 * Nodo de finalización (End)
 */
export function EndNode({ data }: { data: any }) {
  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-[#EF4444] !border-2 !border-white"
      />
      <div className="flex items-center gap-2 px-4 py-2 bg-[#EF4444] text-white rounded-lg shadow-lg min-w-[120px]">
        <Flag className="w-4 h-4" />
        <span className="text-sm font-medium">{data.label}</span>
      </div>
    </div>
  );
}

