# DigitalHubAssist - AI Agent Builder

Plataforma de élite para construir y gestionar agentes de IA, inspirada en la filosofía de diseño de OpenAI.

## Instalación y Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 + TypeScript
- **Estilos**: Tailwind CSS 3
- **Flow Editor**: React Flow
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod
- **State**: Zustand
- **Icons**: Lucide React

## Estructura del Proyecto

```
/src
  /app          # Next.js App Router
    /layout.tsx # Layout raíz con Header + Sidebar
    /page.tsx   # Página principal (Grid de agentes)
    /globals.css # Sistema de diseño OpenAI
  /components
    /layout     # Header, Sidebar
    /ui         # AgentCard, EmptyState, etc.
  /lib          # Utilidades (cn helper)
  /types        # Tipos TypeScript
  /hooks        # Custom React hooks
```

## Sistema de Diseño

Inspirado en OpenAI con colores minimalistas:
- Verde acento: `#10A37F`
- Tipografía: Inter
- Espaciado generoso
- Sombras sutiles

## Comandos

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run lint` - Linting con ESLint

## Problema Conocido

Si ves el error "Module parse failed: Unexpected character '@'" al iniciar, ejecuta:

```bash
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

Este es un problema de caché/compatibilidad con Next.js 14 + Tailwind CSS.
