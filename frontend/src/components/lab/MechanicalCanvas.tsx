"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function MechanicalCanvas({ draggedComponent, setDraggedComponent }: any) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Initialize Matter.js Engine and World
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: sceneRef.current.clientHeight,
        wireframes: false,
        background: 'transparent',
        showAngleIndicator: false,
      }
    });

    // Add static boundaries (floor, walls)
    const floor = Matter.Bodies.rectangle(
      sceneRef.current.clientWidth / 2, 
      sceneRef.current.clientHeight, 
      sceneRef.current.clientWidth, 
      60, 
      { isStatic: true, render: { fillStyle: '#1e293b' } }
    );
    Matter.World.add(engine.world, [floor]);

    // Add Mouse interaction
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Matter.World.add(engine.world, mouseConstraint);
    render.mouse = mouse; // keep the mouse in sync with rendering

    // Run the engine
    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Save refs
    engineRef.current = engine;
    renderRef.current = render;
    runnerRef.current = runner;

    // Handle Resize
    const handleResize = () => {
      if (sceneRef.current && renderRef.current) {
        renderRef.current.canvas.width = sceneRef.current.clientWidth;
        renderRef.current.canvas.height = sceneRef.current.clientHeight;
        Matter.Body.setPosition(floor, {
          x: sceneRef.current.clientWidth / 2,
          y: sceneRef.current.clientHeight
        });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }
      if (render.canvas) {
        render.canvas.remove();
      }
    };
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedComponent || !engineRef.current || !sceneRef.current) return;

    // Get drop coordinates relative to the canvas
    const rect = sceneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let newBody;

    // Create Matter.js body based on component type
    if (draggedComponent.type === "rectangle") {
      newBody = Matter.Bodies.rectangle(x, y, draggedComponent.width, draggedComponent.height, {
        mass: draggedComponent.mass,
        friction: draggedComponent.friction,
        restitution: draggedComponent.restitution,
        render: {
          fillStyle: draggedComponent.id === "plank" ? '#8b5a2b' : '#94a3b8'
        }
      });
    } else if (draggedComponent.type === "circle") {
      newBody = Matter.Bodies.circle(x, y, draggedComponent.radius, {
        mass: draggedComponent.mass,
        friction: draggedComponent.friction,
        restitution: draggedComponent.restitution,
        render: { fillStyle: '#ef4444' }
      });
    }

    if (newBody) {
      Matter.World.add(engineRef.current.world, newBody);
    }
    setDraggedComponent(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className="w-full h-full relative"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>
      
      {/* Physics Canvas Container */}
      <div ref={sceneRef} className="w-full h-full z-10" />
      
      {/* Overlay Instructions */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900/50 backdrop-blur rounded-full text-xs text-slate-400 border border-white/5 pointer-events-none z-20">
        Drag mechanical components here. Click and drag to interact with physics bodies.
      </div>
    </div>
  );
}
