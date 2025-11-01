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
          {children}
        </AgentsProvider>
      </body>
    </html>
  );
}
