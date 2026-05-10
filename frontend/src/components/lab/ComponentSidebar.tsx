"use client";

const MECHANICAL_COMPONENTS = [
  { id: "block", name: "Steel Block", type: "rectangle", width: 50, height: 50, mass: 10, friction: 0.5, restitution: 0.2 },
  { id: "ball", name: "Rubber Ball", type: "circle", radius: 25, mass: 2, friction: 0.1, restitution: 0.9 },
  { id: "plank", name: "Wooden Plank", type: "rectangle", width: 200, height: 20, mass: 5, friction: 0.3, restitution: 0.1 },
];

const ELECTRICAL_COMPONENTS = [
  { id: "battery", name: "9V Battery", type: "source", voltage: 9 },
  { id: "resistor", name: "1kΩ Resistor", type: "resistor", resistance: 1000 },
  { id: "led", name: "Red LED", type: "led", forwardVoltage: 2 },
  { id: "switch", name: "Toggle Switch", type: "switch", state: "open" },
];

export default function ComponentSidebar({ activeTab, setActiveTab, setDraggedComponent }: any) {
  const components = activeTab === "mechanical" ? MECHANICAL_COMPONENTS : ELECTRICAL_COMPONENTS;

  const handleDragStart = (e: any, comp: any) => {
    setDraggedComponent(comp);
    e.dataTransfer.setData("componentId", comp.id);
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-white/10 flex flex-col h-full z-20">
      <div className="p-4 border-b border-white/10">
        <div className="flex p-1 bg-slate-800 rounded-lg">
          <button 
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "mechanical" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
            onClick={() => setActiveTab("mechanical")}
          >
            Mechanical
          </button>
          <button 
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "electrical" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
            onClick={() => setActiveTab("electrical")}
          >
            Electrical
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Components</h3>
        
        {components.map((comp) => (
          <div 
            key={comp.id}
            draggable
            onDragStart={(e) => handleDragStart(e, comp)}
            className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-indigo-500/50 hover:bg-white/10 cursor-grab active:cursor-grabbing transition-all flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center border border-white/5 shadow-inner">
               {/* Icon placeholder */}
               <div className="w-4 h-4 bg-slate-600 rounded-sm"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">{comp.name}</p>
              <p className="text-[10px] text-slate-500 capitalize">{comp.type}</p>
            </div>
          </div>
        ))}
        
        <p className="text-xs text-slate-500 mt-6 px-2 text-center">
          Drag components onto the canvas to simulate.
        </p>
      </div>
    </div>
  );
}
