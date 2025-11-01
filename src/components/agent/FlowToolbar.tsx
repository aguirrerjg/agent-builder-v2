"use client";

import { useState } from "react";
import { ArrowLeft, MoreVertical, Code, Eye, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface FlowToolbarProps {
  agentName: string;
  isDraft: boolean;
  onNameChange: (name: string) => void;
  onSave: () => void;
  onPublish: () => void;
}

/**
 * Toolbar superior del editor de flujo
 */
export function FlowToolbar({ 
  agentName, 
  isDraft, 
  onNameChange, 
  onSave, 
  onPublish 
}: FlowToolbarProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <header className="h-16 border-b border-white/10 bg-white/5 backdrop-blur-2xl flex items-center justify-between px-6 relative">
      {/* Subtle gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/")}
          className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/20"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
        </button>

        {/* Agent Name */}
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input
              type="text"
              value={agentName}
              onChange={(e) => onNameChange(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2 text-white text-sm outline-none focus:border-[#10A37F] focus:ring-2 focus:ring-[#10A37F]/20 transition-all"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-white text-base font-semibold hover:text-[#10A37F] transition-colors"
            >
              {agentName}
            </button>
          )}
          {isDraft && (
            <span className="px-3 py-1 text-xs font-semibold text-white/70 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
              Draft
            </span>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/20"
        >
          <Save className="w-4 h-4" />
          <span className="font-medium">Save</span>
        </button>

        <button
          className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/20"
        >
          <Code className="w-4 h-4" />
          <span className="font-medium">Code</span>
        </button>

        <button
          className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/20"
        >
          <Eye className="w-4 h-4" />
          <span className="font-medium">Preview</span>
        </button>

        <div className="w-px h-6 bg-white/10" />

        <button
          onClick={onPublish}
          className="px-5 py-2.5 bg-gradient-to-r from-[#10A37F] to-[#0E8C6C] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#10A37F]/30 transition-all duration-300 transform hover:scale-105"
        >
          Publish
        </button>

        <button className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/20">
          <MoreVertical className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
        </button>
      </div>
    </header>
  );
}

