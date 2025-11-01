import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

/**
 * Layout principal del dashboard
 * Incluye Header y Sidebar en todas las páginas del dashboard
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 ml-[260px] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

