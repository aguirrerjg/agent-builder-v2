"use client";

import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { motion } from "framer-motion";

/**
 * Controles personalizados para el editor de flujo
 * Diseño moderno con glassmorphism
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

  const controls = [
    {
      icon: ZoomIn,
      label: "Zoom In",
      onClick: handleZoomIn,
      shortcut: "+",
    },
    {
      icon: ZoomOut,
      label: "Zoom Out",
      onClick: handleZoomOut,
      shortcut: "-",
    },
    {
      icon: Maximize2,
      label: "Fit View",
      onClick: handleFitView,
      shortcut: "⌘0",
    },
    {
      icon: RotateCcw,
      label: "Reset",
      onClick: handleReset,
      shortcut: "⌘R",
    },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50">
        {controls.map((control, index) => {
          const Icon = control.icon;
          return (
            <div key={index} className="relative group">
              <button
                onClick={control.onClick}
                className="p-3 rounded-xl bg-white/0 hover:bg-white/10 border border-transparent hover:border-white/20 transition-all duration-300 transform hover:scale-110 active:scale-95"
                aria-label={control.label}
              >
                <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </button>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
                <div className="px-3 py-1.5 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl whitespace-nowrap">
                  <p className="text-xs font-semibold text-white mb-0.5">
                    {control.label}
                  </p>
                  <p className="text-xs text-white/50 font-mono">
                    {control.shortcut}
                  </p>
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                  <div className="w-2 h-2 bg-black/90 border-r border-b border-white/10 rotate-45" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

