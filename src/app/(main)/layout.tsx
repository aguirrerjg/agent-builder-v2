import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

/**
 * Layout principal con Header y Sidebar
 * Para todas las páginas principales (home, templates, docs, etc.)
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#1C1C1E] transition-colors">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 ml-[260px] overflow-y-auto bg-[#F7F7F8] dark:bg-[#1C1C1E]">
          {children}
        </main>
      </div>
    </div>
  );
}

