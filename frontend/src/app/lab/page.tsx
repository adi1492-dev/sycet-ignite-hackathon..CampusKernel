"use client";

import { useState } from "react";
import MechanicalCanvas from "@/components/lab/MechanicalCanvas";
import ElectricalCanvas from "@/components/lab/ElectricalCanvas";
import ComponentSidebar from "@/components/lab/ComponentSidebar";

export default function VirtualLab() {
  const [activeTab, setActiveTab] = useState<"mechanical" | "electrical">("mechanical");
  const [draggedComponent, setDraggedComponent] = useState<any>(null);

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-white">
      {/* Sidebar for components */}
      <ComponentSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setDraggedComponent={setDraggedComponent} 
      />

      {/* Main Canvas Area */}
      <div className="flex-1 relative">
        <header className="absolute top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur border-b border-white/10 flex items-center px-6 z-10">
          <h1 className="text-xl font-bold tracking-tight">
            Virtual <span className="text-indigo-400">Lab</span> 
            <span className="ml-2 text-sm font-normal text-slate-400 uppercase tracking-widest">
              {activeTab}
            </span>
          </h1>
          <div className="ml-auto flex gap-4">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-md text-sm transition-colors border border-white/10">
              Clear Canvas
            </button>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm transition-colors shadow-lg shadow-indigo-500/20">
              Run Simulation
            </button>
          </div>
        </header>

        <div className="w-full h-full pt-16">
          {activeTab === "mechanical" ? (
            <MechanicalCanvas draggedComponent={draggedComponent} setDraggedComponent={setDraggedComponent} />
          ) : (
            <ElectricalCanvas draggedComponent={draggedComponent} setDraggedComponent={setDraggedComponent} />
          )}
        </div>
      </div>
    </div>
  );
}
