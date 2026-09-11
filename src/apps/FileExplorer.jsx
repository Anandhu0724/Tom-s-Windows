import React, { useState } from 'react'
import { 
  Folder, FileText, Image, Music, Video, HardDrive, 
  ChevronRight, ArrowLeft, ArrowRight, RotateCw, Search,
  Download, Clock, Star, Monitor
} from 'lucide-react'

export default function FileExplorer() {
  const [currentPath, setCurrentPath] = useState("Home")
  const [searchQuery, setSearchQuery] = useState("")

  const quickAccess = [
    { name: "Desktop", icon: Monitor, count: "6 items" },
    { name: "Downloads", icon: Download, count: "14 items" },
    { name: "Documents", icon: FileText, count: "28 items" },
    { name: "Pictures", icon: Image, count: "102 items" },
    { name: "Music", icon: Music, count: "45 items" },
    { name: "Videos", icon: Video, count: "12 items" },
  ]

  const files = [
    { name: "Windows_12_Bloom_Dark.png", type: "image", size: "3.4 MB", date: "Just now", icon: Image },
    { name: "Project_Roadmap_2026.docx", type: "doc", size: "450 KB", date: "Yesterday", icon: FileText },
    { name: "Synthwave_Concept_Beat.wav", type: "audio", size: "42.1 MB", date: "3 days ago", icon: Music },
    { name: "OS_Architecture_Spec.pdf", type: "pdf", size: "1.2 MB", date: "Sep 10, 2026", icon: FileText },
    { name: "UI_Motion_Prototypes.mp4", type: "video", size: "89.5 MB", date: "Sep 08, 2026", icon: Video },
    { name: "System_Configuration.json", type: "code", size: "12 KB", date: "Sep 01, 2026", icon: FileText },
  ]

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col h-full select-none text-slate-800 dark:text-slate-200">
      {/* Top Navigation & Address Bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/20 dark:border-white/10 bg-white/30 dark:bg-black/20">
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-400">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-400">
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-400">
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address Breadcrumb */}
        <div className="flex-1 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300">
          <Folder className="w-3.5 h-3.5 text-cyan-500 fill-cyan-500/20" />
          <span>This PC</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-cyan-600 dark:text-cyan-400">{currentPath}</span>
        </div>

        {/* Search Bar */}
        <div className="relative w-48">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Home..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Navigation Sidebar */}
        <div className="w-48 border-r border-white/20 dark:border-white/10 p-3 space-y-4 overflow-y-auto bg-white/20 dark:bg-black/30">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 px-2">
              Favorites
            </div>
            <div className="space-y-0.5">
              {quickAccess.map((item, idx) => {
                const IconComponent = item.icon
                const isActive = currentPath === item.name
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentPath(item.name)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      isActive 
                        ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-semibold' 
                        : 'hover:bg-white/40 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-cyan-500' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 px-2">
              Drives
            </div>
            <div className="px-2 py-2 rounded-xl bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-medium">
                <HardDrive className="w-4 h-4 text-cyan-500" />
                <span>OS (C:)</span>
              </div>
              <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-cyan-500 h-full w-[42%] rounded-full" />
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                420 GB free of 1.0 TB
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Pinned Folders
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {quickAccess.slice(0, 3).map((folder, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentPath(folder.name)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 group-hover:scale-105 transition-transform">
                    <Folder className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">{folder.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{folder.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Recent Files
            </h3>
            <div className="space-y-1">
              {filteredFiles.map((file, i) => {
                const IconComp = file.icon
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition-colors cursor-pointer group text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="font-medium group-hover:text-cyan-500 transition-colors">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400 text-[11px]">
                      <span>{file.size}</span>
                      <span className="w-24 text-right">{file.date}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 border-t border-white/20 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 bg-white/20 dark:bg-black/30">
        <span>{filteredFiles.length} items</span>
        <span>Windows 12 Mica Explorer</span>
      </div>
    </div>
  )
}
