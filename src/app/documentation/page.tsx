"use client";

import { Book, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocItem {
  id: string;
  name: string;
  description: string;
  category: string;
  readTime?: string;
}

/**
 * Página de Documentation
 * Recursos de aprendizaje y guías
 */
export default function DocumentationPage() {
  const docs: DocItem[] = [
    { 
      id: "d1", 
      name: "Getting Started", 
      description: "Learn how to create your first agent",
      category: "Basics",
      readTime: "5 min"
    },
    { 
      id: "d2", 
      name: "API Reference", 
      description: "Complete API documentation",
      category: "Reference",
      readTime: "15 min"
    },
    { 
      id: "d3", 
      name: "Best Practices", 
      description: "Tips for building better agents",
      category: "Advanced",
      readTime: "10 min"
    },
  ];

  const handleDocClick = (docId: string) => {
    console.log("Doc clicked:", docId);
    // Aquí navegarías a la página del documento
  };

  return (
    <div className="min-h-full bg-white dark:bg-[#1C1C1E]">
      <div className="mx-auto max-w-[1280px] px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#202123] dark:text-[#F5F5F7] mb-2">
            Documentation
          </h1>
          <p className="text-base text-[#6E6E80] dark:text-[#ACACBE]">
            Learn how to build and manage AI agents
          </p>
        </div>

        {/* Documentation List */}
        <div className="space-y-3">
          {docs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => handleDocClick(doc.id)}
              className={cn(
                "w-full bg-white dark:bg-[#2C2C2E] border border-[#E5E5E5] dark:border-[#3A3A3C] rounded-xl p-5 cursor-pointer transition-standard group text-left",
                "hover:border-[#F59E0B] hover:shadow-[0_2px_8px_rgba(245,158,11,0.1)]",
                "flex items-center gap-4"
              )}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-[#F7F7F8] dark:bg-[#1C1C1E] flex items-center justify-center border border-[#E5E5E5] dark:border-[#3A3A3C] flex-shrink-0">
                <Book className="w-6 h-6 text-[#F59E0B]" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-semibold text-[#202123] dark:text-[#F5F5F7]">
                    {doc.name}
                  </h3>
                  <span className="px-2 py-0.5 text-xs font-medium text-[#F59E0B] bg-[#F7F7F8] dark:bg-[#1C1C1E] rounded">
                    {doc.category}
                  </span>
                </div>
                <p className="text-sm text-[#6E6E80] dark:text-[#ACACBE]">
                  {doc.description}
                </p>
              </div>

              {/* Read time & Arrow */}
              <div className="flex items-center gap-4 flex-shrink-0">
                {doc.readTime && (
                  <span className="text-xs text-[#ACACBE] dark:text-[#6E6E80]">
                    {doc.readTime} read
                  </span>
                )}
                <ArrowRight className="w-5 h-5 text-[#6E6E80] dark:text-[#ACACBE] group-hover:text-[#F59E0B] group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

