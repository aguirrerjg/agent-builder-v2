"use client";

import { 
  Sparkles, 
  Flag, 
  FileText, 
  Search, 
  Shield, 
  Zap,
  GitBranch,
  Timer,
  UserCheck,
  Database,
  Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NodeType {
  id: string;
  type: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}

const nodeCategories = {
  core: [
    { id: "agent", type: "agent", icon: Sparkles, label: "Agent", color: "#5B5BD6" },
    { id: "end", type: "end", icon: Flag, label: "End", color: "#EF4444" },
    { id: "note", type: "note", icon: FileText, label: "Note", color: "#6E6E80" },
  ],
  tools: [
    { id: "file-search", type: "tool", icon: Search, label: "File search", color: "#F59E0B" },
    { id: "guardrails", type: "tool", icon: Shield, label: "Guardrails", color: "#F59E0B" },
    { id: "mcp", type: "tool", icon: Zap, label: "MCP", color: "#F59E0B" },
  ],
  logic: [
    { id: "if-else", type: "logic", icon: GitBranch, label: "If / else", color: "#EC4899" },
    { id: "while", type: "logic", icon: Timer, label: "While", color: "#EC4899" },
    { id: "user-approval", type: "logic", icon: UserCheck, label: "User approval", color: "#EC4899" },
  ],
  data: [
    { id: "transform", type: "data", icon: Database, label: "Transform", color: "#10B981" },
    { id: "set-state", type: "data", icon: Settings2, label: "Set state", color: "#10B981" },
  ],
};

/**
 * Sidebar izquierdo con nodos arrastrables
 */
export function FlowSidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const renderCategory = (title: string, nodes: typeof nodeCategories.core) => (
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-[#6E6E80] uppercase mb-2 px-3">
        {title}
      </h3>
      <div className="space-y-1">
        {nodes.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              draggable
              onDragStart={(e) => onDragStart(e, node.type)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md cursor-grab active:cursor-grabbing",
                "hover:bg-[#2C2C2E] transition-fast group"
              )}
            >
              <div 
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${node.color}20` }}
              >
                <Icon className="w-4 h-4" style={{ color: node.color }} />
              </div>
              <span className="text-sm text-[#ACACBE] group-hover:text-[#F5F5F7] transition-fast">
                {node.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside className="w-64 border-r border-[#2C2C2E] bg-[#1C1C1E] overflow-y-auto">
      <div className="p-4">
        {renderCategory("Core", nodeCategories.core)}
        {renderCategory("Tools", nodeCategories.tools)}
        {renderCategory("Logic", nodeCategories.logic)}
        {renderCategory("Data", nodeCategories.data)}
      </div>
    </aside>
  );
}

