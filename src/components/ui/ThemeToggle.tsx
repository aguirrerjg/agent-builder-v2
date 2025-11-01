"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";

/**
 * Switch animado para cambiar entre modo claro y oscuro
 * 
 * Características:
 * - Animación suave con Framer Motion
 * - Iconos de sol y luna
 * - Indicador visual del estado actual
 * - Diseño minimalista estilo OpenAI
 */
export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Evitar hidratación incorrecta
  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full bg-[#E5E5E5] dark:bg-[#2C2C2E] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#10A37F] focus:ring-offset-2 dark:focus:ring-offset-[#1C1C1E]"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Círculo deslizante */}
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-[#10A37F] shadow-md flex items-center justify-center"
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-white" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-[#10A37F]" />
        )}
      </motion.div>

      {/* Iconos de fondo */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Sun className={`w-3.5 h-3.5 transition-opacity ${!isDark ? 'opacity-0' : 'opacity-40 text-gray-400'}`} />
        <Moon className={`w-3.5 h-3.5 transition-opacity ${isDark ? 'opacity-0' : 'opacity-40 text-gray-400'}`} />
      </div>
    </button>
  );
}

