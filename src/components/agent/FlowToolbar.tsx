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
    <header className="h-14 border-b border-[#2C2C2E] bg-[#1C1C1E] flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/")}
          className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-[#2C2C2E] transition-fast"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-[#ACACBE]" />
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
              className="bg-[#2C2C2E] border border-[#3A3A3C] rounded-md px-3 py-1 text-[#F5F5F7] text-sm outline-none focus:border-[#10A37F]"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-[#F5F5F7] text-sm font-medium hover:text-[#10A37F] transition-fast"
            >
              {agentName}
            </button>
          )}
          {isDraft && (
            <span className="px-2 py-0.5 text-xs font-medium text-[#ACACBE] bg-[#2C2C2E] rounded border border-[#3A3A3C]">
              Draft
            </span>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#ACACBE] hover:text-[#F5F5F7] hover:bg-[#2C2C2E] rounded-md transition-fast"
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
        </button>

        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#ACACBE] hover:text-[#F5F5F7] hover:bg-[#2C2C2E] rounded-md transition-fast"
        >
          <Code className="w-4 h-4" />
          <span>Code</span>
        </button>

        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#ACACBE] hover:text-[#F5F5F7] hover:bg-[#2C2C2E] rounded-md transition-fast"
        >
          <Eye className="w-4 h-4" />
          <span>Preview</span>
        </button>

        <div className="w-px h-6 bg-[#3A3A3C]" />

        <button
          onClick={onPublish}
          className="px-4 py-1.5 bg-[#10A37F] text-white text-sm font-medium rounded-md hover:bg-[#0E8C6C] transition-fast"
        >
          Publish
        </button>

        <button className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-[#2C2C2E] transition-fast">
          <MoreVertical className="w-5 h-5 text-[#ACACBE]" />
        </button>
      </div>
    </header>
  );
}

