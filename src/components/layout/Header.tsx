"use client";

import { Menu, Search, BookOpen, Code2, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Header principal de la aplicación estilo OpenAI
 * 
 * Características:
 * - Logo y nombre de la app
 * - Barra de búsqueda central con shortcut ⌘K
 * - Links de navegación (Docs, API)
 * - Avatar del usuario con menú
 */
export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-[#E5E5E5] bg-white">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left Section - Logo y nombre */}
        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-[#F7F7F8] transition-fast"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-[#202123]" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-[#202123]">
              DigitalHubAssist
            </span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-8">
          <div
            className={cn(
              "flex items-center gap-3 h-10 px-4 rounded-lg border border-[#E5E5E5] bg-[#F7F7F8] transition-standard",
              "hover:border-[#D0D0D0] hover:bg-white",
              "focus-within:border-[#10A37F] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(16,163,127,0.1)]",
              searchOpen && "border-[#10A37F] bg-white shadow-[0_0_0_3px_rgba(16,163,127,0.1)]"
            )}
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-4 h-4 text-[#6E6E80] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search agents, templates, docs..."
              className="flex-1 bg-transparent border-none outline-none text-[#202123] placeholder:text-[#ACACBE] text-sm"
            />
            <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-[#6E6E80] bg-white border border-[#E5E5E5] rounded">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </div>
        </div>

        {/* Right Section - Links y Avatar */}
        <div className="flex items-center gap-6">
          <button className="hidden md:flex items-center gap-2 text-sm text-[#202123] hover:text-[#10A37F] transition-fast">
            <BookOpen className="w-4 h-4" />
            <span>Documentation</span>
          </button>
          <button className="hidden md:flex items-center gap-2 text-sm text-[#202123] hover:text-[#10A37F] transition-fast">
            <Code2 className="w-4 h-4" />
            <span>API</span>
          </button>
          <button className="flex items-center justify-center w-9 h-9 rounded-full bg-[#10A37F] text-white hover:bg-[#0E8C6C] transition-fast">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

