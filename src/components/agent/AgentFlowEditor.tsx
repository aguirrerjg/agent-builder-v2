"use client";

import { useCallback, useState } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MiniMap,
  BackgroundVariant,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { FlowSidebar } from "./FlowSidebar";
import { FlowToolbar } from "./FlowToolbar";
import { NodePanel } from "./NodePanel";
import { FlowControls } from "./FlowControls";
import { AgentNode } from "./nodes/AgentNode";
import { StartNode } from "./nodes/StartNode";
import { EndNode } from "./nodes/EndNode";
import { ToolNode } from "./nodes/ToolNode";
import { LogicNode } from "./nodes/LogicNode";
import { NoteNode } from "./nodes/NoteNode";
import { TransformNode } from "./nodes/TransformNode";
import { SetStateNode } from "./nodes/SetStateNode";

const nodeTypes = {
  start: StartNode,
  agent: AgentNode,
  end: EndNode,
  tool: ToolNode,
  logic: LogicNode,
  note: NoteNode,
  transform: TransformNode,
  setstate: SetStateNode,
};

const initialNodes: Node[] = [
  {
    id: "start-1",
    type: "start",
    position: { x: 250, y: 100 },
    data: { label: "Start" },
  },
  {
    id: "agent-1",
    type: "agent",
    position: { x: 450, y: 100 },
    data: { label: "My agent", description: "AI Agent" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-start-agent",
    source: "start-1",
    target: "agent-1",
    type: "smoothstep",
    animated: true,
  },
];

interface AgentFlowEditorProps {
  agentId?: string;
  agentName?: string;
}

/**
 * Editor de flujo visual para agentes
 * Estilo OpenAI mejorado con nuestro diseño
 */
export function AgentFlowEditor({ agentId, agentName: initialAgentName }: AgentFlowEditorProps = {}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [agentName, setAgentName] = useState(initialAgentName || "New workflow");
  const [isDraft, setIsDraft] = useState(!agentId);
  const [selectedNode, setSelectedNode] = useState<Node<any> | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const reactFlowBounds = (event.target as HTMLElement)
        .closest(".react-flow")
        ?.getBoundingClientRect();
      
      if (!reactFlowBounds) return;

      const position = {
        x: event.clientX - reactFlowBounds.left - 75,
        y: event.clientY - reactFlowBounds.top - 25,
      };

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { 
          label: type === "agent" ? "New Agent" : type.charAt(0).toUpperCase() + type.slice(1),
          description: getNodeDescription(type)
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const getNodeDescription = (type: string) => {
    const descriptions: Record<string, string> = {
      agent: "AI Agent",
      tool: "Tool",
      logic: "Logic Block",
      end: "End Point",
      note: "Add notes",
      transform: "Transform data",
      setstate: "Update state",
    };
    return descriptions[type] || "";
  };

  const handleSave = () => {
    console.log("Saving workflow:", { agentName, nodes, edges });
    // Aquí guardarías el workflow
  };

  const handlePublish = () => {
    setIsDraft(false);
    console.log("Publishing workflow:", { agentName, nodes, edges });
    // Aquí publicarías el workflow
  };

  const handleNodeClick = useCallback((_event: React.MouseEvent, node: Node<any>) => {
    setSelectedNode(node);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleNodeUpdate = useCallback((data: any) => {
    if (!selectedNode) return;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return { ...node, data };
        }
        return node;
      })
    );
    setSelectedNode({ ...selectedNode, data });
  }, [selectedNode, setNodes]);

  const handleNodeDelete = useCallback(() => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setEdges((eds) => eds.filter((edge) => 
      edge.source !== selectedNode.id && edge.target !== selectedNode.id
    ));
    setSelectedNode(null);
  }, [selectedNode, setNodes, setEdges]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-[#0F0F14] via-[#141420] to-[#1A1A2E]">
      {/* Top Toolbar */}
      <FlowToolbar
        agentName={agentName}
        isDraft={isDraft}
        onNameChange={setAgentName}
        onSave={handleSave}
        onPublish={handlePublish}
      />

      {/* Main Content: Sidebar + Flow */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#10A37F]/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5B5BD6]/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        {/* Left Sidebar */}
        <FlowSidebar />

        {/* Flow Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={handleNodeClick}
            onPaneClick={handlePaneClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-transparent"
            defaultEdgeOptions={{
              type: "smoothstep",
              animated: true,
              style: { 
                stroke: "url(#gradient)",
                strokeWidth: 3,
                filter: "drop-shadow(0 0 8px rgba(16, 163, 127, 0.3))"
              },
            }}
          >
            {/* Gradient definition for edges */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10A37F" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#5B5BD6" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={24} 
              size={1.5}
              color="rgba(255, 255, 255, 0.05)"
            />
            <MiniMap
              className="!bg-white/5 !backdrop-blur-xl !border !border-white/10 !rounded-2xl !shadow-2xl"
              nodeColor={(node) => {
                switch (node.type) {
                  case "start":
                    return "#10A37F";
                  case "agent":
                    return "#5B5BD6";
                  case "end":
                    return "#EF4444";
                  case "tool":
                    return "#F59E0B";
                  case "logic":
                    return "#EC4899";
                  default:
                    return "#6E6E80";
                }
              }}
              maskColor="rgba(0, 0, 0, 0.6)"
            />
          </ReactFlow>

          {/* Flow Controls */}
          <FlowControls />

          {/* Node Panel */}
          <NodePanel
            selectedNode={selectedNode}
            onClose={() => setSelectedNode(null)}
            onDelete={handleNodeDelete}
            onUpdate={handleNodeUpdate}
          />
        </div>
      </div>
    </div>
  );
}

