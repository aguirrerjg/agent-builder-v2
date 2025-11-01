"use client";

import { 
  FolderOpen, 
  Star, 
  BarChart3, 
  Settings, 
  Plus,
  ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * Sidebar izquierdo estilo ChatGPT/OpenAI
 * 
 * Características:
 * - Lista de proyectos
 * - Navegación principal
 * - Botón destacado para crear nuevo agente
 * - Estado activo con borde verde
 */
export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const projects = [
    { id: "1", name: "Marketing Hub" },
    { id: "2", name: "Sales Assistant" },
    { id: "3", name: "Data Analyzer" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-[260px] bg-[#F7F7F8] dark:bg-[#2C2C2E] border-r border-[#E5E5E5] dark:border-[#3A3A3C] overflow-y-auto transition-colors">
      <div className="flex flex-col h-full">
        {/* Workspace Header */}
        <div className="p-4 border-b border-[#E5E5E5] dark:border-[#3A3A3C]">
          <h3 className="text-sm font-semibold text-[#202123] dark:text-[#F5F5F7]">Workspace</h3>
        </div>

        {/* Projects Section */}
        <div className="flex-1 p-4">
          <button
            onClick={() => router.push("/")}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-fast mb-2",
              isActive("/")
                ? "bg-white dark:bg-[#1C1C1E] text-[#10A37F] border-l-4 border-[#10A37F]"
                : "text-[#6E6E80] dark:text-[#ACACBE] hover:bg-[#EBEBEB] dark:hover:bg-[#1C1C1E] hover:text-[#202123] dark:hover:text-[#F5F5F7]"
            )}
          >
            <FolderOpen className={cn(
              "w-4 h-4",
              isActive("/") ? "text-[#10A37F]" : ""
            )} />
            <span>My Projects</span>
          </button>

          {/* Project List */}
          <div className="ml-7 space-y-1 mb-6">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-fast",
                  activeProject === project.id
                    ? "bg-white dark:bg-[#1C1C1E] text-[#202123] dark:text-[#F5F5F7] font-medium"
                    : "text-[#6E6E80] dark:text-[#ACACBE] hover:bg-[#EBEBEB] dark:hover:bg-[#1C1C1E] hover:text-[#202123] dark:hover:text-[#F5F5F7]"
                )}
              >
                <span>• {project.name}</span>
                {activeProject === project.id && (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#E5E5E5] dark:bg-[#3A3A3C] mb-4" />

          {/* Navigation Items */}
          <nav className="space-y-1 mb-6">
            {[
              { id: "templates", icon: Star, label: "Templates", path: "/templates" },
              { id: "analytics", icon: BarChart3, label: "Analytics", path: "/analytics" },
              { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
            ].map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-fast",
                    active
                      ? "bg-white dark:bg-[#1C1C1E] text-[#10A37F] border-l-4 border-[#10A37F]"
                      : "text-[#6E6E80] dark:text-[#ACACBE] hover:bg-[#EBEBEB] dark:hover:bg-[#1C1C1E] hover:text-[#202123] dark:hover:text-[#F5F5F7]"
                  )}
                >
                  <Icon className={cn(
                    "w-4 h-4",
                    active ? "text-[#10A37F]" : ""
                  )} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="h-px bg-[#E5E5E5] dark:bg-[#3A3A3C] mb-4" />
        </div>

        {/* Create Agent Button */}
        <div className="p-4 border-t border-[#E5E5E5] dark:border-[#3A3A3C]">
          <button 
            onClick={() => router.push("/agent/new")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#10A37F] text-white rounded-lg font-medium hover:bg-[#0E8C6C] transition-fast active:scale-[0.98]"
          >
            <Plus className="w-5 h-5" />
            <span>New Agent</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

