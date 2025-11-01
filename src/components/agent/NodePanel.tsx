"use client";

import { X, Trash2, Settings, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Node } from "@xyflow/react";

interface NodePanelProps {
  selectedNode: Node | null;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (data: any) => void;
}

/**
 * Panel lateral para editar propiedades de nodos
 * Diseño moderno con glassmorphism y micro-interacciones
 */
export function NodePanel({ selectedNode, onClose, onDelete, onUpdate }: NodePanelProps) {
  if (!selectedNode) return null;

  const handleLabelChange = (newLabel: string) => {
    onUpdate({ ...selectedNode.data, label: newLabel });
  };

  const handleDescriptionChange = (newDescription: string) => {
    onUpdate({ ...selectedNode.data, description: newDescription });
  };

  const getNodeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      agent: <Sparkles className="w-5 h-5 text-[#5B5BD6]" />,
      tool: <Settings className="w-5 h-5 text-[#F59E0B]" />,
    };
    return icons[type || "agent"] || <Settings className="w-5 h-5 text-white" />;
  };

  const getNodeColor = (type: string) => {
    const colors: Record<string, string> = {
      agent: "#5B5BD6",
      start: "#10A37F",
      end: "#EF4444",
      tool: "#F59E0B",
      logic: "#EC4899",
      note: "#6E6E80",
      transform: "#10B981",
      setstate: "#10B981",
    };
    return colors[type || "agent"] || "#5B5BD6";
  };

  // Nodos críticos que no se pueden eliminar
  const isCriticalNode = selectedNode.type === "start" || selectedNode.type === "end";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-16 bottom-0 w-96 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-50"
      >
        {/* Header */}
        <div className="relative p-6 border-b border-white/10">
          {/* Glow effect */}
          <div 
            className="absolute inset-0 opacity-20 blur-2xl"
            style={{ background: `radial-gradient(circle at top, ${getNodeColor(selectedNode.type || '')}40, transparent)` }}
          />
          
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl"
                style={{ 
                  background: `linear-gradient(135deg, ${getNodeColor(selectedNode.type || '')}, ${getNodeColor(selectedNode.type || '')}dd)`
                }}
              >
                {getNodeIcon(selectedNode.type || '')}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {selectedNode.data.label || "Node"}
                </h3>
                <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">
                  {selectedNode.type || "Node"}
                </span>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              <X className="w-5 h-5 text-white/60 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-180px)]">
          {/* Label Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/70 uppercase tracking-wider">
              Name
            </label>
            <input
              type="text"
              value={selectedNode.data.label || ""}
              onChange={(e) => handleLabelChange(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all duration-300"
              placeholder="Enter node name..."
            />
          </div>

          {/* Description Field */}
          {selectedNode.type !== "start" && selectedNode.type !== "end" && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                Description
              </label>
              <textarea
                value={selectedNode.data.description || ""}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all duration-300 resize-none"
                placeholder="Enter description..."
              />
            </div>
          )}

          {/* Node ID (read-only) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/70 uppercase tracking-wider">
              Node ID
            </label>
            <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white/50 text-sm font-mono">
              {selectedNode.id}
            </div>
          </div>

          {/* Additional Settings based on node type */}
          {selectedNode.type === "agent" && (
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                Agent Settings
              </h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-lg bg-white/5 border-2 border-white/10 checked:bg-[#10A37F] checked:border-[#10A37F] transition-all"
                  />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                    Enable memory
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-lg bg-white/5 border-2 border-white/10 checked:bg-[#10A37F] checked:border-[#10A37F] transition-all"
                  />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                    Streaming response
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-gradient-to-t from-black/20 to-transparent backdrop-blur-xl">
          {isCriticalNode ? (
            <div className="flex items-start gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-400 text-xs">⚠️</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white/70 mb-1">
                  Critical Node
                </p>
                <p className="text-xs text-white/50 leading-relaxed">
                  {selectedNode.type === "start" 
                    ? "The Start node cannot be deleted as it's the entry point of your workflow."
                    : "The End node cannot be deleted as it's the exit point of your workflow."}
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={onDelete}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/30 hover:border-red-500/50 text-red-300 hover:text-red-200 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Trash2 className="w-5 h-5" />
              Delete Node
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

