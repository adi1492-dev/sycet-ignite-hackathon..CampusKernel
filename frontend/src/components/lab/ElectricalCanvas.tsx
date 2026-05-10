"use client";

import { useState, useRef, useEffect } from "react";

// A simple structure for circuit components
interface ComponentNode {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  props: any;
  state: any;
}

interface Wire {
  id: string;
  startNode: string;
  endNode: string;
}

export default function ElectricalCanvas({ draggedComponent, setDraggedComponent }: any) {
  const [nodes, setNodes] = useState<ComponentNode[]>([]);
  const [wires, setWires] = useState<Wire[]>([]);
  
  // UI State for drawing wires
  const [isDrawingWire, setIsDrawingWire] = useState(false);
  const [wireStartNode, setWireStartNode] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedComponent || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newNode: ComponentNode = {
      id: `comp_${Date.now()}`,
      type: draggedComponent.type,
      name: draggedComponent.name,
      x,
      y,
      props: { ...draggedComponent },
      state: { isOn: false, current: 0, voltage: 0 },
    };

    setNodes([...nodes, newNode]);
    setDraggedComponent(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrawingWire && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleNodeClick = (nodeId: string) => {
    if (!isDrawingWire) {
      // Start drawing wire
      setIsDrawingWire(true);
      setWireStartNode(nodeId);
    } else {
      // Finish drawing wire
      if (wireStartNode !== nodeId) {
        setWires([...wires, {
          id: `wire_${Date.now()}`,
          startNode: wireStartNode!,
          endNode: nodeId
        }]);
      }
      setIsDrawingWire(false);
      setWireStartNode(null);
    }
  };

  // Basic Circuit Solver (Very Simplified for v1 Demo)
  // This just checks if there's a closed loop containing a power source
  useEffect(() => {
    // Real Nodal Analysis is complex. For this demo, we'll implement a basic heuristic:
    // If a node is connected via wires to a source, and there is a closed path, power it.
    
    // Find power sources
    const sources = nodes.filter(n => n.type === 'source');
    
    // Build adjacency list
    const adj = new Map<string, string[]>();
    nodes.forEach(n => adj.set(n.id, []));
    wires.forEach(w => {
      adj.get(w.startNode)?.push(w.endNode);
      adj.get(w.endNode)?.push(w.startNode);
    });

    // Simple BFS to find connected components to power sources
    const poweredNodes = new Set<string>();
    
    sources.forEach(source => {
      const queue = [source.id];
      const visited = new Set<string>([source.id]);
      poweredNodes.add(source.id);

      while (queue.length > 0) {
        const curr = queue.shift()!;
        const neighbors = adj.get(curr) || [];
        for (const next of neighbors) {
          // If we hit a switch that is open, we can't propagate power
          const nextNode = nodes.find(n => n.id === next);
          if (nextNode?.type === 'switch' && nextNode.state.state === 'open') {
            continue; 
          }

          if (!visited.has(next)) {
            visited.add(next);
            poweredNodes.add(next);
            queue.push(next);
          }
        }
      }
    });

    // Update node states based on power
    setNodes(prev => prev.map(n => ({
      ...n,
      state: { ...n.state, isOn: poweredNodes.has(n.id) }
    })));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wires, nodes.length]); // Re-run when wires or number of nodes change

  const toggleSwitch = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // prevent wire drawing
    setNodes(prev => prev.map(n => {
      if (n.id === id && n.type === 'switch') {
        return { ...n, state: { ...n.state, state: n.state.state === 'open' ? 'closed' : 'open' } };
      }
      return n;
    }));
  };

  // Render Helpers
  const renderComponent = (node: ComponentNode) => {
    let bgColor = "bg-slate-700";
    let icon = "⚙️";

    if (node.type === "source") { bgColor = "bg-red-900"; icon = "🔋"; }
    if (node.type === "resistor") { bgColor = "bg-orange-800"; icon = "〰️"; }
    if (node.type === "led") { 
      bgColor = node.state.isOn ? "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.7)]" : "bg-slate-800"; 
      icon = "💡"; 
    }
    if (node.type === "switch") { 
      bgColor = "bg-slate-600"; 
      icon = node.state.state === 'open' ? "🔌 (Open)" : "🔌 (Closed)"; 
    }

    return (
      <div 
        key={node.id}
        className={`absolute w-16 h-16 rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 transition-all ${isDrawingWire && wireStartNode === node.id ? 'border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'border-white/10 hover:border-white/30'} ${bgColor}`}
        style={{ left: node.x - 32, top: node.y - 32 }}
        onClick={() => handleNodeClick(node.id)}
      >
        <span className="text-xl">{icon}</span>
        <span className="text-[10px] text-white/70 font-mono mt-1 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center px-1">
          {node.name}
        </span>
        {node.type === 'switch' && (
           <button 
             className="absolute -bottom-6 bg-slate-800 text-[10px] px-2 py-0.5 rounded border border-white/20 hover:bg-slate-700"
             onClick={(e) => toggleSwitch(e, node.id)}
           >
             Toggle
           </button>
        )}
      </div>
    );
  };

  return (
    <div 
      className="w-full h-full relative overflow-hidden"
      ref={canvasRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseMove={handleMouseMove}
      onClick={() => {
        // Cancel wire drawing if clicked on empty space
        if (isDrawingWire) {
          setIsDrawingWire(false);
          setWireStartNode(null);
        }
      }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* SVG layer for wires */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {/* Render existing wires */}
        {wires.map((w) => {
          const start = nodes.find(n => n.id === w.startNode);
          const end = nodes.find(n => n.id === w.endNode);
          if (!start || !end) return null;
          // Color wire based on power state (simplified)
          const isPowered = start.state.isOn && end.state.isOn;
          return (
            <line 
              key={w.id}
              x1={start.x} y1={start.y} 
              x2={end.x} y2={end.y} 
              stroke={isPowered ? "#ef4444" : "#475569"} 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
          );
        })}

        {/* Render drawing wire */}
        {isDrawingWire && wireStartNode && (
          <line 
            x1={nodes.find(n => n.id === wireStartNode)?.x} 
            y1={nodes.find(n => n.id === wireStartNode)?.y} 
            x2={mousePos.x} 
            y2={mousePos.y} 
            stroke="#6366f1" 
            strokeWidth="2" 
            strokeDasharray="5,5" 
          />
        )}
      </svg>

      {/* Render Components */}
      <div className="absolute inset-0 z-20">
        {nodes.map(renderComponent)}
      </div>

      {/* Overlay Instructions */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900/50 backdrop-blur rounded-full text-xs text-slate-400 border border-white/5 pointer-events-none z-30">
        Drag electrical components. Click nodes sequentially to connect wires.
      </div>
    </div>
  );
}
