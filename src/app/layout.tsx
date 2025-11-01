import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { AgentsProvider } from "@/contexts/AgentsContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DigitalHubAssist - AI Agent Builder",
  description: "Build and manage AI agents with an elite platform inspired by OpenAI's design philosophy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <AgentsProvider>
          <div className="flex flex-col h-screen bg-white dark:bg-[#1C1C1E] transition-colors">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 ml-[260px] overflow-y-auto bg-[#F7F7F8] dark:bg-[#1C1C1E]">
                {children}
              </main>
            </div>
          </div>
        </AgentsProvider>
      </body>
    </html>
  );
}
