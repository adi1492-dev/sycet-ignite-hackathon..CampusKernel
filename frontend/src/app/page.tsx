import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="glass-nav sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/50">
              CK
            </div>
            <span className="text-xl font-bold tracking-tight text-white">CampusKernel</span>
          </div>
          <div className="flex gap-4">
            <button className="text-slate-300 hover:text-white transition-colors">Login</button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-indigo-600/30">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="text-white">Empower Your </span>
            <span className="text-gradient">Campus Learning</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Offline-first platform that ensures your code, assignments, and grades are always safe—even when the WiFi isn't.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="glass-card p-8 hover:bg-white/10 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Offline Code Execution</h3>
            <p className="text-slate-400 leading-relaxed">
              Submit your code anytime. We queue it locally and execute it in secure Docker sandboxes as soon as you're online.
            </p>
          </div>

          <div className="glass-card p-8 hover:bg-white/10 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Grade Tracking</h3>
            <p className="text-slate-400 leading-relaxed">
              Teachers can upload marks via CSV. Students see real-time performance analytics on a unified dashboard.
            </p>
          </div>

          <div className="glass-card p-8 hover:bg-white/10 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">LAN Content Delivery</h3>
            <p className="text-slate-400 leading-relaxed">
              Download lecture notes and videos at LAN speeds. No more waiting hours for 1GB files over shared WiFi.
            </p>
          </div>
        </div>

        {/* Dashboard Preview Section */}
        <div className="glass-card p-2 md:p-4 overflow-hidden shadow-2xl shadow-indigo-500/10">
          <div className="bg-slate-900/50 rounded-lg aspect-video flex items-center justify-center border border-white/5">
             <div className="text-center p-8">
               <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4">Dashboard Preview</div>
               <h2 className="text-3xl font-bold text-white mb-4">Unified Student Portal</h2>
               <p className="text-slate-400 max-w-md mx-auto mb-8">Access all your courses, submissions, and performance metrics in one secure, high-performance interface.</p>
               <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-lg font-medium border border-white/10 transition-all">
                 Launch Dashboard
               </button>
             </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <div className="w-6 h-6 bg-slate-600 rounded flex items-center justify-center font-bold text-white text-xs">CK</div>
            <span className="font-bold tracking-tight">CampusKernel</span>
          </div>
          <div>© 2026 CampusKernel. Built for the future of campus learning.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Support</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
