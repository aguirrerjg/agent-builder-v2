"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, FileText, Book, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Agent } from "@/types/agent";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  agents: Agent[];
}

type SearchCategory = "all" | "agents" | "templates" | "docs";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: "agent" | "template" | "doc";
  icon: React.ReactNode;
  href?: string;
}

/**
 * Modal de búsqueda estilo ⌘K / Spotlight
 * 
 * Características:
 * - Búsqueda en tiempo real
 * - Navegación por teclado (↑↓ Enter Esc)
 * - Categorías filtradas
 * - Animaciones suaves
 * - Resultados destacados
 */
export function SearchModal({ isOpen, onClose, agents }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [category, setCategory] = useState<SearchCategory>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock data para templates y docs
  const templates = [
    { id: "t1", name: "Customer Support Bot", description: "Ready-to-use support agent template" },
    { id: "t2", name: "Data Analyzer", description: "Analyze and visualize your data" },
    { id: "t3", name: "Content Writer", description: "Generate marketing content" },
  ];

  const docs = [
    { id: "d1", name: "Getting Started", description: "Learn how to create your first agent" },
    { id: "d2", name: "API Reference", description: "Complete API documentation" },
    { id: "d3", name: "Best Practices", description: "Tips for building better agents" },
  ];

  // Construir resultados de búsqueda
  const searchResults: SearchResult[] = [
    ...agents
      .filter(agent => 
        (category === "all" || category === "agents") &&
        (agent.name.toLowerCase().includes(query.toLowerCase()) ||
         agent.description.toLowerCase().includes(query.toLowerCase()) ||
         agent.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
      )
      .map(agent => ({
        id: agent.id,
        title: agent.name,
        description: agent.description,
        category: "agent" as const,
        icon: <Sparkles className="w-4 h-4 text-[#10A37F]" />,
      })),
    ...templates
      .filter(template =>
        (category === "all" || category === "templates") &&
        (template.name.toLowerCase().includes(query.toLowerCase()) ||
         template.description.toLowerCase().includes(query.toLowerCase()))
      )
      .map(template => ({
        id: template.id,
        title: template.name,
        description: template.description,
        category: "template" as const,
        icon: <FileText className="w-4 h-4 text-[#5B5BD6]" />,
      })),
    ...docs
      .filter(doc =>
        (category === "all" || category === "docs") &&
        (doc.name.toLowerCase().includes(query.toLowerCase()) ||
         doc.description.toLowerCase().includes(query.toLowerCase()))
      )
      .map(doc => ({
        id: doc.id,
        title: doc.name,
        description: doc.description,
        category: "doc" as const,
        icon: <Book className="w-4 h-4 text-[#F59E0B]" />,
      })),
  ];

  // Focus en input cuando se abre
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Reset selected index cuando cambia query
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, category]);

  // Navegación por teclado
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
          break;
        case "Enter":
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            handleResultClick(searchResults[selectedIndex]);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, searchResults, onClose]);

  const handleResultClick = (result: SearchResult) => {
    console.log("Selected:", result);
    onClose();
    
    // Navegar según la categoría
    switch (result.category) {
      case "agent":
        // Por ahora solo muestra en consola, luego navegará al detalle del agente
        console.log("Opening agent:", result.id);
        break;
      case "template":
        router.push("/templates");
        break;
      case "doc":
        router.push("/documentation");
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="relative w-full max-w-2xl mx-4 bg-white dark:bg-[#2C2C2E] rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header con input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E5E5E5] dark:border-[#3A3A3C]">
            <Search className="w-5 h-5 text-[#6E6E80] dark:text-[#ACACBE] flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search agents, templates, docs..."
              className="flex-1 bg-transparent border-none outline-none text-[#202123] dark:text-[#F5F5F7] placeholder:text-[#ACACBE] dark:placeholder:text-[#6E6E80] text-base"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-[#F7F7F8] dark:hover:bg-[#1C1C1E] transition-fast"
            >
              <X className="w-5 h-5 text-[#6E6E80] dark:text-[#ACACBE]" />
            </button>
          </div>

          {/* Filtros de categoría */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E5E5E5] dark:border-[#3A3A3C]">
            {(["all", "agents", "templates", "docs"] as SearchCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-fast capitalize",
                  category === cat
                    ? "bg-[#10A37F] text-white"
                    : "text-[#6E6E80] dark:text-[#ACACBE] hover:bg-[#F7F7F8] dark:hover:bg-[#1C1C1E]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Resultados */}
          <div className="max-h-[400px] overflow-y-auto">
            {searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-[#F7F7F8] dark:bg-[#1C1C1E] flex items-center justify-center mb-3">
                  <Search className="w-6 h-6 text-[#6E6E80] dark:text-[#ACACBE]" />
                </div>
                <p className="text-sm text-[#6E6E80] dark:text-[#ACACBE]">
                  {query ? `No results found for "${query}"` : "Start typing to search..."}
                </p>
              </div>
            ) : (
              <div className="py-2">
                {searchResults.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 transition-fast group",
                      index === selectedIndex
                        ? "bg-[#F7F7F8] dark:bg-[#1C1C1E]"
                        : "hover:bg-[#F7F7F8] dark:hover:bg-[#1C1C1E]"
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#2C2C2E] border border-[#E5E5E5] dark:border-[#3A3A3C] flex items-center justify-center flex-shrink-0">
                      {result.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-[#202123] dark:text-[#F5F5F7] mb-0.5">
                        {result.title}
                      </div>
                      <div className="text-xs text-[#6E6E80] dark:text-[#ACACBE] line-clamp-1">
                        {result.description}
                      </div>
                    </div>
                    <ArrowRight
                      className={cn(
                        "w-4 h-4 text-[#6E6E80] dark:text-[#ACACBE] transition-all",
                        index === selectedIndex
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      )}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer con atajos */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-[#E5E5E5] dark:border-[#3A3A3C] bg-[#F7F7F8] dark:bg-[#1C1C1E]">
            <div className="flex items-center gap-4 text-xs text-[#6E6E80] dark:text-[#ACACBE]">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#2C2C2E] border border-[#E5E5E5] dark:border-[#3A3A3C] rounded text-[10px]">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#2C2C2E] border border-[#E5E5E5] dark:border-[#3A3A3C] rounded text-[10px]">↵</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#2C2C2E] border border-[#E5E5E5] dark:border-[#3A3A3C] rounded text-[10px]">Esc</kbd>
                Close
              </span>
            </div>
            <div className="text-xs text-[#ACACBE] dark:text-[#6E6E80]">
              {searchResults.length} {searchResults.length === 1 ? "result" : "results"}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

