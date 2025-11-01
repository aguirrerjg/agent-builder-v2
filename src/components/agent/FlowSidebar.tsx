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
    <div className="mb-8">
      <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3 px-3">
        {title}
      </h3>
      <div className="space-y-2">
        {nodes.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              draggable
              onDragStart={(e) => onDragStart(e, node.type)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-grab active:cursor-grabbing group relative overflow-hidden",
                "hover:bg-white/10 backdrop-blur-sm transition-all duration-300",
                "border border-transparent hover:border-white/20"
              )}
            >
              {/* Subtle glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity blur-xl"
                style={{ backgroundColor: node.color }}
              />
              
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10 shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${node.color}, ${node.color}dd)`,
                }}
              >
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-white/80 group-hover:text-white transition-colors font-medium relative z-10">
                {node.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside className="w-72 border-r border-white/10 bg-white/5 backdrop-blur-2xl overflow-y-auto">
      <div className="p-5">
        {renderCategory("Core", nodeCategories.core)}
        {renderCategory("Tools", nodeCategories.tools)}
        {renderCategory("Logic", nodeCategories.logic)}
        {renderCategory("Data", nodeCategories.data)}
      </div>
    </aside>
  );
}

