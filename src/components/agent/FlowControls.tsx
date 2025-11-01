"use client";

import { Plus, Minus, Maximize2, RotateCcw } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { motion } from "framer-motion";

/**
 * Controles personalizados para el editor de flujo
 * Diseño más intuitivo y visual
 */
export function FlowControls() {
  const { zoomIn, zoomOut, fitView, setCenter } = useReactFlow();

  const handleZoomIn = () => {
    zoomIn({ duration: 300 });
  };

  const handleZoomOut = () => {
    zoomOut({ duration: 300 });
  };

  const handleFitView = () => {
    fitView({ duration: 500, padding: 0.2 });
  };

  const handleReset = () => {
    setCenter(0, 0, { zoom: 1, duration: 500 });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
    >
      <div className="flex items-center gap-1 px-2 py-2 bg-[#2A2A3C]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl shadow-black/50">
        {/* Zoom Out */}
        <button
          onClick={handleZoomOut}
          className="p-2.5 rounded-xl bg-transparent hover:bg-white/10 transition-all duration-200 group"
          aria-label="Zoom Out"
        >
          <Minus className="w-5 h-5 text-white/90 group-hover:text-white" strokeWidth={2.5} />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/20" />

        {/* Zoom In */}
        <button
          onClick={handleZoomIn}
          className="p-2.5 rounded-xl bg-transparent hover:bg-white/10 transition-all duration-200 group"
          aria-label="Zoom In"
        >
          <Plus className="w-5 h-5 text-white/90 group-hover:text-white" strokeWidth={2.5} />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/20" />

        {/* Fit View */}
        <button
          onClick={handleFitView}
          className="p-2.5 rounded-xl bg-transparent hover:bg-white/10 transition-all duration-200 group"
          aria-label="Fit to Screen"
        >
          <Maximize2 className="w-5 h-5 text-white/90 group-hover:text-white" strokeWidth={2} />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/20" />

        {/* Reset */}
        <button
          onClick={handleReset}
          className="p-2.5 rounded-xl bg-transparent hover:bg-white/10 transition-all duration-200 group"
          aria-label="Reset View"
        >
          <RotateCcw className="w-5 h-5 text-white/90 group-hover:text-white" strokeWidth={2} />
        </button>
      </div>
    </motion.div>
  );
}

