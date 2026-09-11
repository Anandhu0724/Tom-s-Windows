import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppIcon from './AppIcons'
import { 
  Search, Power, Moon, RotateCcw, ChevronRight, FileText, Image, Terminal, Lock
} from 'lucide-react'

export default function StartMenu({ 
  isOpen, 
  onClose, 
  onOpenApp, 
  onOpenCopilot,
  onLock
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showPowerMenu, setShowPowerMenu] = useState(false)

  // Authentic apps matching Windows 11/12 showcase
  const pinnedApps = [
    { id: 'copilot', name: 'Copilot AI', action: onOpenCopilot },
    { id: 'explorer', name: 'File Explorer', action: () => onOpenApp('explorer') },
    { id: 'browser', name: 'Microsoft Edge', action: () => onOpenApp('browser') },
    { id: 'chrome', name: 'Google Chrome', action: () => onOpenApp('browser') },
    { id: 'vscode', name: 'VS Code', action: () => onOpenApp('notepad') },
    { id: 'terminal', name: 'Terminal', action: () => onOpenApp('terminal') },
    { id: 'notepad', name: 'Notepad', action: () => onOpenApp('notepad') },
    { id: 'calculator', name: 'Calculator', action: () => onOpenApp('calculator') },
    { id: 'weather', name: 'Weather', action: () => onOpenApp('weather') },
    { id: 'youtube', name: 'YouTube', action: () => onOpenApp('browser') },
    { id: 'spotify', name: 'Spotify', action: () => onOpenApp('browser') },
    { id: 'discord', name: 'Discord', action: () => onOpenApp('browser') },
    { id: 'instagram', name: 'Instagram', action: () => onOpenApp('browser') },
    { id: 'github', name: 'GitHub', action: () => onOpenApp('browser') },
    { id: 'settings', name: 'Settings', action: () => onOpenApp('settings') },
    { id: 'store', name: 'Microsoft Store', action: () => onOpenApp('browser') },
    { id: 'xbox', name: 'Xbox', action: () => onOpenApp('browser') },
    { id: 'photos', name: 'Photos', action: () => onOpenApp('explorer') },
  ]

  const recentItems = [
    { title: 'Project_Roadmap_2026.docx', time: '12m ago', icon: FileText },
    { title: 'Windows_12_Bloom_Rose.png', time: '1h ago', icon: Image },
    { title: 'Terminal_Config.json', time: 'Yesterday', icon: Terminal },
    { title: 'Neural_Copilot_Notes.txt', time: 'Sep 10', icon: FileText },
  ]

  const filteredApps = pinnedApps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAppClick = (app) => {
    app.action()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[620px] max-w-[94vw] rounded-3xl bg-white/40 dark:bg-black/50 backdrop-blur-3xl border border-white/30 dark:border-white/10 shadow-2xl shadow-black/50 p-6 flex flex-col select-none overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Futuristic Search Bar */}
          <div className="relative mb-6">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400" />
            <input
              type="text"
              placeholder="Search apps, settings, and documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/50 dark:bg-white/10 border border-white/20 dark:border-white/10 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 shadow-inner"
            />
          </div>

          {/* Pinned Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Pinned Apps
              </span>
              <button className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-0.5">
                All apps ({pinnedApps.length}) <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-6 gap-3">
              {filteredApps.map((app) => {
                return (
                  <button
                    key={app.id}
                    onClick={() => handleAppClick(app)}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-white/40 dark:hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-150 group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 flex items-center justify-center p-2 shadow-md shadow-black/10 group-hover:shadow-cyan-500/20 transition-all">
                      <AppIcon id={app.id} className="w-7 h-7 group-hover:scale-105 transition-transform" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200 text-center truncate w-full">
                      {app.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Recommended Section */}
          <div className="border-t border-white/20 dark:border-white/10 pt-4 mb-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 px-1">
              Recommended Activity
            </div>
            <div className="grid grid-cols-2 gap-2">
              {recentItems.map((item, idx) => {
                const IconComp = item.icon
                return (
                  <div
                    key={idx}
                    onClick={() => onOpenApp('notepad')}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/30 dark:hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-white/40 dark:bg-white/5 text-cyan-500">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">
                        {item.time}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* User Profile & Power Controls Footer */}
          <div className="border-t border-white/20 dark:border-white/10 pt-4 flex items-center justify-between relative">
            <div className="flex items-center gap-2.5 px-2 py-1 rounded-xl hover:bg-white/20 dark:hover:bg-white/5 cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                W12
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Administrator</p>
                <p className="text-[10px] text-cyan-600 dark:text-cyan-400">Windows 12 Insider</p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowPowerMenu(!showPowerMenu)}
                className="p-2 rounded-xl bg-white/30 dark:bg-white/10 hover:bg-rose-500/20 hover:text-rose-500 text-slate-700 dark:text-slate-300 transition-colors"
                title="Power Options"
              >
                <Power className="w-4 h-4" />
              </button>

              {/* Power Dropdown */}
              {showPowerMenu && (
                <div className="absolute right-0 bottom-12 w-44 rounded-2xl bg-white/70 dark:bg-black/80 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-2xl p-1.5 space-y-1 animate-fade-in z-20">
                  <button 
                    onClick={() => { setShowPowerMenu(false); if (onLock) onLock(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-200 hover:bg-white/40 dark:hover:bg-white/10"
                  >
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Lock Screen</span>
                  </button>
                  <button 
                    onClick={() => { setShowPowerMenu(false); alert("Windows 12 entering Sleep mode..."); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-200 hover:bg-white/40 dark:hover:bg-white/10"
                  >
                    <Moon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Sleep</span>
                  </button>
                  <button 
                    onClick={() => { setShowPowerMenu(false); window.location.reload(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-200 hover:bg-white/40 dark:hover:bg-white/10"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Restart</span>
                  </button>
                  <button 
                    onClick={() => { setShowPowerMenu(false); alert("Shutting down Windows 12 Concept..."); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-500 hover:bg-rose-500/10"
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>Shut Down</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
