/**
 * Tipos TypeScript para el sistema de agentes
 * Define la estructura de datos de los agentes de IA
 */

export type AgentStatus = "active" | "inactive" | "draft";

export type AgentCapability = 
  | "natural-language-processing"
  | "web-search"
  | "code-generation"
  | "image-analysis"
  | "api-integration"
  | "data-analysis";

export interface Agent {
  id: string;
  name: string;
  description: string;
  icon?: string;
  status: AgentStatus;
  capabilities: AgentCapability[];
  tags: string[];
  
  // Estadísticas
  totalRuns: number;
  successRate: number;
  avgResponseTime: number;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  
  // Configuración
  instructions?: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  previewImage?: string;
  creator: string;
  rating: number;
  uses: number;
  category: string;
  capabilities: AgentCapability[];
}

