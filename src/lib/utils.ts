import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind de manera inteligente
 * Evita conflictos entre clases y mantiene la última en caso de duplicados
 * 
 * Ejemplo: cn("px-2 py-1", "px-4") => "py-1 px-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

