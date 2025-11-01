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
import { AgentNode } from "./nodes/AgentNode";
import { StartNode } from "./nodes/StartNode";
import { EndNode } from "./nodes/EndNode";
import { ToolNode } from "./nodes/ToolNode";
import { LogicNode } from "./nodes/LogicNode";

const nodeTypes = {
  start: StartNode,
  agent: AgentNode,
  end: EndNode,
  tool: ToolNode,
  logic: LogicNode,
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

/**
 * Editor de flujo visual para agentes
 * Estilo OpenAI mejorado con nuestro diseño
 */
export function AgentFlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [agentName, setAgentName] = useState("New workflow");
  const [isDraft, setIsDraft] = useState(true);

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

  return (
    <div className="h-screen flex flex-col bg-[#0A0A0A]">
      {/* Top Toolbar */}
      <FlowToolbar
        agentName={agentName}
        isDraft={isDraft}
        onNameChange={setAgentName}
        onSave={handleSave}
        onPublish={handlePublish}
      />

      {/* Main Content: Sidebar + Flow */}
      <div className="flex flex-1 overflow-hidden">
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
            nodeTypes={nodeTypes}
            fitView
            className="bg-[#0A0A0A]"
            defaultEdgeOptions={{
              type: "smoothstep",
              animated: true,
              style: { stroke: "#3A3A3C", strokeWidth: 2 },
            }}
          >
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={20} 
              size={1}
              color="#2C2C2E"
            />
            <Controls 
              className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-lg shadow-lg"
              showInteractive={false}
            />
            <MiniMap
              className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-lg"
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
        </div>
      </div>
    </div>
  );
}

