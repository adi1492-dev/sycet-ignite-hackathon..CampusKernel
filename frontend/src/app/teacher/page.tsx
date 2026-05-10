"use client";

import { useState } from "react";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Teacher <span className="text-gradient">Console</span></h1>
            <p className="text-slate-400">Manage your classes and evaluate student performance.</p>
          </div>
          <div className="flex gap-3">
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-indigo-600/30">
               Post Announcement
             </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6">
            <p className="text-slate-500 text-sm mb-1 uppercase tracking-wider font-semibold">Total Students</p>
            <h3 className="text-3xl font-bold text-white">54</h3>
          </div>
          <div className="glass-card p-6 border-b-4 border-indigo-500">
            <p className="text-slate-500 text-sm mb-1 uppercase tracking-wider font-semibold">Pending Submissions</p>
            <h3 className="text-3xl font-bold text-white">18</h3>
          </div>
          <div className="glass-card p-6">
            <p className="text-slate-500 text-sm mb-1 uppercase tracking-wider font-semibold">Class Avg.</p>
            <h3 className="text-3xl font-bold text-white">72.4%</h3>
          </div>
          <div className="glass-card p-6">
            <p className="text-slate-500 text-sm mb-1 uppercase tracking-wider font-semibold">Course Materials</p>
            <h3 className="text-3xl font-bold text-white">24</h3>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex gap-8 border-b border-white/5 mb-8 overflow-x-auto pb-px">
          {["overview", "upload-marks", "manage-files", "submissions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium transition-all relative capitalize whitespace-nowrap ${activeTab === tab ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              {tab.replace("-", " ")}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400 rounded-full" />}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {activeTab === "overview" && (
                <section className="glass-card p-8">
                  <h2 className="text-xl font-bold text-white mb-6">Class Performance</h2>
                  <div className="h-64 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center">
                    <p className="text-slate-500 font-mono">Performance Analytics Visualization</p>
                  </div>
                </section>
              )}

              {activeTab === "upload-marks" && (
                <section className="glass-card p-8">
                   <h2 className="text-xl font-bold text-white mb-2">Upload Academic Marks</h2>
                   <p className="text-slate-400 mb-8 text-sm">Upload a CSV file containing Student Email, Subject, and Marks.</p>
                   
                   <div className="border-2 border-dashed border-white/10 rounded-xl p-12 text-center hover:border-indigo-500/50 transition-all cursor-pointer bg-white/5">
                      <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                         <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>
                      </div>
                      <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                      <p className="text-slate-500 text-sm">CSV files only (max. 10MB)</p>
                   </div>

                   <div className="mt-8">
                      <h4 className="text-white font-semibold mb-4 text-sm">Recent Uploads</h4>
                      <div className="space-y-3">
                         {[1, 2].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5 text-sm">
                               <span className="text-slate-300">Data_Structures_Midterm.csv</span>
                               <span className="text-emerald-400">Processed</span>
                            </div>
                         ))}
                      </div>
                   </div>
                </section>
              )}
           </div>

           <div className="space-y-6">
              <section className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-6">Quick Links</h2>
                <div className="space-y-2">
                   {["View Student List", "Class Schedule", "Academic Calendar", "System Logs"].map((link, i) => (
                      <button key={i} className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all text-sm flex justify-between items-center group">
                        {link}
                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                      </button>
                   ))}
                </div>
              </section>
           </div>
        </div>
      </div>
    </div>
  );
}
