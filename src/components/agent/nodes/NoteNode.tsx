"use client";

import { FileText } from "lucide-react";

/**
 * Nodo de nota - Diseño moderno
 */
export function NoteNode({ data }: { data: any }) {
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6E6E80] to-[#8E8E9E] rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
      
      {/* Main node */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl min-w-[200px] p-4 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6E6E80] to-[#8E8E9E] flex items-center justify-center shadow-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">{data.label || "Note"}</span>
        </div>
        <p className="text-xs text-white/70 leading-relaxed">Add notes and comments</p>
        
        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6E6E80] via-[#8E8E9E] to-[#6E6E80] rounded-b-3xl" />
      </div>
    </div>
  );
}

