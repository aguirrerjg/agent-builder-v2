"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Hook personalizado para manejar el tema de la aplicación
 * 
 * Características:
 * - Persiste el tema en localStorage
 * - Detecta preferencia del sistema si no hay tema guardado
 * - Aplica la clase 'dark' al documentElement
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Cargar tema guardado o detectar preferencia del sistema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    setMounted(true);

    // Aplicar clase al documento
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Función para cambiar el tema
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Actualizar clase en documento
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return { theme, toggleTheme, mounted };
}

