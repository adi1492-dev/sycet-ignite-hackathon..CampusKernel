"use client";

import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [marks, setMarks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Student <span className="text-gradient">Dashboard</span></h1>
            <p className="text-slate-400">Welcome back, Aditya. Here's your academic overview.</p>
          </div>
          <div className="flex gap-3">
            <button className="glass-card px-4 py-2 text-sm text-white hover:bg-white/10 transition-all flex items-center gap-2">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
               New Submission
            </button>
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              A
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6 border-l-4 border-indigo-500">
            <p className="text-slate-500 text-sm mb-1 uppercase tracking-wider font-semibold">Average Grade</p>
            <h3 className="text-3xl font-bold text-white">84%</h3>
          </div>
          <div className="glass-card p-6 border-l-4 border-purple-500">
            <p className="text-slate-500 text-sm mb-1 uppercase tracking-wider font-semibold">Submissions</p>
            <h3 className="text-3xl font-bold text-white">12</h3>
          </div>
          <div className="glass-card p-6 border-l-4 border-pink-500">
            <p className="text-slate-500 text-sm mb-1 uppercase tracking-wider font-semibold">Attendance</p>
            <h3 className="text-3xl font-bold text-white">92%</h3>
          </div>
          <div className="glass-card p-6 border-l-4 border-blue-500">
            <p className="text-slate-500 text-sm mb-1 uppercase tracking-wider font-semibold">Credits</p>
            <h3 className="text-3xl font-bold text-white">24</h3>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex gap-8 border-b border-white/5 mb-8 overflow-x-auto pb-px">
          {["overview", "marks", "submissions", "files"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium transition-all relative capitalize ${activeTab === tab ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400 rounded-full" />}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <section className="glass-card p-8">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-white">Recent Activities</h2>
                 <button className="text-indigo-400 text-sm hover:underline">View All</button>
               </div>
               <div className="space-y-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                     <div className="w-10 h-10 rounded bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     </div>
                     <div className="flex-grow">
                        <h4 className="text-white font-medium text-sm">C Program submitted successfully</h4>
                        <p className="text-slate-500 text-xs">Data Structures Lab • 2 hours ago</p>
                     </div>
                     <span className="text-slate-400 text-xs font-mono">ID: CK-8291</span>
                   </div>
                 ))}
               </div>
            </section>
          </div>

          <div className="space-y-6">
             <section className="glass-card p-6">
               <h2 className="text-xl font-bold text-white mb-6">Course Materials</h2>
               <div className="space-y-3">
                 {["Lecture_Note_01.pdf", "Algorithm_Basics.zip", "Lab_Assignment_4.docx"].map((file, i) => (
                    <div key={i} className="group p-3 rounded-lg hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer border border-transparent hover:border-white/5">
                      <div className="flex items-center gap-3">
                         <div className="text-slate-500 group-hover:text-indigo-400 transition-colors">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                         </div>
                         <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{file}</span>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-white transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      </button>
                    </div>
                 ))}
               </div>
             </section>
          </div>
        </div>
      </div>
    </div>
  );
}
