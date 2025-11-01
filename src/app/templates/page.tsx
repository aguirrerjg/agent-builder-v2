"use client";

import { FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
}

/**
 * Página de Templates
 * Muestra templates predefinidos para crear agentes rápidamente
 */
export default function TemplatesPage() {
  const templates: Template[] = [
    { 
      id: "t1", 
      name: "Customer Support Bot", 
      description: "Ready-to-use support agent template",
      category: "Support"
    },
    { 
      id: "t2", 
      name: "Data Analyzer", 
      description: "Analyze and visualize your data",
      category: "Analytics"
    },
    { 
      id: "t3", 
      name: "Content Writer", 
      description: "Generate marketing content",
      category: "Marketing"
    },
  ];

  const handleTemplateClick = (templateId: string) => {
    console.log("Template clicked:", templateId);
    // Aquí abrirías el modal para crear un agente desde el template
  };

  return (
    <div className="min-h-full bg-white dark:bg-[#1C1C1E]">
      <div className="mx-auto max-w-[1280px] px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#202123] dark:text-[#F5F5F7] mb-2">
            Templates
          </h1>
          <p className="text-base text-[#6E6E80] dark:text-[#ACACBE]">
            Start building faster with ready-to-use agent templates
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateClick(template.id)}
              className={cn(
                "bg-white dark:bg-[#2C2C2E] border border-[#E5E5E5] dark:border-[#3A3A3C] rounded-xl p-6 cursor-pointer transition-standard group text-left",
                "hover:border-[#5B5BD6] hover:shadow-[0_4px_12px_rgba(91,91,214,0.1)] hover:-translate-y-0.5",
                "min-h-[180px] flex flex-col"
              )}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-[#F7F7F8] dark:bg-[#1C1C1E] flex items-center justify-center border border-[#E5E5E5] dark:border-[#3A3A3C] mb-4">
                <FileText className="w-6 h-6 text-[#5B5BD6]" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-[#202123] dark:text-[#F5F5F7] mb-2">
                {template.name}
              </h3>
              <p className="text-sm text-[#6E6E80] dark:text-[#ACACBE] leading-relaxed mb-4 flex-1">
                {template.description}
              </p>

              {/* Category Badge */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-medium text-[#5B5BD6] dark:text-[#7676FF] bg-[#F7F7F8] dark:bg-[#1C1C1E] rounded-md">
                  {template.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

